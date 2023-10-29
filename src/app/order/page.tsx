import { getServerSession } from 'next-auth';
import { authOptions } from '../../../pages/api/auth/[...nextauth]';
import SelectWithOptions from './selectWithOptions';

// TODO: 주소검색 api 적용하기
// TODO: 주소 처음 입력 시 db에 저장 후 마이페이지에 나타내기
// TODO: 고민 - 1개 미만의 수량 및 재고보다 큰 수량 구매제한
// TODO: +, - 버튼으로 수량 조절하기
// TODO: input에 값 직접 입력하여 수량 조절하기
// TODO: 마이페이지와 결제 페이지의 동일한 정보는 컴포넌트로 분리하여 재활용하기

/** 참고
 * https://codingmyoni.tistory.com/entry/React-%EC%83%81%ED%92%88%EC%9E%A5%EB%B0%94%EA%B5%AC%EB%8B%88-%EC%88%98%EB%9F%89-%EC%A1%B0%EC%A0%88-%EA%B8%B0%EB%8A%A5-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0#article-2-3--3%EF%B8%8F%E2%83%A3-input%EC%97%90-%EC%A7%81%EC%A0%91-%EA%B0%92%EC%9D%84-%EC%9E%85%EB%A0%A5%ED%95%98%EC%97%AC-%EC%88%98%EB%9F%89-%EC%A1%B0%EC%A0%88%ED%95%98%EA%B8%B0
 */

export default async function Oder() {
  let session = await getServerSession(authOptions);
  // console.log(session);
  return (
    <div>
      <h1>결제 페이지</h1>
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
