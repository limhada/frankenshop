import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import axios from 'axios';
import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {

      
      // let session = await getServerSession(req, res, authOptions);

      // console.log('session= ', session);

      // const baseURL = 'https://api.iamport.kr';

      // const {
      //   data: {
      //     response: { access_token },
      //   },
      // } = await axios({
      //   url: `${baseURL}/users/getToken`, // 가이드 - https://developers.portone.io/api/rest-v1/auth?v=v1
      //   method: 'post',
      //   headers: { 'Content-Type': 'application/json' },
      //   data: {
      //     imp_key: process.env.PORTONE_KEY,
      //     imp_secret: process.env.PORTONE_SECRET,
      //   },
      // });

      // 결제 취소 로직
      // const result = await axios({
      //   url: `https://api.iamport.kr/payments/cancel`,
      //   method: 'post',
      //   headers: {
      //     Authorization: `Bearer ${access_token}`,
      //     'Content-Type': 'application/json',
      //   },
      //   data: {
      //     "imp_uid": "imp_104890854256",
      //     "merchant_uid": "1706614504405",
      //   }
      // });

      // 단

      // console.log(result, '취소됐냐???????????????????????????????');

      const imp_uid = 'imp_104890854256';

      // 결제내역 단건조회 API
      // const result = await axios({
      //   url: `https://api.iamport.kr/payments/${imp_uid}`,
      //   method: 'post',
      //   headers: {
      //     Authorization: `Bearer ${access_token}`,
      //     'Content-Type': 'application/json',
      //   },
      //   data: {
      //     imp_uid: `${imp_uid}`,
      //     // "merchant_uid": "1706614504405",
      //   },
      // });

      // console.log(result, '조회됐냐???????????????????????????????');


      const db = (await connectDB).db('frankenshop');
      const findVerification = await db
      .collection('orders')
      .findOne({
        _id: new ObjectId('65b98e386b942fd64810a04a'),
        status: '결제대기',
      });
      console.log('findVerification= ', findVerification);
      
      // 한국시간 구하기
      const now = new Date();
      const utc = now.getTime(); // UTC 시간은 이미 밀리초를 나타내므로 변환 필요 없음
      const koreaTimeDiff = 9 * 60 * 60 * 1000;
      const korNow = new Date(utc + koreaTimeDiff);
      
      
      const copyVerification = {...findVerification}
      const copyVerification2 = {...findVerification}

      
      
      if(copyVerification) {
        copyVerification.completedAt = korNow
        copyVerification.imp_uid = 'your_imp_uid_value';
        copyVerification.merchant_uid = 'your_merchant_uid_value';
      }
      console.log('findVerification= 복사 전', findVerification);
      console.log('copyVerification= 복사 후', copyVerification);
      console.log('같냐? 1= ', findVerification === copyVerification);
      console.log('같냐? 2= ', findVerification == copyVerification);
     
      const areObjectsEqual = (obj1: any, obj2: any) => {
        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);
      
        if (keys1.length !== keys2.length) {
          return false;
        }
      
        for (const key of keys1) {
          if (obj1[key] !== obj2[key]) {
            return false;
          }
        }
      
        return true;
      };
      
      if (areObjectsEqual(copyVerification2, findVerification)) {
        console.log('두 객체는 동일합니다.');
      } else {
        console.log('두 객체는 동일하지 않습니다.');
      }




      console.log('req.body= ', req.body);
      return res.status(200).json('성공');
    } catch (error: any) {
      console.log(error, '서버에러');
    }
  }
}
