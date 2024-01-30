import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      // console.log('body ㅎㅇ~~~~~~~~~~~~~~~~~~~', req.body, );

      const { imp_uid } = req.body;

      const {
        data: {
          response: { access_token },
        },
      } = await axios({
        url: 'https://api.iamport.kr/users/getToken', // 가이드 - https://developers.portone.io/api/rest-v1/auth?v=v1
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        data: {
          imp_key: process.env.PORTONE_KEY,
          imp_secret: process.env.PORTONE_SECRET,
        },
      });

      // console.log('access_token ㅎㅇ~~~~~~~~~~~~~~~~~', access_token);

      // // Get Token
      const {
        data: { response },
      } = await axios({
        url: `https://api.iamport.kr/payments/${imp_uid}`,
        headers: { Authorization: access_token },
      });

      // console.log('response ㅎㅇ~~~~~~~~', response);

      return res.status(200).json('성공');
    } catch (error: any) {
      // console.log(error, '서버에러');
      console.log('에러 메시지:', error.message);
      console.log('에러 응답:', error.response.data.message);
    }
  }
}
