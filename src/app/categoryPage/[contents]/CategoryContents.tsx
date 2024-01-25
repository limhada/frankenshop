'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { useCallback, useEffect, useState } from 'react';
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
  asyncLike,
  likeChange,
  likeToggle,
} from '../../redux/features/contentsSlice';
import { ContentItem } from './page';

interface CategoryContentsProps {
  result: {
    _id: string;
    title: string;
    img_src: string;
    author: string;
    price: number;
    description: string;
    category: {
      name: string;
    };
    popular: boolean;
    discounted: boolean;
    discountRate: number;
    stock: number;
    brand: string;
    shipping_fee: number;
    status: string;
    sales: number;
    isLiked: boolean;
  }[];
}

interface LikeProps {
 id: string;
    contents: string;
    email: string
     isLiked: boolean
    
}

export default function CategoryContents({ result }: CategoryContentsProps) {
  // export default function CategoryPage() {
  // const router = useRouter();

  const [localResult, setLocalResult] = useState(result);

  const dispatch = useDispatch();

  useEffect(() => {
    
    dispatch(asyncLike());

    
    
  }, []);


  const likeData = useSelector(
    (state: RootState) => state.contents.likeData as LikeProps[]);

    const updateResult = useCallback(() => {
      const updatedResult = result.map((item) => {
        const likeStatus = likeData.find(
          (like) => like.contents.toString() === item._id.toString()
        );
        return {
          ...item,
          _id: item._id.toString(),
          isLiked: likeStatus?.isLiked ?? false,
        };
      });
      setLocalResult(updatedResult);
    }, [result, likeData]);
  
    useEffect(() => {
      updateResult();
    }, [updateResult]);


  // useEffect(() => {
  //   // dispatch(asyncContents());
  // //   // .then(() => {
  // //   // console.log('모든 컨텐츠 데이터 가져옴');
  // //   // });

  
  // setLocalResult(result);
  // }, [result]);

  // const allContents = useSelector(
  //   (state: RootState) => state.contents.contentsData as ContentItem[]
  // );

  // console.log(result, 'result~ㅎㅇ~~~~~~~~~~~~~~~~~~~~~~~~');

  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-5'>
        {localResult.map((el, i) => (
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
                    <FontAwesomeIcon
                      icon={el.isLiked ? faHeart : regularHeart}
                      // style={{ color: '#511f1f' }} // 카트아이콘 색상 변경하기
                      className={`mr-1 text-red-500`}
                      onClick={() => {
                        const _id = { _id: el._id };
                        // console.log(el._id, 'ㅎㅇ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
                        // likeToggle 해당 _id에 해당하는 객체의 isLiked 값을 토글하는 역할을 하는 reducer
                        dispatch(likeToggle(_id));

                        // likeChange 액션을 디스패치하여 서버에 like 상태 변경 요청
                        dispatch(likeChange(_id));

                        const updatedResult = [...localResult];
                        updatedResult[i].isLiked = !updatedResult[i].isLiked;
                        setLocalResult(updatedResult);


                      }}
                    />
                    <CartIcon _id={el?._id.toString()}></CartIcon>
                  </div>
                </div>
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
