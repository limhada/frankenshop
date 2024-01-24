'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { useEffect } from 'react';
import { ObjectId } from 'mongodb';
import Image from 'next/image';
import Link from 'next/link';
// import LikeChange from '../components/likeChange';

// import { useRouter } from 'next/navigation';
import CartIcon from '../../components/CartIcon';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import {
  asyncContents,
  likeChange,
  likeToggle,
} from '../../redux/features/contentsSlice';
import { ContentItem } from './page';

interface CategoryContentsProps {
  result: ContentItem[]
}




// interface ContentsProps {
//   result: ContentItem[];
// }

export default function CategoryContents({ result}: CategoryContentsProps) {
// export default function CategoryPage() {

  // const router = useRouter();

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(asyncContents());
  //   // .then(() => {
  //   // console.log('모든 컨텐츠 데이터 가져옴');
  //   // });
  // }, []);

  // const allContents = useSelector(
  //   (state: RootState) => state.contents.contentsData as ContentItem[]
  // );

  console.log(result, 'result~ㅎㅇ~~~~~~~~~~~~~~~~~~~~~~~~');

  return (
    <div>

      <div className='grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-5'>
        {result.map((el, i) => (
          <div
            key={i}
            className=' w-[18rem] rounded overflow-hidden shadow-lg place-self-center'
          >

            <Link href={'/detail/' + el._id.toString()}>
              <Image
                src={el.img_src}
                alt={el.title}
                width={500}
                height={500}
                priority={true}
              />

              <div className='px-6 py-4'>
                <div
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  className='inline-flex' // 자식 요소의 크기만큼만 자리차지
                >
             
                 

                  
                  <div className='flex items-center'>
                    {/* <FontAwesomeIcon
                      icon={el.isLiked ? faHeart : regularHeart}
                      // style={{ color: '#511f1f' }} // 카트아이콘 색상 변경하기
                      className={`mr-1 text-red-500`}
                      onClick={() => {
                        const _id = { _id: allContents[i]._id };
                        // likeToggle 해당 _id에 해당하는 객체의 isLiked 값을 토글하는 역할을 하는 reducer
                        dispatch(likeToggle(_id));

                        // likeChange 액션을 디스패치하여 서버에 like 상태 변경 요청
                        dispatch(likeChange(_id));
                        // axios
                        //   .post('/api/contents/likeChange', _id)
                        //   .then((r) => {
                        //     // console.log("좋아요 데이터 확인", r.data);

                        //     // setContentsData(r.data);
                        //     // FIXME: 중요 - 추후 리덕스 or 다른 방법을 해결하기 장바구니에 추가 후 장바구니로 이동 시 새로고침 하지 않으면 추가된 수량이 업데이트 되지 않는 문제 해결하기 위함
                        //   })
                        //   .catch((error) => {
                        //     // 요청이 실패한 경우에 대한 처리
                        //     console.error(error);
                        //   });
                      }}
                    /> */}
                    {/* <CartIcon _id={allContents[i]?._id.toString()}></CartIcon> */}
                  </div>
                </div>
                {/* TODO: 평점? 추가할지 말지 */}
                <div className='font-bold text-xl mb-2'>{el.title}</div>
                <p className='text-gray-700 text-base'>{el.description}</p>
                <p className='text-gray-700 text-base'>
                  {el.price.toLocaleString()}원
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
