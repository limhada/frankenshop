import { getServerSession } from 'next-auth';
import { authOptions } from '../../../pages/api/auth/[...nextauth]';
import SelectWithOptions from './selectWithOptions';

// TODO: 주소검색 api 적용하기

export default async function Oder() {
  let session = await getServerSession(authOptions);
  // console.log(session);
  return (
    <div>
      <h1>결제 페이지</h1>
      <div>
        <h2>배송정보</h2>
        <div>이름: </div>
        <div>
          <span>이메일:</span>
          <input placeholder='example' className='border w-[10rem]' />@
          <input placeholder='naver.com' className='border w-[10rem]' />
          {/* TODO: 선택가능 한 체크박스 & 직접입력으로 만들기 */}
        </div>
        <div>
          <span>휴대폰 번호:</span>
          <input placeholder='010' className='border w-11' />-
          <input placeholder='1234' className='border w-11' />-
          <input placeholder='5678' className='border w-11' />
        </div>
        <div>주소</div>
        {/* TODO: 선택 가능한 체크박스? */}
        {/* <select
          id='omessage_select'
          name='omessage_select'
          fw-filter='' // 드롭다운 목록에 표시할 옵션을 필터링하는 데 사용되는 값을 지정합니다.
          fw-label='배송 메세지' // 드롭다운 목록의 레이블을 지정합니다.
          fw-msg='배송 메시지를 선택해주세요.' // 드롭다운 목록의 메시지를 지정합니다.
          data-gtm-form-interact-field-id='0' // 드롭다운 목록이 Google Tag Manager에서 추적할 수 있도록 ID를 지정합니다.
        >
          <option value='oMessage-0' selected={true}>
            -- 메시지 선택 (선택사항) --
          </option>
          <option value='oMessage-1'>배송 전에 미리 연락바랍니다.</option>
          <option value='oMessage-2'>부재 시 경비실에 맡겨주세요.</option>
          <option value='oMessage-3'>부재 시 문 앞에 놓아주세요.</option>
          <option value='oMessage-4'>빠른 배송 부탁드립니다.</option>
          <option value='oMessage-5'>택배함에 보관해 주세요.</option>
          <option value='oMessage-input'>직접 입력</option>
        </select> */}
        <SelectWithOptions></SelectWithOptions>
      </div>
      <button>결제하기</button>
    </div>
  );
}
