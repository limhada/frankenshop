import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../../../util/database';
import { ObjectId } from 'mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let session = await getServerSession(req, res, authOptions);
  const db = (await connectDB).db('frankenshop');
  if (req.method === 'GET') {
    // console.log(session, 'session~~~~~~~~~~~');
    try {
      // const result = '성공';

      let result = await db
        .collection('carts')
        .find({ email: session?.user.email })
        .toArray();
      // console.log('result~~~~~~~~~~~~`', result);

      const cartsData = [];
      const contentsCollection = db.collection('contents');
      // 'contents' 컬렉션에 연결합니다.
      // 장바구니 데이터를 가공한 결과를 저장할 빈 배열을 선언합니다.
      for (const el of result) {
        // 'result' 배열을 순회하면서 각 장바구니 항목을 'el'이라고 합니다.
        const contents = await contentsCollection.findOne({
          _id: new ObjectId(el.contents),
        });
        // console.log('contents~~~~~~~', contents);

        // 'contentsCollection'에서 해당 상품 ID를 사용하여 상품 정보를 찾습니다.
        el.contents = contents; // 'el' 객체에 상품 정보를 추가합니다.
        el.contents.quantity = el.quantity; // 상품 정보 객체에 'el'에서 가져온 수량 정보를 추가합니다.
        el.contents.checked = el.checked; // 상품 정보 객체에 'el'에서 가져온 체크상태 정보를 추가합니다.
        cartsData.push(el.contents); // 처리된 상품 정보를 'cartsData' 배열에 추가합니다.
      }

      // console.log('cartsData ㅎㅇ~~~~~~~~~~₩', cartsData);

      return res.status(200).json(cartsData);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Server error' });
    }
  }
  if (req.method === 'POST') {
    try {
      
      // console.log(req.body, 'ㅎㅇ~~~~~~~~~~~~~~~~~body');
      // req.body = { name: 'updateInputQuantity', quantity: 13, _id: '6509b47802b7712df0cd3d53' }

      let result = await db.collection('carts').findOne({
        contents: new ObjectId(req.body._id),
        email: session.user.email,
      });
      
      // TODO: 수량인풋에 직접 입력한 값으로 db에 업데이트 이때 기존값과 같으면 업데이트 하지 않게 수정하기
      if (result && req.body.name === 'updateInputQuantity') {
        const updateResult = await db
            .collection('carts')
            .updateOne(
              { contents: new ObjectId(req.body._id), email: session.user.email },
              { $set: { quantity: req.body.quantity } }
            );
      }

      
      
      // console.log('ㅎㅇ~~~~~~~~~~', result?.quantity);
      // console.log('ㅎㅇ~~~~~~~~~~', result.);
      
      const state11 = 2


        if (result?.quantity > 0 
          && req.body.name === 'increase'
          ) {
          const updateResult = await db
            .collection('carts')
            .updateOne(
              { contents: new ObjectId(req.body._id), email: session.user.email },
              { $inc: { quantity: 1 } }
            );
          // console.log(updateResult,"카트값 1증가 성공");
        
        } else if (result?.quantity > 1 
          && req.body.name === 'decrease'
          ) {
          const updateResult = await db
            .collection('carts')
            .updateOne(
              { contents: new ObjectId(req.body._id), email: session.user.email },
              { $inc: { quantity: -1 } }
            );
          // console.log('카트값 1감소 성공');
        }
  
        // quantity(수량) 증가 및 감소 시 증감이 반영된 quantity 값 응답으로 클라이언트에 전해주기
        let quantityResult = await db.collection('carts').findOne({
          contents: new ObjectId(req.body._id),
          email: session.user.email,
        });
        return res.status(200).json(quantityResult?.quantity);


    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Server error' });
    }
  }
}
