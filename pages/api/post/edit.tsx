import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../../../util/database';
import { ObjectId } from 'mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    // console.log(req.body);
    let changeData = {
      title: req.body.title,
      content: req.body.content,
    };
    const db = (await connectDB).db('frankenshop');
    let result = await db.collection('post').updateOne(
      { _id: new ObjectId(req.body._id) },
      { $set: changeData } // updateOne -> DB의 document 수정할 때 사용
    ) // req.body를 바로 넣지 않고 changeData를 넣어주는 이유는 req.body에 _id가 추가되어 기존의 db에 저장되어 있는 title, content 총 2개가 아닌  title, content, _id 총 3개의 정보가 저장되어 있기 때문!(_id가 중복되어 새로운 값으로 덮어쓰는 문제가 발생!)
    return res.status(200).redirect(302, '/list');
  }
}
