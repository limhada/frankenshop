// TODO: 몽고db contentsNames컬렉션에 새로운 상품 추가하는 로직($addToSet을 사용해서 중복된 이름은 추가되지 않음)


// 테스트용 페이지

import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { connectDB } from '@/util/database';
import { getServerSession } from 'next-auth';

export default async function Test() {
  // const db = (await connectDB).db('frankenshop');

  // let result = await db
  //     .collection('contents')
  //     .find()
  //     .toArray();

  //     const titles = result.map((item) => item.title)

  //     console.log(titles);

  return <div>테스트2</div>;
}
