import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../../../util/database';
import { ObjectId } from 'mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // console.log('req.body.selectedIds~~~~~~~~~~~~~', req.body.selectedIds);
  if (req.method === 'DELETE' && req.body.selectedIds) {
    // POST 요청이며 선택된 항목들의 _id 값이 요청 바디에 있어야 합니다.
    // 세션 가져오기
    let session = await getServerSession(req, res, authOptions);

    try {
      const db = (await connectDB).db('frankenshop');
      const selectedIds: string[] = req.body.selectedIds; // 선택된 항목들의 _id 배열
      // 선택된 항목들을 삭제
      const result = await db.collection('carts').deleteMany({
        contents: { $in: selectedIds.map((id) => new ObjectId(id)) },
        email: session.user.email,
      });

      if (result.deletedCount > 0) {
        return res.status(200).json('삭제완료');
      } else {
        return res
          .status(400)
          .json('선택된 항목이 없거나 삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('에러!', error);
      return res.status(500).json('서버 에러가 발생했습니다.');
    }
  }

  return res.status(400).json('잘못된 요청입니다.');
}
