import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../../../util/database';
import Comment from '../../../src/app/detail/[id]/Comment';
import { ObjectId } from 'mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    // console.log(req.body); // req.body는 현재 {"comment":"댓글내용","_id":"부모게시물 _id "}가 들이었음
    req.body = JSON.parse(req.body); // JSON 자료기 때문에 오브젝트자료로 바꿔준다

    let saveData = {
      content: req.body.comment, //댓글내용
      parent: new ObjectId(req.body._id), // 부모게시물 _id
      author: '유저이메일주소', // 유저이메일
      // FIXME: 댓글기능 만들기2 7분
    };

    const db = (await connectDB).db('frankenshop');
    let result = db.collection('comment').insertOne(saveData);
    res.status(200).json('저장완료');
  }
}
