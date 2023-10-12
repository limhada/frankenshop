'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';

export default function Like({ result }: any) {
  // FIXME: result any로 받아오는 부분 타입 명확하게 수정하기
  const [contentData, setContentData] = useState(result);

  const handelLikeClick = () => {
    // console.log(result, 'ㅎㅇ~~~~~~~~~~~~~~`');
    const updateData = Object.assign({}, contentData); // 객체 복사 result = {} 객체 형식이기 때문
    updateData.like = !updateData.like;
    setContentData(updateData);
    // TODO: 변경된 like 값 db에 업데이트 언제 할지 고민해보고 처리하기
  };

  return (
    <>
      <FontAwesomeIcon
        icon={contentData.like ? faHeart : regularHeart}
        // 몽고db에서 받아온 result 데이터의 like는 string 형식이라 별도로 변환이나 처리가 필요함
        onClick={() => handelLikeClick()}
        // FIXME: 좋아요 버튼 클릭 시 좋아요 상태 true or false 몽고 db에 어떻게 업데이트 할 것인지 정하기
        className={`h-2 ${contentData.like ? 'text-red-500' : ''}`}
      />
    </>
  );
}
