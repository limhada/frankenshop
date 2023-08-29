import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../../../util/database';

import bcrypt from 'bcrypt'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    // console.log(req.body,"바디값 확인");

    // 비밀번호 암호화
    let hash = await bcrypt.hash(req.body.password, 10)
    
    // 암호화한 비밀번호로 변경
    req.body.password = hash;
    // console.log(hash);
    // console.log(req.body);

    const db = (await connectDB).db('frankenshop');
    await db.collection('user_cred').insertOne(req.body)
    res.status(200).json('회원가입 성공')
  }
}