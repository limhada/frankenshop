import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      
      // let session = await getServerSession(req, res, authOptions);

      // 유저가 입력한 댓글과 유저의 정보, 해당 게시물 정보를 db에 저장
      // const db = (await connectDB).db('frankenshop');
      // await db.collection('comment').insertOne(saveData);

      // 부모 오브젝트id를 검색해서 게시물을 찾고 게시물의 최신 댓글 리스트를 다시 res에 넣어서 보내준다 -> 새로고침 없이 댓글 작성 시 화면 렌더링 하기 위함
      // let result = await db
      //   .collection('comment')
      //   .find({ parent: new ObjectId(req.body._id) })
      //   .toArray();

      console.log(req.body, 'ㅎㅇ~~~~~~');

      

      return res.status(200).json('성공');
    } catch (error: any) {
      // console.log(error, '서버에러');
      console.log('에러 메시지:', error?.message);
      console.log('에러 응답:', error?.response.data.message);
    }
  }
}
// Endpoint URL: /api/test/t2