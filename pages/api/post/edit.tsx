import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../../../util/database';
import { ObjectId } from 'mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    // console.log(req.body, "확인~~~~~~");

    try {
      // 현재 로그인한 유저의 정보
      let session = await getServerSession(req, res, authOptions);

      // 로그인이 안되어 있다면 수정 버튼 클릭시 동작 x
      if (session === null) {
        console.log("확인 403~~~~");
        return res.status(403).json('로그인이 안되어있습니다. 수정 불가능');
      }

      // db에서 게시물의 작성자의 이메일이 들어잇는 author값 획득
      const db = (await connectDB).db('frankenshop');
      let find_id = await db
        .collection('post')
        .findOne({ _id: new ObjectId(req.body._id) });

      // console.log(session.user.email);
      // console.log(find_id?.author)

      // 작성자와 수정요청자가 일치하는 경우
      if (session.user.email === find_id?.author) {
        let changeData = {
          title: req.body.title,
          content: req.body.content,
        };
        // console.log(changeData, "확인~~~~~~~~~~");

        // FIXME: 클라이언트에서 알러트창 나타나게 수정하기
        // if(changeData.title.length === 0) {
        //   return res.status(403).json('제목을 입력해주세요.');
        // }
        // if(changeData.content.length === 0) {
        //   return res.status(403).json('내용을 입력해주세요.');
        // }

        let result = await db.collection('post').updateOne(
          { _id: new ObjectId(req.body._id) },
          { $set: changeData } // updateOne -> DB의 document 수정할 때 사용
        ); // req.body를 바로 넣지 않고 changeData를 넣어주는 이유는 req.body에 _id가 추가되어 기존의 db에 저장되어 있는 title, content 총 2개가 아닌  title, content, _id 총 3개의 정보가 저장되어 있기 때문!(_id가 중복되어 새로운 값으로 덮어쓰는 문제가 발생!)
        return res.status(200).redirect(302, '/list');
      } else {
        return res.status(403).json('권한이 없습니다.');
        // FIXME: 클라이언트 컴포넌트에서 alert창 으로 작성자와 수정요청자가 일치하지 않음을 알려주기
      }
    } catch (error) {
      console.log('에러!', error);
      return res.status(500).json({ message: '서버 에러가 발생했습니다.' });
    }
  }
}
