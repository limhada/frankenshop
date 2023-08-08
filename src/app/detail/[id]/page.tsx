import { connectDB } from '../../../../util/database';

interface DetailProps {
  params: {
    id: string;
  };
}
// interface를 사용하지 않고 가능함 하지만 확장성이 불편하여 비추천
// export default async function Detail(props: { params: { id: string}}) {
export default async function Detail(props: DetailProps) {
  const db = (await connectDB).db('frankenshop');
  let result = await db.collection('list').findOne({ title: '제목' });
  // db에서 받아온 데이터 확인
  // console.log(result)

  // props의 params값 확인
  // console.log(props.params.id);

  return (
    <div>
      <h4>상세페이지</h4>
      <h2>{result?.title}</h2>
      <div>{result?.content}</div>
      <div>{props.params.id}</div>
    </div>
  );
}
