'use client'

// FIXME: 마우스 드래그로 안됨 터치로만 됨
// import classNames from 'classnames';
import React, { FC, useEffect, useRef, useState } from 'react';
// import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

interface Props {
  data: string[];
}

const Test: FC<Props> = ({ data }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [imageList] = useState([data[data?.length - 1], ...data, data[0]]);

  const [currentImgIndex, setCurrentImgIndex] = useState(1);

  const [touch, setTouch] = useState({
    start: 0,
    end: 0,
  });

  const [style, setStyle] = useState({
    transform: `translateX(-${currentImgIndex}00%)`,
    transition: `all 0.4s ease-in-out`,
  });

  const nextSlide = () => {
    setCurrentImgIndex(currentImgIndex + 1);
    setStyle({
      transform: `translateX(-${currentImgIndex + 1}00%)`,
      transition: `all 0.4s ease-in-out`,
    });
  };

  const prevSlide = () => {
    setCurrentImgIndex(currentImgIndex - 1);
    setStyle({
      transform: `translateX(-${currentImgIndex - 1}00%)`,
      transition: `all 0.4s ease-in-out`,
    });
  };

  useEffect(() => {
    if (currentImgIndex === 0) {
      setCurrentImgIndex(imageList.length - 2);
      setTimeout(function () {
        setStyle({
          transform: `translateX(-${imageList.length - 2}00%)`,
          transition: '0ms',
        });
      }, 500);
    }

    if (currentImgIndex >= imageList?.length - 1) {
      setCurrentImgIndex(1);
      setTimeout(() => {
        setStyle({
          transform: `translateX(-${1}00%)`,
          transition: '0ms',
        });
      }, 500);
    }
  }, [currentImgIndex, imageList.length]);

  return (
    <div className='relative'>
      <div
        className='overflow-hidden max-w-[480px] min-w-[280px] w-full bg-black'
        onTouchStart={(e) => {
          setTouch({
            ...touch,
            start: e.touches[0].pageX,
          });
        }}
        onTouchMove={(e) => {
          if (ref?.current) {
            const current = ref.current.clientWidth * currentImgIndex;
            const result = -current + (e.targetTouches[0].pageX - touch.start);
            setStyle({
              transform: `translate3d(${result}px, 0px, 0px)`,
              transition: '0ms',
            });
          }
        }}
        onTouchEnd={(e) => {
          const end = e.changedTouches[0].pageX;
          if (touch.start > end) {
            nextSlide();
          } else {
            prevSlide();
          }
          setTouch({
            ...touch,
            end,
          });
        }}
      >
        <div ref={ref} style={style} className={`flex`}>
          {imageList?.map((el, i) => {
            return (
              <img
                key={i}
                src={el}
                className={'w-auto h-auto object-contain'}
                // draggable='false' // 이미지 드래그 방지
              />
            );
          })}
        </div>
      </div>
      <div className='absolute w-full flex justify-between top-[50%]'>
        <button className='text-white text-xl' onClick={prevSlide}>
          &lt;
        </button>
        <button className='text-white text-xl' onClick={nextSlide}>
          &gt;오른쪽
        </button>
      </div>
      <div className='text-gray-500 mt-4 text-center flex justify-center'>
        {data.map((el, i) => {
          return (
            <div
              key={i}
              // className={classNames(
              //   'bg-gray-200 h-[6px] w-[6px] mr-1 rounded',
              //   {
              //     'bg-rose-200': i + 1 === currentImgIndex,
              //   }
              // )}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Test;
