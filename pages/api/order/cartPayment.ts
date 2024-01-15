import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../../../util/database';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

import CryptoJS from 'crypto-js';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    // console.log('cartPayment req.body ㅎㅇ~~~~~~~~~', req.body);

    let session = await getServerSession(req, res, authOptions);
    try {
      // 한국시간 구하기
      const now = new Date();
      const utc = now.getTime(); // UTC 시간은 이미 밀리초를 나타내므로 변환 필요 없음
      const koreaTimeDiff = 9 * 60 * 60 * 1000;
      const korNow = new Date(utc + koreaTimeDiff);

      const db = (await connectDB).db('frankenshop');
      let result = await db
        .collection('carts')
        .find({ email: session.user.email, checked: true })
        .toArray();
      // console.log('cartPament - result ~~~~~~~', result);

      // const cartList = result.map(({ contents, quantity }) => ({
      //   contents,
      //   quantity,
      // }));
      // console.log(cartList, '????????????????');

      const rs = []; // 장바구니에서 체크한 상품들의 정보만 contents컬렉션에서 찾나온것

      let status; // 변수 추가
      let createAt; // 변수 추가
      let email; // 변수 추가

      for (const cartItem of result) {
        const {
          contents,
          quantity,
          _id: cartItemId,
          email: cartEmail,
          ...cartItemRest
        } = cartItem;

        const foundDocument = await db
          .collection('contents')
          .findOne({ _id: contents });

        if (foundDocument) {
          // _id, author만 제거하기 위함
          const { _id, author, ...rest } = foundDocument;

          // cartItem과 foundDocument 정보 합치기
          const mergedItem = {
            cartItemId,
            contents,
            ...cartItemRest,
            ...rest,
            totalQuantity: quantity,
            totalPrice: foundDocument.price * quantity,
            // status: '결제대기',
            // createAt: korNow,
            // email,
            // title: foundDocument.title,
            // img_src: foundDocument.img_src,
            // author: foundDocument.author,
            // price: foundDocument.price,
            // description: foundDocument.description,
          };

          if (!status) {
            status = '결제대기';
            createAt = korNow;
            email = cartEmail;
          }

          rs.push(mergedItem);
        }
      }
      // console.log('rs= ~~~~~~~~~~~~', rs);

      const orderPrice = rs.reduce((acc, item) => acc + item.totalPrice, 0);
      // console.log('orderPrice= ', orderPrice);

      const resultEnd = {
        status,
        email,
        orderPrice: orderPrice,
        createAt,
        orders: rs,
      };

      console.log('resultEnd= ', resultEnd);

      const insert = await db.collection('ordersCart').insertOne(resultEnd);
      // console.log(insert.insertedId, '인설트 ㅎㅇ~~~~~~~~~~~~~~~~~');

      // const insertId = insert.insertedId.toString().slice(0, 24);
      // console.log(insertId, 'ㅎㅇ2222222222222222222222222222222');

      const key = `${process.env.AES_KEY}`;

      // AES알고리즘 사용 암호화
      const encrypted = CryptoJS.AES.encrypt(insert.insertedId.toString(), key).toString();
      // console.log('암호화 된 값=', encrypted);

      const encodeEncrypted = encodeURIComponent(encrypted);

      return res.status(200).json(encodeEncrypted);
      // return res.status(200).redirect(302, '/list');
    } catch (error) {
      console.log('에러!', error);
      return res.status(500).json({ message: '서버 에러가 발생했습니다.' });
    }
  }
}
