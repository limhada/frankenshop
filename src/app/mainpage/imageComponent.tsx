'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faPause } from '@fortawesome/free-solid-svg-icons';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

// TODO 이미지 슬라이드 크기 조절하기
// TODO <1/5> 번호 2~6까지인거 수정하기 1~마지막번호로
// FIXME: 이미지 슬라이드 디바이스 별 크기 조정하기
import Image from 'next/image';
import { useCallback, useEffect, useMemo, useState } from 'react';
// interface Project {
//   id: number;
//   image: string;
//   title: string;
//   github: string;
//   deployment: string;
//   description: string;
//   background: React.ReactNode;
//   imageName: string;
// }

type ImageGroup = {
  [key: string]: string[];
};

export default function ImageComponent(): React.ReactElement {
  // TODO: imgArr 서버에서 받아온 값으로 업데이트 하기
  const imgArr: ImageGroup = {
    imgtest: [
      '/imgTest/1.jpeg',
      '/imgTest/2.jpeg',
      '/imgTest/3.jpeg',
      '/imgTest/4.jpeg',
      '/imgTest/5.jpeg',
      '/imgTest/6.jpeg',
    ],
  };

  // 기존코드
  // const imageList = [
  //   imgArr.imgtest[imgArr.imgtest.length - 1],
  //   ...imgArr.imgtest,
  //   imgArr.imgtest[0],
  // ];

  /**
   * useMemo를 사용하여 imageList를 초기화하고, imgArr.imgtest가 변경될 때만 useMemo가 재계산되도록 의존성 배열에 추가했습니다. 이렇게 하면 useEffect에서의 의존성 경고가 사라집니다.
   */
  const imageList = useMemo(
    () => [
      imgArr.imgtest[imgArr.imgtest.length - 1],
      ...imgArr.imgtest,
      imgArr.imgtest[0],
    ],
    [imgArr.imgtest]
  );

  const [currentImgIndex, setCurrentImgIndex] = useState<number>(1); // useEffect로 첫번째 사진일 경우 마지막으로 이동하기 때문에 1로 해야 원하는 첫번째 이미지가 나타남
  const [dragging, setDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [offsetX, setOffsetX] = useState<number>(0);
  const [num, setNum] = useState('duration-700');
  // TODO: 자동 슬라이드 정리하기

  // 자동슬라이드 코드
  // 자동 슬라이드 제어
  const [autoSlide, setAutoSlide] = useState<boolean>(true);

  /**
   * 
   * TODO: 정리하기
useCallback은 React Hooks 중 하나로, 함수를 메모이제이션하여 성능 최적화를 수행하는 데 사용됩니다. 메모이제이션은 같은 입력에 대한 결과를 캐시하고, 같은 입력이 들어올 때 이전에 계산한 값을 사용함으로써 중복 계산을 피하는 것을 의미합니다.

useCallback이란?

useCallback은 매번 렌더링 시에 새로 생성되는 함수를 최적화하여, 함수를 메모이제이션합니다.
일반적으로 부모 컴포넌트가 자식 컴포넌트에게 함수를 전달할 때, 자식 컴포넌트에서는 useCallback을 사용하여 함수를 메모이제이션하면 성능상 이점이 있습니다.
1번에 대한 수정 설명:

handleNextSlide 함수가 useEffect 외부에 정의되어 있어, 이 함수는 매 렌더링 시에 새로운 함수로 간주되고 useEffect의 의존성 배열에 추가되었습니다.
에러가 발생한 이유는 useEffect의 의존성 배열에 있는 변수들이 변경될 때마다 handleNextSlide 함수가 새로 생성되기 때문입니다.
해결을 위해 useCallback을 사용하여 handleNextSlide 함수를 메모이제이션하고, 의존성 배열에 handleNextSlide 함수를 추가하여 의존성이 변경될 때마다 새로운 함수가 생성되지 않도록 했습니다.
   * 
   */
  const handleNextSlide = useCallback(() => {
    if (currentImgIndex < imageList.length - 1) {
      setCurrentImgIndex(currentImgIndex + 1);
    } else {
      setCurrentImgIndex(0);
    }
  }, [currentImgIndex, imageList.length]);

  useEffect(() => {
    // 자동 슬라이드를 위한 타이머
    let timer: NodeJS.Timeout;

    if (autoSlide) {
      // autoSlide 상태가 true일 때만 타이머 설정
      timer = setInterval(() => {
        if (!dragging) {
          // 자동 슬라이드
          handleNextSlide();
        }
      }, 3000); // 2초마다 다음 슬라이드로 이동
    }

    return () => {
      // 컴포넌트 언마운트 시 타이머 클리어
      clearInterval(timer);
    };
  }, [currentImgIndex, dragging, autoSlide, handleNextSlide]);

  const handleToggleAutoSlide = (): void => {
    setAutoSlide(!autoSlide); // 자동 슬라이드 상태 토글
  };

  useEffect(() => {
    const handleSlide = () => {
      if (currentImgIndex === 0) {
        setNum('duration-0');
        setCurrentImgIndex(imageList.length - 2);
      } else if (currentImgIndex >= imageList.length - 1) {
        setNum('duration-0');
        setCurrentImgIndex(1);
      } else {
        setNum('duration-700');
      }
    };

    const timer = setTimeout(handleSlide, 600);
    return () => clearTimeout(timer);
  }, [currentImgIndex, imageList]);

  const handleMouseDown = (e: React.MouseEvent): void => {
    setDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent): void => {
    if (!dragging) return;
    const diffX = e.clientX - startX;
    setOffsetX(diffX);
  };

  const handleMouseUp = (): void => {
    setDragging(false);
    if (offsetX > 50) {
      if (currentImgIndex > 0) {
        setCurrentImgIndex(currentImgIndex - 1);
      } else {
        // 이미지가 처음일 때 왼쪽으로 이동하면 맨 마지막 이미지로 이동
        setCurrentImgIndex(imageList.length - 1);
      }
    } else if (offsetX < -50) {
      if (currentImgIndex < imageList.length - 1) {
        setCurrentImgIndex(currentImgIndex + 1);
      } else {
        // 이미지가 마지막일 때 오른쪽으로 이동하면 첫 번째 이미지로 이동
        setCurrentImgIndex(0);
      }
    }
    setOffsetX(0);
  };

  // 터치 슬라이드 로직
  const handleTouchStart = (e: React.TouchEvent): void => {
    setDragging(true);
    setStartX(e.changedTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent): void => {
    if (!dragging) return;
    const diffX = e.changedTouches[0].clientX - startX;
    setOffsetX(diffX);
  };

  const handleTouchEnd = (): void => {
    handleMouseUp(); // 마우스 이벤트 처리와 동일한 로직을 수행하므로 기존의 handleMouseUp 함수를 호출
  };

  return (
    <div className=''>
      <div
        // w-가로값, pb-[20%] 부모의 20%로 세로값
        className='relative w-[100%] pb-[25%] h-10 overflow-hidden shadow-md rounded-md'
        onMouseMove={handleMouseMove}
        // onTouchMove={handleTouchMove}
      >
        {imageList.map((src: string, index: number) => (
          <Image
            key={index}
            src={src}
            alt={''}
            width={600}
            height={300}
            quality={100}
            className={`absolute top-0 left-0 w-full h-full ${
              dragging ? '' : `transition-transform ${num}`
            }`}
            style={{
              transform: ((): string => {
                if (currentImgIndex === index) {
                  return `translateX(${offsetX}px)`;
                } else if (index === currentImgIndex + 1) {
                  return `translateX(calc(100% + ${offsetX}px))`;
                } else if (index < currentImgIndex) {
                  return `translateX(calc(-100% + ${offsetX}px))`;
                } else {
                  return 'translateX(100%)';
                  // currentImgIndex < index인 나머지 이미지를 오른쪽으로 이동
                }
              })(),
              // objectFit: "contain", // 이미지를 원본사이즈로
              // objectFit: 'fill',
              // objectFit: 'cover',
            }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            // onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            draggable='false'
          />
        ))}
      </div>

      <div className='flex items-center justify-center '>
        {/* <div className='bg-[#eef0f0] rounded-3xl my-4'> */}
        {/* <div className='bg-[#fafafa] rounded-3xl my-4'> */}
        <div className='bg-[#f5f5f5] rounded-3xl my-4'>
          <button
            className={`w-10 h-10 
            
            `}
            onClick={() => {
              if (currentImgIndex > 0) {
                setCurrentImgIndex(currentImgIndex - 1);
              } else {
                setCurrentImgIndex(imageList.length - 1);
              }
            }}
          >
            &lt;
          </button>
          {/* 이미지 번호 출력 */}
          {currentImgIndex === 0
            ? imageList.length - 2 // 첫 번째 이미지를 나타낼 때는 마지막 이미지 번호를 표시
            : currentImgIndex === imageList.length - 1
            ? 1 // 마지막 이미지를 나타낼 때는 첫 번째 이미지 번호를 표시
            : currentImgIndex}{' '}
          / {imageList.length - 2}
          <button
            className={`w-10 h-10 `}
            onClick={() => {
              if (currentImgIndex < imageList.length - 1) {
                setCurrentImgIndex(currentImgIndex + 1);
              } else {
                setCurrentImgIndex(0);
              }
            }}
          >
            &gt;
          </button>
          {/* 자동 슬라이드 버튼 */}
          <button className={`w-10`} onClick={handleToggleAutoSlide}>
            {autoSlide ? (
              <FontAwesomeIcon icon={faPause} />
            ) : (
              <FontAwesomeIcon icon={faPlay} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
