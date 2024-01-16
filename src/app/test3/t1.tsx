// 'use client';


// import React, { useState } from 'react';

// const CHO_HANGUL = [
//   'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ',
//   'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ',
//   'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ',
//   'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ',
// ];

// const HANGUL_START_CHARCODE = "가".charCodeAt(0);
// const CHO_PERIOD = Math.floor("까".charCodeAt(0) - "가".charCodeAt(0));
// const JUNG_PERIOD = Math.floor("개".charCodeAt(0) - "가".charCodeAt(0));

// function combine(cho, jung, jong) {
//   return String.fromCharCode(
//     HANGUL_START_CHARCODE + cho * CHO_PERIOD + jung * JUNG_PERIOD + jong
//   );
// }

// function makeRegexByCho(search = "") {
//   return CHO_HANGUL.reduce(
//     (acc, cho, index) =>
//       acc.replace(
//         new RegExp(cho, "g"),
//         `[${combine(index, 0, 0)}-${combine(index + 1, 0, -1)}]`
//       ),
//     search
//   );
// }

// function includeByCho(search, targetWord) {
//   return new RegExp(`(${makeRegexByCho(search)})`, "g").test(targetWord);
// }

// function t1() {
//   const [search, setSearch] = useState("");
//   const list = ["사과", "수박", "멜론", "파인애플", "산딸기", "딸기", "망고", "상품1", '상품2', "상품3", '상품4'];

//   const handleSearchChange = (event) => {
//     setSearch(event.target.value.trim());
//   };

//   const filteredList = list.filter((item) => includeByCho(search, item));

//   return (
//     <div>
//       <input type="text" value={search} onChange={handleSearchChange} />
//       <div className="docs">
//         <span>
//           {search &&
//             (filteredList.length > 0 ? (
//               filteredList.map((item, index) => (
//                 <React.Fragment key={index}>
//                   <span className='bg-red-600'>{item.replace(new RegExp(`(${makeRegexByCho(search)})`, "g"), "$1")}</span>
//                   {index !== filteredList.length - 1 && ', '}
//                 </React.Fragment>
//               ))
//             ) : (
//               <span>일치하는 단어가 없습니다.</span>
//             ))}
//         </span>
//       </div>
//     </div>
//   );
// }


// export default t1;