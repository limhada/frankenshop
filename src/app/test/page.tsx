'use client';

import { useState } from 'react';

declare global {
  interface Window {
    daum: any;
  }
}

interface DaumPostcodeData {
  userSelectedType: string;
  roadAddress: string;
  jibunAddress: string;
  bname: string;
  buildingName: string;
  apartment: string;
  zonecode: string;
}

export default function Addr() {
  const [extraAddr, setExtraAddr] = useState(''); // 참고 항목 (예: 아파트 이름)
  const [postcode, setPostcode] = useState(''); // 우편번호
  const [roadAddress, setRoadAddress] = useState(''); // 도로명 주소
  const [jibunAddress, setJibunAddress] = useState(''); // 지번 주소
  const [addrType, setAddrType] = useState(''); // 유저가 선택한 주소 유형 (도로명주소 또는 지번주소)

  const popupDaumPostcode = () => {
    const screenWidth = window.screen.availWidth;
    const screenHeight = window.screen.availHeight;

    const popupWidth = 500;
    const popupHeight = 600;

    const left = (screenWidth - popupWidth) / 2;
    const top = (screenHeight - popupHeight) / 2;

    new window.daum.Postcode({
      oncomplete: function (data: DaumPostcodeData) {
        let addr = '';

        if (data.userSelectedType === 'R') {
          addr = data.roadAddress;
          setAddrType('도로명주소');
        } else {
          addr = data.jibunAddress;
          setAddrType('지번주소');
        }

        let newExtraAddr = '';
        if (data.userSelectedType === 'R') {
          if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
            newExtraAddr += data.bname;
          }
          if (data.buildingName !== '' && data.apartment === 'Y') {
            newExtraAddr +=
              newExtraAddr !== ''
                ? `, ${data.buildingName}`
                : data.buildingName;
          }
          if (newExtraAddr !== '') {
            newExtraAddr = ` (${newExtraAddr})`;
          }
          setExtraAddr(newExtraAddr);
        } else {
          setExtraAddr('');
        }

        setPostcode(data.zonecode);
        setRoadAddress(data.roadAddress);
        setJibunAddress(data.jibunAddress);

        // 주소 선택 시 자동으로 상세주소에 커서 위치시키기
        const detailAddressInput = document.getElementById('detailAddress');
        if (detailAddressInput) {
          detailAddressInput.focus();
        }
      },
      // 팝업이 나타나는 위치 조정 가능
      // width: 500,
      // height: 600,
      // left: 500,
      // top: 300,
      width: popupWidth, // 팝업의 너비
      height: popupHeight, // 팝업의 높이
      left: left, // 팝업을 띄울 화면의 x 좌표
      top: top, // 팝업을 띄울 화면의 y 좌표
    }).open();
  };

  // 우편번호 찾기 버튼 style
  const buttonStyle = {
    backgroundColor: '#007bff', // 버튼 배경색
    color: '#fff', // 버튼 텍스트 색상
    padding: '8px 16px', // 패딩 설정
    border: 'none', // 테두리 없애기
    cursor: 'pointer', // 커서 모양 변경
    borderRadius: '4px', // 버튼 테두리 둥글게 설정
  };

  return (
    <div>
      <div>
        <input
          type='text'
          id='postcode'
          value={postcode}
          readOnly
          placeholder='우편번호'
        />
        {/* <input type='button' onClick={popupDaumPostcode} value='우편번호 찾기' /> */}
        <button onClick={() => popupDaumPostcode()} style={buttonStyle}>
          우편번호 찾기
        </button>
        <br />
        {/* 도로명주소 or 지번주소 중 하나만 사용하기 */}
        <input
          type='text'
          id='roadAddress'
          value={addrType === '도로명주소' ? roadAddress : jibunAddress}
          readOnly
          placeholder='도로명주소'
          style={{ width: '100%', maxWidth: '100%', overflow: 'visible' }}
        />
        <span id='guide'></span>
        <input
          type='text'
          id='detailAddress'
          placeholder='상세주소'
          style={{ width: '100%', maxWidth: '100%', overflow: 'visible' }}
        />
        {/* 참고항목 */}
        {/* <input type='text' id='extraAddress' value={extraAddr} readOnly placeholder='참고항목' /> */}
      </div>
    </div>
  );
}
