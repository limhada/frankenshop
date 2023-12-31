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
import CartIcon from '../components/CartIcon';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import {
  asyncContents,
  likeChange,
  likeToggle,
} from '../redux/features/contentsSlice';

export interface ContentItem {
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

// export default function Content({ result }: ContentsProps) {
export default function Content() {
  // 이미지와 정보가 들어있는 배열 객체
  // TODO: 서버에서 받아오는 데이터로 변경하기
  // TODO: 해당 상품 클릭 시 상세페이지로 이동하게
  // TODO: 로그인 x 시 좋아요 클릭 시 로그인 하라고 알림창, 모든 하트 아이콘 기본 검은색으로
  // FIXME: 서버에서 받아온 데이터 값 가져오기
  // TODO: 로고 캐릭터 및 프란켄샵 글꼴 이쁘게 바꿔서 이미지로 넣기
  // TODO: 컨텐츠 내용 무한스크롤 구현하기? or 페이지 번호 만들기 (한 페이지에 10개만 보여주는 등 )

  // TODO: 장바구니에 추가
  // TODO: 로그인 x 시 장바구니 페이지 접근 x
  // TODO: 몽고db 상품 정보에 수량, 배송비 추가하기(배송비는 얼마이상 및 묶음배송 시 어떻게 처리할지 정하기)

  // const router = useRouter();

  // TODO: 정리하기 -> as ContentItem[] 지정 안할 시 'never' 형식에 '_id' 속성이 없습니다. 에러 발생 데이터를 받아오기 전 빈 배열 [] 이기 때문!
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncContents());
    // .then(() => {
    // console.log('모든 컨텐츠 데이터 가져옴');
    // });
  }, []);

  // const allContents = useSelector((state: RootState) => state.allContents.contentsData as ContentItem[])
  const allContents = useSelector(
    (state: RootState) => state.contents.contentsData as ContentItem[]
  );

  // console.log('allContents ㅎㅇ~~~~~',allContents);

  // const [contentsData, setContentsData] = useState(result);

  // console.log(contentsData, "ㅎㅇ contentsData~~~~~~~~~~~~~~~~~~~~");
  return (
    <div>
      {/* <div>테스트~~~ allContents : {allContents}</div> */}
      <h1>상품리스트</h1>
      {/* <img src='/imgtest/1.jpeg' /> */}
      <div className='grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-5'>
        {allContents.map((el, i) => (
          <div
            key={i}
            // max-w-[20rem] min-w-[20rem] // TODO: 최소 최대 크기 정하기
            className=' w-[18rem] rounded overflow-hidden shadow-lg place-self-center'
          >
            {/* <div>현재 데이터 확인용{JSON.stringify(el)}</div> */}

            <Link href={'/detail/' + el._id.toString()}>
              {/* <img src={el.img_src} alt={el.title} className='w-full' /> */}
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
                  // className='inline-block'
                  className='inline-flex' // 자식 요소의 크기만큼만 자리차지
                  // 위 코드와 동일 style={{ display: 'inline-block' }}
                >
                  {/* 기존 좋아요 버튼 v1 */}
                  {/* <FontAwesomeIcon
                    icon={el.like ? faHeart : regularHeart}
                    // 몽고db에서 받아온 result 데이터의 like는 string 형식이라 별도로 변환이나 처리가 필요함
                    onClick={() => handelLikeClick(i)}
                    // FIXME: 좋아요 버튼 클릭 시 좋아요 상태 true or false 몽고 db에 어떻게 업데이트 할 것인지 정하기
                    className={`h-2 ${el.like ? 'text-red-500' : ''}`}
                  /> */}

                  {/* 좋아요 아아이콘 v2 */}
                  {/* <FontAwesomeIcon
                    icon={el.isLiked ? faHeart : regularHeart}
                    // style={{ color: '#511f1f' }} // 카트아이콘 색상 변경하기
                    className={`h-2 ${el.isLiked ? 'text-red-500' : ''}`}
                    onClick={() => {
                      const _id = { _id: allContents[i]._id };
                      axios
                        .post('/api/contents/likeChange', _id)
                        .then((r) => {
                          // console.log("좋아요 데이터 확인", r.data);

                          setContentsData(r.data);
                          // FIXME: 중요 - 추후 리덕스 or 다른 방법을 해결하기 장바구니에 추가 후 장바구니로 이동 시 새로고침 하지 않으면 추가된 수량이 업데이트 되지 않는 문제 해결하기 위함
                        })
                        .catch((error) => {
                          // 요청이 실패한 경우에 대한 처리
                          console.error(error);
                        });
                    }}
                  /> */}

                  {/* 좋아요 아아이콘 v3 - 리덕스 툴킷 적용*/}
                  <FontAwesomeIcon
                    icon={el.isLiked ? faHeart : regularHeart}
                    // style={{ color: '#511f1f' }} // 카트아이콘 색상 변경하기
                    className={`h-2 ${el.isLiked ? 'text-red-500' : ''}`}
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
                  />

                  {/* 장바구니 아이콘 */}
                  {/* TODO: 장바구니에 몇개 담겨있는지 표시할지 말지?? */}
                  <CartIcon itemId={allContents[i]._id}></CartIcon>
                </div>
                {/* TODO: 평점? 추가할지 말지 */}
                <div className='font-bold text-xl mb-2'>{el.title}</div>
                <p className='text-gray-700 text-base'>{el.description}</p>
                <p className='text-gray-700 text-base'>{el.price}원</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
