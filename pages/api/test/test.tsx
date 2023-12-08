
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  
  if(req.method === 'GET') {
    // console.log('테스트완료');
    const value = 20
    // return value
    return res.status(200).json(value);
    // return res.status(200).json('테스트성공');
  }
}
