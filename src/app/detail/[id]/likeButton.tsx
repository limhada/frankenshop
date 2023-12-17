'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';
import { ObjectId } from 'mongodb';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  asyncContents,
  likeChange,
  likeToggle,
} from '@/app/GlobalRedux/Features/contentsSlice';
import { RootState } from '@/app/GlobalRedux/store';

interface ContentItem {
  _id: ObjectId;
  title: string;
  description: string;
  img_src: string;
  author: string;
  price: string;
  isLiked: boolean;
}

// interface ContentsProps {
//   result: ContentItem[];
// }

// TODO: 중요 - 메인페이지와 상세페이지의 좋아요 버튼이 새로고침 해야 서로 상태가 업데이트 되는 문제 해결해야 됨

export default function LikeButton({ result }: any) {
  // const result = {isLiked: true, _id: '123'}
  // console.log(result,"ㅎㅇ~~~~~~~~~~~~~~~~~~~~~~~");
  const [resultData, setResultData] = useState(result);
  // console.log(resultData, 'resultData ㅎㅇ~~~~~~~~~~~~~~~~~~~~~~₩');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncContents());
  }, []);

  const allContents = useSelector(
    (state: RootState) => state.allContents.contentsData as ContentItem[]
  );
  console.log('allContents ㅎㅇ~~~~~~~~~', allContents);
  return (
    <div>
      <FontAwesomeIcon
        icon={resultData.isLiked ? faHeart : regularHeart}
        // style={{ color: '#511f1f' }} // 카트아이콘 색상 변경하기
        className={`h-2 ${resultData.isLiked ? 'text-red-500' : ''}`}
        onClick={() => {
          // 기존 코드
          // axios
          //   .post('/api/contents/detailLikeChange', { _id: resultData._id })
          //   .then((r) => {
          //     console.log('좋아요 데이터 확인', r.data.isLiked);

          //     setResultData(r.data);
          //   })
          //   .catch((error) => {
          //     // 요청이 실패한 경우에 대한 처리
          //     console.error(error);
          //   });

          // likeToggle 해당 _id에 해당하는 객체의 isLiked 값을 토글하는 역할을 하는 reducer
          dispatch(likeToggle(_id));

          // likeChange 액션을 디스패치하여 서버에 like 상태 변경 요청
          dispatch(likeChange(_id));
        }}
      />
    </div>
  );
}
