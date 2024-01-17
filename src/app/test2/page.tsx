// TODO: 몽고db contentsNames컬렉션에 새로운 상품 추가하는 로직($addToSet을 사용해서 중복된 이름은 추가되지 않음) 

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";

export default async function Test() {
  const data = ['상품1', '상품2', '상품3', '상품4', '상품5', '상품6', '상품7', '상품8']


  // let session = await getServerSession(authOptions);

  // const db = (await connectDB).db('frankenshop');
  // let result = await db
  //   .collection('contentsNames')
  //   .findOne()
  // console.log('result~~~~~~~~~~~~`', result?.contentsNames);

  // 방법 2: 배열에 새로운 상품 추가
  // await db.collection('contentsNames').updateOne(
  //   { _id: result?._id }, // 기존 문서를 찾기 위해 _id를 사용
  //   { $addToSet: { contentsNames: { $each: data } } }
  // );


   // 업데이트 후 결과 다시 조회

  //  console.log('Updated result~~~~~~~~~~~~`', result?.contentsNames);


  return (
    <div>
      테스트2

    </div>
  );
}
