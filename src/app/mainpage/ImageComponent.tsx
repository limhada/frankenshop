'use client';

// FIXME: https://blog.okdohyuk.dev/66 이미지 슬라이드 부자연스러움 수정하기

// TODO: 이미지 슬라이드 크기 조절하기
// TODO: <1/5> 번호 2~6까지인거 수정하기 1~마지막번호로

import Image from 'next/image';
import { useEffect, useState } from 'react';
interface Project {
  id: number;
  image: string;
  title: string;
  github: string;
  deployment: string;
  description: string;
  background: React.ReactNode;
  imageName: string;
}

type ImageGroup = {
  [key: string]: string[];
};

export default function ImageComponent(): React.ReactElement {
  const imgArr: ImageGroup = {
    imgtest: [
      '/imgtest/1.jpeg',
      '/imgtest/2.jpeg',
      '/imgtest/3.jpeg',
      '/imgtest/4.jpeg',
      '/imgtest/5.jpeg',
      '/imgtest/6.jpeg',
    ],
  };
  const imageList = [
    imgArr.imgtest[imgArr.imgtest.length - 1],
    ...imgArr.imgtest,
    imgArr.imgtest[0],
  ];

  const [currentImgIndex, setCurrentImgIndex] = useState<number>(1); // useEffect로 첫번째 사진일 경우 마지막으로 이동하기 때문에 1로 해야 원하는 첫번째 이미지가 나타남
  const [dragging, setDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [offsetX, setOffsetX] = useState<number>(0);
  const [num, setNum] = useState('duration-700');
  // TODO: 자동 슬라이드 정리하기

  // 자동슬라이드 코드
  // 자동 슬라이드 제어
  const [autoSlide, setAutoSlide] = useState<boolean>(true);

  useEffect(() => {
    // 자동 슬라이드를 위한 타이머
    let timer: NodeJS.Timeout;

    if (autoSlide) {
      // autoSlide 상태가 true일 때만 타이머 설정
      timer = setInterval(() => {
        if (!dragging) {
          // 드래그 중에는 자동 슬라이드 중지
          handleNextSlide();
        }
      }, 3000); // 2초마다 다음 슬라이드로 이동
    }

    return () => {
      // 컴포넌트 언마운트 시 타이머 클리어
      clearInterval(timer);
    };
  }, [currentImgIndex, dragging, autoSlide]);

  const handleNextSlide = (): void => {
    if (currentImgIndex < imageList.length - 1) {
      setCurrentImgIndex(currentImgIndex + 1);
    } else {
      setCurrentImgIndex(0);
    }
  };

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
        className='relative w-[100%] pb-[20%] h-10 overflow-hidden shadow-md rounded-md'
        onMouseMove={handleMouseMove}
        // onTouchMove={handleTouchMove}
      >
        {imageList.map((src: string, index: number) => (
          <Image
            key={index}
            src={src}
            alt={''}
            width={300}
            height={370}
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
              objectFit: 'cover',
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

      <div className='flex items-center justify-center'>
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
        {/* {currentImgIndex} / {imageList.length-2} */}
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
        <button className={`w-10 h-10 ml-2`} onClick={handleToggleAutoSlide}>
          {autoSlide ? '일시정지' : '재시작'}
        </button>
      </div>
    </div>
  );
}
