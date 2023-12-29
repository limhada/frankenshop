import { NextApiRequest, NextApiResponse } from 'next';

let t = 10;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // console.log('메서드 ㅎㅇ~~~~~~', req.method);
  if (req.method === 'GET') {
    try {
      return res.status(200).json(t);
    } catch (error) {
      console.log(error, '서버에러');
    }
  }

  if (req.method === 'POST') {
    // console.log('req확인~~~~~~', req.body.value);
    t = req.body.value
    // console.log('tㅎㅇ~~~~~~', t);
    try {
      // t = req.body.value
      // console.log('리턴 req.body.value', t)
      return res.status(200).json(t);
    } catch (error) {
      console.log(error, '서버에러');
    }
  }
}
