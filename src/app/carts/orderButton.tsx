// 'use client';


export default function OderButton() {


  return (
    <div>
      <button
        className='text-white h-[3rem] cursor-pointer overflow-visible p-1 border-1 border-gray-300 rounded-md bg-myColor1'
        onClick={() => {
          // .then((r) => {
          //   // console.log('결과~~~~~~~~~' , r);
          // })
          // .catch((error) => {
          //   console.error('에러 발생:', error);
          // });
        }}
      >
        구매하기버튼
      </button>
    </div>
  );
}
