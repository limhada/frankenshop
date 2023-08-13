// FIXME: 테스트 페이지 삭제할거

import { NextApiRequest, NextApiResponse } from 'next';

export default function Time(req: NextApiRequest, res: NextApiResponse) {
  const currentTime = new Date();
  if (req.method === 'GET') {
    return res.status(200).json(currentTime);
  }
}
