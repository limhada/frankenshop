import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../../../util/database';

import bcrypt from 'bcrypt';

// FIXME: pw 일치하는지 확인하는 로직 추가하기
//
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      // console.log(req.body, '바디값 확인');

      if (req.body.name.length === 0) {
        return res.status(400).json('이름을 입력하세요');
      } else if (req.body.email.length === 0) {
        return res.status(400).json('이메일을 입력하세요');
      } else if (req.body.password.length === 0) {
        return res.status(400).json('비밀번호를 입력하세요');
      }
      // 비밀번호 암호화
      let hash = await bcrypt.hash(req.body.password, 10);

      // 암호화한 비밀번호로 변경
      req.body.password = hash;
      // console.log(hash);
      // console.log(req.body);

      const db = (await connectDB).db('frankenshop');

      let result = await db
        .collection('user_cred')
        .findOne({ email: req.body.email });
      // console.log(result?.email, '확인');

      // 가입 요청한 email이 db에 존재하면 가입 x
      if (req.body.email === result?.email) {
        return res.status(409).json('이미 가입된 이메일입니다.');
      }

      await db.collection('user_cred').insertOne(req.body);
      return res.status(200).json('회원가입 성공');
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  }
}
