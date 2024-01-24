import { connectDB } from "@/util/database";
import CategoryContents from "./CategoryContents";
import { ObjectId } from "mongodb";



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
}

export default async function CategoryPage(props: CategoryPageProps) {

  const db = (await connectDB).db('frankenshop');
  
  // 인기상품 정보만 가져오기
  // const result = await db.collection('contents').find({
  //   popular: true
  // }).toArray();
  
  // 할인상품의 정보만 가져오기
  // const result = await db.collection('contents').find({
  //   discounted: true
  // }).toArray();

  // 브라우저에서 URL에 한글 또는 특수 문자를 입력하면 자동으로 인코딩됨 따라서 디코딩 해서 사용해야 함
  const contentsName = decodeURIComponent(props.params.contents)
  console.log(contentsName ,'2222222222~~~~~~~~~~~~~~~~~~~~~~~');

  // 해당 카테고리의 상품 정보만 가져오기
  const result = await db.collection<ContentItem>('contents').find({
    'category.name': contentsName
  }).toArray();

  console.log(result,' ㅎㅇ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');

  // const transformedResult: ContentItem[] = result.map(item => item as ContentItem);

  
return (
  <div>
    카테고리 페이지~~
      {decodeURIComponent(props.params.contents)}
      <CategoryContents result={result}></CategoryContents>
    </div>
)
}