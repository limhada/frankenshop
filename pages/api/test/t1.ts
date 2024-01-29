import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../../../util/database';
import { ObjectId } from 'mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import axios, { AxiosError } from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      console.log(req.body, 'body~~~~~~~~~~~~~~~~~~~~~~~~~~');
      // let session = await getServerSession(req, res, authOptions);

      // 유저가 입력한 댓글과 유저의 정보, 해당 게시물 정보를 db에 저장
      // const db = (await connectDB).db('frankenshop');
      // await db.collection('comment').insertOne(saveData);

      // 부모 오브젝트id를 검색해서 게시물을 찾고 게시물의 최신 댓글 리스트를 다시 res에 넣어서 보내준다 -> 새로고침 없이 댓글 작성 시 화면 렌더링 하기 위함
      // let result = await db
      //   .collection('comment')
      //   .find({ parent: new ObjectId(req.body._id) })
      //   .toArray();

      console.log(req.query, 'ㅎㅇ~~~~~~');
      const { imp_uid } = req.query;

      const {
        data: {
          response: { access_token },
        },
      } = await axios({
        url: 'https://api.iamport.kr/users/getToken',
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        data: {
          imp_key: process.env.PORTONE_KEY,
          imp_secret: process.env.PORTONE_SECRET,
        },
      });

      console.log('access_token ㅎㅇ~~~~~~~~~~~~~~~~~=', access_token);
      // const access_token = data.data.response.access_token

      // // Get Token
      const {
        data: { response },
      } = await axios({
        url: `https://api.iamport.kr/payments/${imp_uid}`,
        headers: { Authorization: access_token },
      });

      console.log('response=~~~~~~~~', response);

      return res.status(200).json('성공');
    } catch (error: any) {
      // console.log(error, '서버에러');
      console.log('에러 메시지:', error?.message);
      console.log('에러 응답:', error?.response.data.message);
    }
  }
}
