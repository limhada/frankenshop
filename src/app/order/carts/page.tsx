import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../pages/api/auth/[...nextauth]';
import SelectWithOptions from '../selectWithOptions';


export default async function Oder() {
  let session = await getServerSession(authOptions);
  // console.log(session);
  return (
    <div>
      <h1>카트! - 결제 페이지</h1>
      <div>
        <h2>배송정보</h2>
        <div>이름: {session?.user.name}</div>
        <div>
          <span>이메일:</span>
          <span>{session?.user.name}</span>
          {/* TODO: 선택가능 한 체크박스 & 직접입력으로 만들기 */}
        </div>
        <div>
          <span>휴대폰 번호:</span>
          <input placeholder='010' className='border w-11' />-
          <input placeholder='1234' className='border w-11' />-
          <input placeholder='5678' className='border w-11' />
        </div>
        <div>주소</div>
        {/* <SelectWithOptions session={session}/> */}
        <SelectWithOptions />
      </div>
      <button>결제하기</button>
    </div>
  );
}
