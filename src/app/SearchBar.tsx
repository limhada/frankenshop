'use client';


// TODO: 검색창 기능 구현하기
function SearchBar() {
  return (
    <div className='relative'>
      <input
        type='text'
        placeholder='검색어를 입력하세요'
        className='w-[90%] border rounded-lg focus:ring-2 focus:ring-blue-500'
      />
      <button
        onClick={() => {
          // console.log('검색클릭');
        }}
        className='bg-mycolor1 rounded-lg'
      >
        🔍
      </button>
    </div>
  );
}

export default SearchBar;
