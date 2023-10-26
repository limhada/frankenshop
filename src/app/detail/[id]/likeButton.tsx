'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';
import { ObjectId } from 'mongodb';
import { useState } from 'react';

interface ContentItem {
  _id: ObjectId;
  title: string;
  description: string;
  img_src: string;
  author: string;
  price: string;
  isLiked: boolean;
}

interface ContentsProps {
  result: ContentItem[];
}

export default function LikeButton( {result}: any) {
  // const result = {isLiked: true, _id: '123'}
  // console.log(result,"ㅎㅇ~~~~~~~~~~~~~~~~~~~~~~~");
  const [resultData, setResultData] = useState(result)
  // console.log(resultData, 'resultData ㅎㅇ~~~~~~~~~~~~~~~~~~~~~~₩');

  return(
    <div>
      <FontAwesomeIcon
        icon={resultData.isLiked ? faHeart : regularHeart}
        // style={{ color: '#511f1f' }} // 카트아이콘 색상 변경하기
        className={`h-2 ${resultData.isLiked ? 'text-red-500' : ''}`}
        onClick={() => {
          axios
            .post('/api/contents/detailLikeChange', {_id: resultData._id})
            .then((r) => {
              console.log('좋아요 데이터 확인', r.data.isLiked);

              setResultData(r.data)


            })
            .catch((error) => {
              // 요청이 실패한 경우에 대한 처리
              console.error(error);
            });
        }}
      />
    </div>
  )
}