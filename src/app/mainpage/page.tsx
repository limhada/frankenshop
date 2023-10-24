import { ObjectId } from 'mongodb';
import { connectDB } from '../../../util/database';
import Contents from './Contents';
import ImageComponent from './ImageComponent';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../pages/api/auth/[...nextauth]';

export interface ListProps {
  _id: ObjectId;
  title: string;
  description: string;
  img_src: string;
  author: string;
  price: string;
  isLiked: boolean; 
}

export default async function Mainpage() {
  const client = await connectDB;
  const db = client.db('frankenshop');
  // let result = await db.collection('contents').find().toArray();

  let result = await db.collection<ListProps>('contents').find().toArray();

  // console.log(result, 'result');

  ////////////////////////////////////////////////////////

  let session = await getServerSession(authOptions);

  let likesResult = await db
    .collection('likes')
    .find({ email: session?.user.email })
    .toArray();

  // console.log(likesResult,'ㅎㅇ~~~~~~~~~~~~~~~~~~likesResult');
  // {
  //   _id: new ObjectId("6537da06a6d4799ab594caf8"),
  //   contents: new ObjectId("6509b47802b7712df0cd3d53"),
  //   email: 'w',
  //   checked: true
  // },

  // const n = likesResult.filter((el)=> el.contents.toString() )

  // 받아온 result 값에 isLiked 값을 추가한 데이터
  const updateResult: ListProps[] = [];

  // likesResult를 기반으로 result 배열을 업데이트
  result.forEach((item) => {
    // 현재 아이템의 _id와 일치하는 likesResult 항목 찾기
    const likeStatus = likesResult.find(
      (like) => like.contents.toString() === item._id.toString()
    );

    // 만약 일치하는 항목을 찾았다면 isLiked를 업데이트하고 새로운 데이터에 추가
    if (likeStatus) {
      updateResult.push({
        ...item,
        isLiked: likeStatus.isLiked,
      });
    } else {
      // 일치하는 항목을 찾지 못했다면 isLiked를 기본값인 false로 설정
      updateResult.push({
        ...item,
        isLiked: false,
      });
    }
  });
  // console.log(updateResult, 'updateResult~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');

  // const contentsCollection = db.collection('contents');
  // // 'contents' 컬렉션에 연결합니다.
  // const cartData = [];
  // // 장바구니 데이터를 가공한 결과를 저장할 빈 배열을 선언합니다.
  // for (const el of likesResult) {
  //   // 'result' 배열을 순회하면서 각 장바구니 항목을 'el'이라고 합니다.
  //   const contents = await contentsCollection.findOne({
  //     _id: new ObjectId(el.contents),
  //   });
  //   // 'contentsCollection'에서 해당 상품 ID를 사용하여 상품 정보를 찾습니다.
  //   el.contents = contents; // 'el' 객체에 상품 정보를 추가합니다.
  //   el.contents.quantity = el.quantity; // 상품 정보 객체에 'el'에서 가져온 체크상태 정보를 추가합니다.
  //   el.contents.checked = el.checked; // 상품 정보 객체에 'el'에서 가져온 수량 정보를 추가합니다.
  //   cartData.push(el.contents); // 처리된 상품 정보를 'cartData' 배열에 추가합니다.
  // }

  return (
    <div>
      <ImageComponent />
      <Contents result={updateResult} />
    </div>
  );
}
