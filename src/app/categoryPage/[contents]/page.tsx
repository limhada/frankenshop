import { connectDB } from '@/util/database';
import CategoryContents from './CategoryContents';
import { ObjectId } from 'mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

interface CategoryPageProps {
  params: {
    contents: string;
  };
}

export interface ContentItem {
  _id: ObjectId;
  title: string;
  img_src: string;
  author: string;
  price: number;
  description: string;
  category: {
    name: string;
  };
  popular: boolean;
  discounted: boolean;
  discountRate: number;
  stock: number;
  brand: string;
  shipping_fee: number;
  status: string;
  sales: number;
}[]

export default async function CategoryPage(props: CategoryPageProps) {
  const db = (await connectDB).db('frankenshop');

  // 브라우저에서 URL에 한글 또는 특수 문자를 입력하면 자동으로 인코딩됨 따라서 디코딩 해서 사용해야 함
  const contentsName = decodeURIComponent(props.params.contents);
  let result = [];

  if (contentsName === '인기상품') {
    // 인기상품 정보만 가져오기
    result = await db
      .collection<ContentItem>('contents')
      .find({
        popular: true,
      })
      .toArray();
  } else if (contentsName === '할인상품') {
    // 할인상품의 정보만 가져오기
    result = await db
      .collection<ContentItem>('contents')
      .find({
        discounted: true,
      })
      .toArray();
  } else {
    // 해당 카테고리의 상품 정보만 가져오기
    result = await db
      .collection<ContentItem>('contents')
      .find({
        'category.name': contentsName,
      })
      .toArray();
  }

  let session = await getServerSession(authOptions);
  // console.log(session, 'session ㅎㅇ~~~~~~~~~~~~~~~11111');
  const contentsResult = await db.collection('contents').find().toArray();
  const likesResult = await db
    .collection('likes')
    .find({ email: session?.user.email })
    .toArray();

    // console.log('likesResult~~~~~~~', likesResult);
  const updateResult = result.map((item) => {
    const likeStatus = likesResult.find(
      (like) => like.contents.toString() === item._id.toString()
    );
    return {
      ...item,
      _id: item._id.toString(), // MongoDB ObjectId를 문자열로 변환 에러 해결 하기 위함(Warning: Only plain objects can be passed to Client Components from Server Components)
      isLiked: likeStatus?.isLiked ?? false,
    };
  });

  // console.log('updateResult~~~~~~~~', updateResult);


  return (
    <div>
      카테고리 페이지~~
      {/* <CategoryContents result={result}></CategoryContents> */}
      <CategoryContents result={updateResult}></CategoryContents>
    </div>
  );
}
