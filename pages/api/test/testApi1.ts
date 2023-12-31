import { NextApiRequest, NextApiResponse } from 'next';

let t = 10;

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
    t = req.body.value
    try {
      return res.status(200).json(t);
    } catch (error) {
      console.log(error, '서버에러');
    }
  }
}
