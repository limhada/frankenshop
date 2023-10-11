'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faCartShopping, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';
import { ObjectId } from 'mongodb';

interface ContentItem {
  _id: ObjectId;
  title: string;
  description: string;
  img_src: string;
  author: string;
  price: string;
  like: boolean;
}

interface ContentsProps {
  result: ContentItem[];
}

export default function Content({ result }: ContentsProps) {
  // 이미지와 정보가 들어있는 배열 객체
  // TODO: 서버에서 받아오는 데이터로 변경하기
  // TODO: 해당 상품 클릭 시 상세페이지로 이동하게
  // TODO: 로그인 x 시 좋아요 클릭 시 로그인 하라고 알림창, 모든 하트 아이콘 기본 검은색으로
  // FIXME: 서버에서 받아온 데이터 값 가져오기

  const [contentData, setContentData] = useState(result);
  const handelLikeClick = (i: number) => {
    // console.log('ㅎㅇ1~~~~', contentData[0].like === true);
    const updateData = [...contentData];
    updateData[i].like = !updateData[i].like;
    setContentData(updateData);
    // TODO: 변경된 like 값 db에 업데이트 언제 할지 고민해보고 처리하기
  };

  return (
    <div>
      <h1>상품리스트</h1>
      {/* <img src='/imgtest/1.jpeg' /> */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        {result.map((el, i) => (
          <div key={i} className='max-w-sm rounded overflow-hidden shadow-lg'>
            <img src={el.img_src} alt={el.title} className='w-full' />
            <div className='px-6 py-4'>
              <div>
                <FontAwesomeIcon
                  icon={el.like ? faHeart : regularHeart}
                  // 몽고db에서 받아온 result 데이터의 like는 string 형식이라 별도로 변환이나 처리가 필요함
                  onClick={() => handelLikeClick(i)}
                  // FIXME: 좋아요 버튼 클릭 시 좋아요 상태 true or false 몽고 db에 어떻게 업데이트 할 것인지 정하기
                  className={`h-2 ${el.like ? 'text-red-500' : ''}`}
                />
                {/* 장바구니 로직 추가하기 */}
                <FontAwesomeIcon
                  icon={faCartShopping}
                  style={{ color: '#511f1f' }}
                />
              </div>
              {/* TODO: 평점? 추가할지 말지 */}
              <div className='font-bold text-xl mb-2'>{el.title}</div>
              <p className='text-gray-700 text-base'>{el.description}</p>
              <p className='text-gray-700 text-base'>{el.price}원</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
