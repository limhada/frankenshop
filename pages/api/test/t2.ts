import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import axios from 'axios';

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

      console.log('req.body= ', req.body);
      return res.status(200).json('성공');
    } catch (error: any) {
      console.log(error, '서버에러');
    }
  }
}
