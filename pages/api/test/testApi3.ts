import { NextApiRequest, NextApiResponse } from 'next';

let t = 30;
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      return res.status(200).json(t);
    } catch (error) {
      console.log(error, '서버에러');
    }
  }

  if (req.method === 'POST') {
    console.log('req확인~~~~~~', req.body.value);
    try {
      t = req.body.value
      return res.status(200).json(t);
    } catch (error) {
      console.log(error, '서버에러');
    }
  }
}
