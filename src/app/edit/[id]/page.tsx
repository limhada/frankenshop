import { ObjectId } from 'mongodb';
import { connectDB } from '../../../../util/database';


interface EditProps {
  params: { id: string };
}

export default async function Edit(props: EditProps) {
  const db = (await connectDB).db('frankenshop');
  let result = await db
    .collection('post')
    .findOne({ _id: new ObjectId(props.params.id) });
  // MongoDB에서는 일반적으로 _id 필드가 ObjectId 타입이라서 해당 필드와 관련된 연산에는 ObjectId 형식을 사용해야 합니다. 코드에서 _id 필드 값을 ObjectId 형태로 변환하기 위해 mongodb 패키지의 ObjectId를 사용할 수 있습니다
  // console.log(props.params.id);
  // console.log(result);

  // FIXME: 클라이언트 컴포넌트로 변환해서 인풋에 빈칸이 있을 시 alert창 띄우기 
  
  return (
    <div className='p-20'>
      <h4>글 수정 페이지</h4>
      <form action='/api/post/edit' method='POST'>
        <input
          name='title'
          defaultValue={result?.title}
          className='block w-full p-2 mb-2 border rounded-lg'
        />
        <input
          name='content'
          defaultValue={result?.content}
          className='block w-full p-2 mb-2 border rounded-lg'
          />
        <input name='_id' defaultValue={result?._id.toString()}
        className='w-full p-2 mb-2 border rounded-lg hidden'
        />
        <button
          type='submit'
          className='px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600'
        >
          수정 완료
        </button>
      </form>
    </div>
  );
}
