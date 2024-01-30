import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      // let session = await getServerSession(req, res, authOptions);
      // console.log('session= !!!!!!!!!!!!!!!!!!!!!!', session, session.user, session.user.name, session.user.email);

      console.log('body ㅎㅇ~~~~~~~~~~~~~~~~~~~', req.body);

      const baseURL = 'https://api.iamport.kr';

      const { imp_uid, merchant_uid, status } = req.body;

      const {
        data: {
          response: { access_token },
        },
      } = await axios({
        url: `${baseURL}/users/getToken`, // 가이드 - https://developers.portone.io/api/rest-v1/auth?v=v1
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        data: {
          imp_key: process.env.PORTONE_KEY,
          imp_secret: process.env.PORTONE_SECRET,
        },
      });
      // console.log('access_token ㅎㅇ~~~~~~~~~~~~~~~~~', access_token);

      // const paymentDetail = await axios({
      //   url: `https://api.iamport.kr/payments/${imp_uid}`,
      //   method: 'post',
      //   headers: {
      //     Authorization: `Bearer ${access_token}`,
      //   },
      //   data: {
      //     imp_uid: `${imp_uid}`,
      //     // "merchant_uid": "1706614504405",
      //   },
      // });
      // console.log('조회됐냐11111???????????????????????????????= ', paymentDetail.data, );
      // console.log('조회됐냐2222???????????????????????????????= ', paymentDetail, );

      // 결제내역 단건조회 API
      const paymentDetail = await axios({
        url: `https://api.iamport.kr/payments/${imp_uid}`,
        method: 'get',
        headers: { Authorization: access_token },
      });

      console.log('response ㅎㅇ~~~~~~~~', paymentDetail.data.response);
      console.log('response ㅎㅇ~~~~~~~~', paymentDetail.data.code);

      // 결제내역 단건 조회 성공
      if (paymentDetail.data.code === 0) {
        console.log('성공');
      }

      const { name, amount, buyer_email, buyer_name, custom_data } =
        paymentDetail.data.response;

      const custom_dataObject = JSON.parse(custom_data);
      const protOneData = {
        name,
        amount,
        buyer_email,
        buyer_name,
        custom_dataObject,
      };

      console.log(protOneData, '22222222222222222222222222222222222222');

      /**
       * protOneData = {
          name: '상품7',
          amount: 107485,
          buyer_email: 'w',
          buyer_name: 'w',
          custom_dataObject: {
            _id: '65b8afbd93d1a1fbef9be607',
            itemId: '65b0a4445f05ea48306dcccd'
          }
        }
       */

      // 몽고db와 결제 검증 로직 추가하기

      // console.log(custom_dataObject._id, 'custom_data._id~~~~~~~~~~~~~~~~~~~~~~~');
      // console.log(custom_dataObject.itemId, 'custom_data._id~~~~~~~~~~~~~~~~~~~~~~~');
      const db = (await connectDB).db('frankenshop');
      let ordersData = await db
        .collection('orders')
        .findOne({ _id: new ObjectId(custom_dataObject._id) });

      console.log(ordersData, 'result_~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');

      /**
       * 몽고DB의 결제 정보
       * ordersData = {
          _id: new ObjectId("65b8afbd93d1a1fbef9be607"),
          itemId: new ObjectId("65b0a4445f05ea48306dcccd"),
          title: '상품7',
          email: 'w',
          totalQuantity: 1,
          totalPrice: 107485,
          status: '결제대기',
          createdAt: 2024-01-30T17:13:49.290Z
        } 
       */

      // 결제 검증 로직 성공
      if (
        // 이메일 검증
        protOneData.buyer_name === ordersData?.name &&
        protOneData.buyer_email === ordersData?.email &&
        // 상품 이름 검증
        protOneData.name === ordersData?.title &&
        // 가격 검증
        protOneData.amount === ordersData?.totalPrice &&
        // 결제상태 검증
        ordersData?.status === '결제대기' &&
        // ObjectId 검증(해당 document가 맞는지)
        custom_dataObject._id === ordersData._id.toString() &&
        // 제품의 ObjectId가 맞는지 검증
        custom_dataObject.itemId === ordersData.itemId.toString()
      ) {
        console.log('검증성공 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');

        // 검증 성공 시 몽고db의 orders 컬렉션의 해당 document의 status를 결제대기 -> 결제완료로 변경 -> 그리고 결제완료된 문서는 ordersCompleted로 이동

        // orders에서 해당 문서 찾기
        const ordersVerification = await db
          .collection('orders')
          .findOne({
            _id: new ObjectId(custom_dataObject._id),
            status: '결제대기',
          });
        console.log(ordersVerification, 'Verification11ㅎㅇㅎㅇㅎㅇㅎㅇ');

        // 찾은 문서의 status값을 결제대기 -> 결제완료로 변경
        if (ordersVerification) {
          let update = await db
            .collection('orders')
            .updateOne(
              { _id: new ObjectId(custom_dataObject._id), status: '결제대기' },
              { $set: { status: '결제완료' } }
            );
          // console.log(update, 'update11 ㅎㅇ~~~~~~~~~~~');

          // 문서를 ordersCompleted컬렉션으로 이동

          // 업데이트 한 문서를 찾고
          const findVerification = await db
            .collection('orders')
            .findOne({
              _id: new ObjectId(custom_dataObject._id),
              status: '결제완료',
            });

          // 문서가 있다면 ordersCompleted에 복사한 뒤 orders에 있는 기존 문서 삭제
          if (findVerification) {
            await db.collection('ordersCompleted').insertOne(findVerification);
            await db.collection('orders').deleteOne(findVerification);
          }
        }

        return res.status(200).json('성공');
      } else {
        // 결제 검증 로직 실패 시 결제 취소

        // 결제 취소 로직
        const cancelPayment = await axios({
          url: `https://api.iamport.kr/payments/cancel`,
          method: 'post',
          headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json',
          },
          data: {
            imp_uid: `${imp_uid}`,
            merchant_uid: `${merchant_uid}`,
          },
        });
        // console.log(cancelPayment, '취소됐냐???????????????????????????????');

        return res.status(400).json('실패');
      }

      // return res.status(200).json('결제 검증 성공');
    } catch (error: any) {
      // console.log(error, '서버에러');
      console.log('에러 메시지:', error.message);
      // console.log('에러 응답:', error.response.data.message);
    }
  }
}
