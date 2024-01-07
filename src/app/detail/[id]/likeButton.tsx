'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { ObjectId } from 'mongodb';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// FIXME: 배포에러 수정

import { RootState } from '../../redux/store';
import { useParams } from 'next/navigation';
// import { asyncContents, likeChange, likeToggle } from '../../redux/features/contentsSlice';
import {
  asyncContents,
  likeChange,
  likeToggle,
// } from '../../redux/features/contentsSlice';
} from '../../../app/redux/featureslice/contentsSlice'
interface ContentItem {
  _id: ObjectId;
  title: string;
  description: string;
  img_src: string;
  author: string;
  price: number;
  isLiked: boolean;
}

// interface ContentsProps {
//   result: ContentItem[];
// }

// TODO: 중요 - 메인페이지와 상세페이지의 좋아요 버튼이 새로고침 해야 서로 상태가 업데이트 되는 문제 해결해야 됨

export default function LikeButton() {
  // const result = {isLiked: true, _id: '123'}
  // console.log(result,"ㅎㅇ~~~~~~~~~~~~~~~~~~~~~~~");
  // const [resultData, setResultData] = useState(result);
  // console.log(resultData, 'resultData ㅎㅇ~~~~~~~~~~~~~~~~~~~~~~₩');
  const dispatch = useDispatch();

  let params = useParams();
  // console.log('ㅎㅇ~~~~~~~~~~params ', params?.id);
  // id는 detail/[id] 값임
  const _id = params?.id;

  const allContents = useSelector(
    (state: RootState) => state.contents.contentsData as ContentItem[]
  );

  useEffect(() => {
    if (allContents.length === 0) {
      dispatch(asyncContents());
    }
  }, []);

  // console.log(allContents, 'ㅎㅇ~~~~~~~~~22');
  const detailContent = allContents.find(
    (content) => content._id === (_id as ObjectId | string)
  );

  // console.log(detailContent, 'ㅎㅇ~~~~~~~~~33');

  // console.log(allContents, 'ㅎㅇ~~~~~~~~~~~~~~~~~~₩');

  return (
    <div>
      <FontAwesomeIcon
        icon={detailContent?.isLiked ? faHeart : regularHeart}
        // style={{ color: '#511f1f' }} // 카트아이콘 색상 변경하기
        className={`mr-1 text-red-500`}
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
          dispatch(likeToggle({ _id }));

          // likeChange 액션을 디스패치하여 서버에 like 상태 변경 요청
          dispatch(likeChange({ _id }));
        }}
      />
    </div>
  );
}
