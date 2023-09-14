'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Response {
  fields?: any;
  url?: any;
  json?: any;
}

// TODO: 블로그에 정리하기 선택한 파일 화면에 렌더링 하는 방법
export default function Write() {
  const [createURL, setCreateURL] = useState('');
  const [file, setFile] = useState<File>(); // 이미지 파일 상태 추가
  let [src, setSrc] = useState('');

  return (
    <div className='p-20'>
      <h4>글작성</h4>
      <input
        type='file'
        accept='image/*'
        onChange={async (e) => {
          let file = e.target.files?.[0];
          if (file) {
            // 파일을 화면에 렌더링해주는 기능
            setFile(file);
            const blob = new Blob([file], { type: file.type });
            const url = URL.createObjectURL(blob);
            setCreateURL(url);
          }
        }}
      />
      <img src={createURL} />
      <button
        type='submit'
        className='px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600'
        onClick={async () => {
          // 한글로된 파일명이 깨지지 않게 하기 위해서
          if (file) {
            let filename = encodeURIComponent(file.name);

            try {
              // 서버로 파일을 post 요청하기
              const res = await axios.post(`/api/post/image?file=${filename}`);
              console.log(res.data, "확인~~~~~~~~~~");
            
              // 서버에서 응답받은 데이터로 S3에 이미지 업로드하기
              // TODO: 블로그에 라이브러리 사용법 정리하기
            
              // S3 업로드
              const formData = new FormData();
              Object.entries({ ...res.data.fields, file }).forEach(([key, value]) => {
                formData.append(key, value as any);
              });
            
              const 업로드결과 = await axios.post(res.data.url, formData);
              console.log(업로드결과, "결과?????????????");
            
              if (업로드결과.status === 200) {
                setSrc(`${업로드결과.data.url}/${filename}`);
              } else {
                console.log("실패");
              }
            } catch (error) {
              console.error("에러 발생:", error);
            }

          }

        }}
      >
        글작성버튼
      </button>
    </div>
  );
}
