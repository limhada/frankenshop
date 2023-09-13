import { getServerSession } from 'next-auth';
import { authOptions } from '../../../pages/api/auth/[...nextauth]';
import LoginBtn from '../LoginBtn';
import ImgInput from './ImgInput';

export default async function Write() {
  // FIXME: 현재 로그인이 되어있지 않다면 로그인 페이지로 이동시키기
  let session = await getServerSession(authOptions);

  if (session === null) {
    return (
      <div>
        로그인이 안되어있습니다
        <br />
        <LoginBtn></LoginBtn>
      </div>
    );
  } else {
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
          <ImgInput/>
          
        </form>
      </div>
    );
  }
}
