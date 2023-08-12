import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('테스트완료');
  return res.status(200).json('테스트완료');
}
