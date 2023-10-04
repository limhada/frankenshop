'use client';

// FIXME: 마우스 드래그로 안됨 터치로만 됨


import React, { FC, useEffect, useRef, useState } from 'react';

interface Props {
  data: string[];
}

const Test: FC<Props> = ({ data }) => {
  const ref = useRef<HTMLDivElement>(null);
  const imageList = [data[data?.length - 1], ...data, data[0]];
  const [currentImgIndex, setCurrentImgIndex] = useState(1);
  const [touch, setTouch] = useState({
    start: 0,
    end: 0,
  });
  const [mouse, setMouse] = useState({
    isDragging: false,
    startX: 0,
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

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setMouse({
      isDragging: true,
      startX: e.pageX,
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mouse.isDragging) return;
    if (ref?.current) {
      const current = ref.current.clientWidth * currentImgIndex;
      const result = -current + (e.pageX - mouse.startX);
      setStyle({
        transform: `translate3d(${result}px, 0px, 0px)`,
        transition: '0ms',
      });
    }
  };

  const handleMouseUp = () => {
    setMouse({
      isDragging: false,
      startX: 0,
    });
    const end = mouse.startX;
    if (mouse.startX > end) {
      nextSlide();
    } else if (mouse.startX < end) {
      prevSlide();
    }
  };

  useEffect(() => {
    if (currentImgIndex === 0) {
      setCurrentImgIndex(imageList.length - 2);
      setTimeout(() => {
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
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <div ref={ref} style={style} className={`flex`}>
          {imageList?.map((el, i) => (
            <img
              key={i}
              src={el}
              className={'w-auto h-auto object-contain'}
              draggable='false' // 이미지 드래그 방지
            />
          ))}
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
    </div>
  );
};

export default Test;
