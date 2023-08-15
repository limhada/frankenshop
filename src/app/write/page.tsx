import styles from './write.module.css';
export default function Write() {
  return (
    <div className='p-20'>
      <h4>글작성</h4>
      <form action='/api/post/new' method='POST'>
        <input
          name='title'
          placeholder='글 제목'
          className='className="block w-full p-2 mb-2 border rounded-lg"'
        />
        <input
          name='content'
          placeholder='글 내용'
          className='className="block w-full p-2 mb-2 border rounded-lg"'
        />
        <button
          type='submit'
          className='px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600'
        >
          버튼
        </button>
      </form>
    </div>
  );
}
