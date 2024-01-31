import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';
import CryptoJS from 'crypto-js';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      // FIXME: 문제! - 포트원 서버 컴퓨터에는 쿠키가 없으니까 null이 뜰듯요 유저정보는 데이터베이스에서 꺼내서 처리하기
      // let session = await getServerSession(req, res, authOptions);
      // console.log('session= !!!!!!!!!!!!!!!!!!!!!!', session, session.user, session.user.name, session.user.email);

      // console.log('body ㅎㅇ~~~~~~~~~~~~~~~~~~~', req.body);

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

      // console.log('response ㅎㅇ~~~~~~~~', paymentDetail.data.response);
      // console.log('response ㅎㅇ~~~~~~~~', paymentDetail.data.code);

      // TODO: 결제내역 단건 조회 성공 시 로직 분기처리하기
      if (paymentDetail.data.code === 0) {
        // console.log('성공');
      }

      const {
        name,
        amount,
        buyer_email,
        buyer_name,
        custom_data,
        orderSubpath,
      } = paymentDetail.data.response;

      // JSON 데이터를 객체로 변경
      const custom_dataObject = JSON.parse(custom_data);

      const protOneData = {
        name,
        amount,
        buyer_email,
        buyer_name,
        custom_dataObject,
        orderSubpath, // order" 경로에서 추출한 부분(subpath) detail or carts
      };

      // console.log(
      //   'protOneData= 22222222222222222222222222222222222222',
      //   protOneData
      // );

      // protOneData.orderSubpathdp에('detail' | 'carts')따라 매핑하기

      // console.log(
      //   protOneData.custom_dataObject.orderSubpath,
      //   '######################################'
      // );
      let path: 'detail' | 'carts' = protOneData.custom_dataObject.orderSubpath;
      const variableMap = {
        detail: 'orders',
        carts: 'ordersCart',
      };
      let orderPath = variableMap[path] as 'orders' | 'ordersCart';

      const variableMap2 = {
        orders: 'ordersCompleted',
        ordersCart: 'ordersCartCompleted',
      };
      let collectionsName = variableMap2[orderPath];

      // console.log(
      //   'orderPath= ',
      //   orderPath,
      //   'collectionsName= ',
      //   collectionsName
      // );

      let decrypted = '';
      // 장바구니 결제 처리 로직
      if (protOneData.custom_dataObject.orderSubpath === 'carts') {
        // _id값 복호화 하기 - 보안 이유로 서버컴포넌트에서 암호화 -> 클라이언트 -> api로 전송
        const key = `${process.env.AES_KEY}`;
        const bytes = CryptoJS.AES.decrypt(
          protOneData.custom_dataObject._id,
          key
        );
        decrypted = bytes.toString(CryptoJS.enc.Utf8);

        // 복호화 성공 -> ordersCart collections에서 _id값으로 사용하기
        // console.log('decrypted= 복호화 값~~~~~~~~~~~~~~~', decrypted);
      }

      const _id = decrypted !== '' ? decrypted : custom_dataObject?._id;

      // console.log('_id= ~~~~~~~~~~~~~~~~~~~~', _id);
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

      // TODO: 몽고db와 결제 검증 로직 추가하기

      // console.log(_id, 'custom_data._id~~~~~~~~~~~~~~~~~~~~~~~');
      // console.log(custom_dataObject.itemId, 'custom_data._id~~~~~~~~~~~~~~~~~~~~~~~');
      const db = (await connectDB).db('frankenshop');
      // ordersData= 몽고DB의 데이터
      let ordersData = await db
        .collection(orderPath)
        .findOne({ _id: new ObjectId(_id) });

      // console.log(
      //   ordersData,
      //   'ordersData~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~'
      // );

      /**
       * 몽고DB의 결제 정보
       * ordersData = {
          _id: new ObjectId("65b8afbd93d1a1fbef9be607"),
          itemId: new ObjectId("65b0a4445f05ea48306dcccd"),
          title: '상품7',
          email: 'w',
          totalQuantity: 1,
          totalPrice: 107485,
          status: ' 결제대기',
          createdAt: 2024-01-30T17:13:49.290Z
        } 
       */

      // 날짜가 같은지 확인하는 로직 (장바구니 결제 검증에서만 사용)
      const date1 = new Date(custom_dataObject?.createAt);
      const date2 = new Date(ordersData?.createAt);
      let same = false;
      if (date1.getTime() === date2.getTime()) {
        same = true;
        // console.log('날짜가 같다~~~~~~~~~~~~~~~');
      } else {
        // console.log('날짜가 다릅니다.');
      }

      // 한국시간 구하기
      const now = new Date();
      const utc = now.getTime(); // UTC 시간은 이미 밀리초를 나타내므로 변환 필요 없음
      const koreaTimeDiff = 9 * 60 * 60 * 1000;
      const korNow = new Date(utc + koreaTimeDiff);

      // 기존 결제 검증 if
      // // 결제 검증 로직 성공
      // if (
      //   (
      //   // 상세페이지 결제 검증 로직
      //   path === 'detail' &&
      //   // 이메일 검증
      //   protOneData.buyer_name === ordersData?.name &&
      //   protOneData.buyer_email === ordersData?.email &&
      //   // 상품 이름 검증
      //   protOneData.name === ordersData?.title &&
      //   // 가격 검증
      //   protOneData.amount === ordersData?.totalPrice &&
      //   // 결제상태 검증
      //   ordersData?.status === '결제대기' &&
      //   // ObjectId 검증(해당 document가 맞는지)
      //   _id === ordersData._id.toString() &&
      //   // 제품의 ObjectId가 맞는지 검증
      //   custom_dataObject.itemId === ordersData.itemId.toString()
      //   )
      //    ||
      //   (
      //   // 장바구니 결제 검증

      //   // ordersData= 몽고DB의 데이터
      //   // ordersData &&
      //   path === 'carts' &&
      //   // 이메일 검증
      //   protOneData.buyer_name === ordersData?.name &&
      //   protOneData.buyer_email === ordersData?.email &&
      //   // 상품 이름 검증
      //   protOneData.name === ordersData?.title &&
      //   // 가격 검증
      //   protOneData.amount === ordersData?.orderPrice &&
      //   // 결제상태 검증
      //   '결제대기' === ordersData?.status &&
      //   // 주문 시간 검증
      //   same &&
      //   // ObjectId 검증(해당 document가 맞는지)
      //   _id === ordersData?._id.toString() &&
      //   // 제품의 ObjectId가 맞는지 검증
      //   custom_dataObject?.itemId === ordersData?.itemId?.toString() )

      // ) {

      // 변경한 결제 검증 if

      const validateDetailPayment = (
        protOneData: any,
        ordersData: any,
        _id: string,
        custom_dataObject: any
      ): boolean => {
        return (
          protOneData.buyer_name === ordersData?.name &&
          protOneData.buyer_email === ordersData?.email &&
          protOneData.name === ordersData?.title &&
          protOneData.amount === ordersData?.totalPrice &&
          ordersData?.status === '결제대기' &&
          _id === ordersData._id.toString() &&
          custom_dataObject.itemId === ordersData.itemId.toString()
        );
      };

      const validateCartPayment = (
        protOneData: any,
        ordersData: any,
        _id: string,
        custom_dataObject: any
      ): boolean => {
        return (
          protOneData.buyer_name === ordersData?.name &&
          protOneData.buyer_email === ordersData?.email &&
          protOneData.name === ordersData?.title &&
          protOneData.amount === ordersData?.orderPrice &&
          '결제대기' === ordersData?.status &&
          _id === ordersData?._id.toString() &&
          custom_dataObject?.itemId === ordersData?.itemId?.toString()
        );
      };

      // 검증 로직 호출
      if (
        (path === 'detail' &&
          validateDetailPayment(
            protOneData,
            ordersData,
            _id,
            custom_dataObject
          )) ||
        (path === 'carts' &&
          same &&
          validateCartPayment(protOneData, ordersData, _id, custom_dataObject))
      ) {
        // console.log('검증성공 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
        // 검증 성공 시 몽고db의 orders 컬렉션의 해당 document의 status를 결제대기 -> 결제완료로 변경 -> 그리고 결제완료된 문서는 ordersCompleted로 이동
        // orders에서 해당 문서 찾기
        const ordersVerification = await db.collection(orderPath).findOne({
          _id: new ObjectId(_id),
          status: '결제대기',
        });
        // console.log(ordersVerification, 'Verification11ㅎㅇㅎㅇㅎㅇㅎㅇ');
        // 찾은 문서의 status값을 결제대기 -> 결제완료로 변경
        if (ordersVerification) {
          let update = await db
            .collection(orderPath)
            .updateOne(
              { _id: new ObjectId(_id), status: '결제대기' },
              { $set: { status: '결제완료' } }
            );
          // console.log(update, 'update11 ㅎㅇ~~~~~~~~~~~');
          // 문서를 ordersCompleted컬렉션으로 이동
          // 업데이트 한 문서를 찾고
          const findVerification = await db.collection(orderPath).findOne({
            _id: new ObjectId(_id),
            status: '결제완료',
          });
          // console.log('findVerification= ', findVerification);
          // 기존의 값과
          const updateVerification = { ...findVerification };
          if (updateVerification) {
            updateVerification.completedAt = korNow;
            updateVerification.imp_uid = imp_uid;
            updateVerification.merchant_uid = merchant_uid;
          }
          // 문서가 있다면 ordersCompleted에 복사한 뒤 orders에 있는 기존 문서 삭제
          if (findVerification) {
            await db
              // .collection('ordersCompleted')
              .collection(collectionsName)
              .insertOne(updateVerification);
            await db.collection(orderPath).deleteOne(findVerification);
          }
        }
        // console.log('결제검증 모두 성공!@#!@#!@#');
        return res.status(200).json('성공');
      }

      // console.log('path= ~~~~~~~~~~~~~~~', path, path === 'carts');
      // console.log('1=', protOneData.buyer_name === ordersData?.name);
      // console.log('2=', protOneData.buyer_email === ordersData?.email);
      // console.log('3=', protOneData.name === ordersData?.title);
      // console.log('4=', protOneData.amount === ordersData?.orderPrice);
      // console.log('5=', '결제대기' === ordersData?.status);
      // // console.log('6=', custom_dataObject?.createAt.toString() === ordersData?.createAt.toString());
      // // console.log('6=', custom_dataObject?.createAt);
      // // console.log('6=', ordersData?.createAt);
      // console.log('7=', _id === ordersData?._id.toString());
      // console.log('8=', custom_dataObject.itemId === ordersData?.itemId.toString());
      // console.log('if 전~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
      /*    else if (
        // ordersData= 몽고DB의 데이터
        // ordersData &&
        path === 'carts' &&
        // 이메일 검증
        protOneData.buyer_name === ordersData?.name &&
        protOneData.buyer_email === ordersData?.email &&
        // 상품 이름 검증
        protOneData.name === ordersData?.title &&
        // 가격 검증
        protOneData.amount === ordersData?.orderPrice &&
        // 결제상태 검증
        '결제대기' === ordersData?.status &&
        // 주문 시간 검증
        same &&
        // ObjectId 검증(해당 document가 맞는지)
        _id === ordersData?._id.toString() &&
        // 제품의 ObjectId가 맞는지 검증
        custom_dataObject?.itemId === ordersData?.itemId?.toString()
      ) {
        console.log('장바구니 구매 검증성공 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');

        // orders에서 해당 문서 찾기
        const ordersVerification = await db.collection(orderPath).findOne({
          _id: new ObjectId(_id),
          status: '결제대기',
        });
        console.log(ordersVerification, 'Verification11ㅎㅇㅎㅇㅎㅇㅎㅇ');
        // 찾은 문서의 status값을 결제대기 -> 결제완료로 변경
        if (ordersVerification) {
          let update = await db
            .collection(orderPath)
            .updateOne(
              { _id: new ObjectId(_id), status: '결제대기' },
              { $set: { status: '결제완료' } }
            );
          // console.log(update, 'update11 ㅎㅇ~~~~~~~~~~~');
          // 문서를 ordersCompleted컬렉션으로 이동
          // 업데이트 한 문서를 찾고
          const findVerification = await db.collection(orderPath).findOne({
            _id: new ObjectId(_id),
            status: '결제완료',
          });
          console.log('findVerification= ', findVerification);
          // 기존의 값과
          const updateVerification = { ...findVerification };
          if (updateVerification) {
            updateVerification.completedAt = korNow;
            updateVerification.imp_uid = imp_uid;
            updateVerification.merchant_uid = merchant_uid;
          }
          // 문서가 있다면 ordersCompleted에 복사한 뒤 orders에 있는 기존 문서 삭제
          if (findVerification) {
            await db
              // .collection('ordersCompleted')
              .collection(collectionsName)
              .insertOne(updateVerification);
            await db.collection(orderPath).deleteOne(findVerification);
          }
        }
      

        console.log('장바구니 구매 로직 끝@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
      } 
        */
      else {
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
        // console.log(cancelPayment, '취소됐나???????????????????????????????');

        // console.log('else~~~~~~~~~~~~~~~~~~~~~~~~~');
        return res.status(400).json('실패');
      }

      // console.log('마지막 라인 확인용~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
      // return res.status(200).json('결제 검증 성공');
    } catch (error: any) {
      // console.log(error, '서버에러');
      console.log('에러 메시지:', error.message);
      // console.log('에러 응답:', error.response.data.message);
    }
  }
}
