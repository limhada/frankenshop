import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      console.log('body ㅎㅇ~~~~~~~~~~~~~~~~~~~', req.body, );

      return res.status(200).json('성공');
    } catch (error: any) {
      // console.log(error, '서버에러');
      console.log('에러 메시지:', error.message);
      console.log('에러 응답:', error.response.data.message);
    }
  }
}
