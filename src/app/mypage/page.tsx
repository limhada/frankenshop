import { getServerSession } from 'next-auth';
import { authOptions } from '../../../pages/api/auth/[...nextauth]';

export default async function Mypage() {
  let session = await getServerSession(authOptions);

  return (
    <div>
      <h1>마이 페이지</h1>
      <div>
        내 정보 수정
        <div>아이디(이메일):{session.email}</div>
        <div>이름</div>
        <div>휴대폰 번호</div>
        <div>비밀번호 변경</div>
        {/* <input placeholder="비밀번호 변경"></input> */}
        <div>배송지</div>
      </div>
      <div>주문/배송</div>
      <div>장바구니</div>
      <div>리뷰작성</div>
      <div>보유쿠폰</div>
      <div>포인트</div>
      <div>Q&A</div>
    </div>
  );
}
