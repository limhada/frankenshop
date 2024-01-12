import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../../../util/database';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { ObjectId } from 'mongodb';

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
      console.log(
        '시작~~~~~~~~',
        rs,
        '~~~~~~~~~~~~~~~~~222222222222222222222222222222'
      );

      const orderPrice = rs.reduce((acc, item) => acc + item.totalPrice, 0);
      console.log(orderPrice, '????????????????');

      const resultEnd = {
        status,
        email,
        orderPrice: orderPrice,
        createAt,
        orders : rs,
      }

      console.log(resultEnd, '3333333333333');

      // TODO: cartOrders 컬렉션(장바구니 상품 주문서)에 rs 데이터 추가하기 insertOne으로 추가 시 에러남 배열값을 하나의 문서에 추가하는 방법 알아보기

      const insert = await db.collection('ordersCart').insertOne(resultEnd);
      console.log(insert, '인설트 ㅎㅇ~~~~~~~~~~~~~~~~~');

      /*  insert= {
          acknowledged: true, // 메서드가 성공적으로 완료되었는지 여부를 나타냅니다. true는 성공, false는 실패를 의미
          insertedId: new ObjectId("659a2c3ec7ec27fa6a002dbf") // 새로 삽입된 문서의 _id 값
        } */

      // insert가 성공적으로 추가되면 insert.insertedId를 res에 넣어 반환
      // if (insert.acknowledged === true) {
      //   const insertResult = insert.insertedId.toString();
      // console.log(
      //   'insert.insertedId~~~~~~~~~~~~~~',
      //   insert.insertedId.toString()
      // );

      // console.log('itemId ~~~~~~', req.body.itemId);

      //   return res.status(200).json({_id: insertResult, totalPrice: insertData.totalPrice});
      // }

      return res.status(200).json('성공');
      // return res.status(200).redirect(302, '/list');
    } catch (error) {
      console.log('에러!', error);
      return res.status(500).json({ message: '서버 에러가 발생했습니다.' });
    }
  }
}
