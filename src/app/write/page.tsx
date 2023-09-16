'use client';

import axios from 'axios';
import { useState } from 'react';

export default function Write() {
  // FIXME: 현재 로그인이 되어있지 않다면 로그인 페이지로 이동시키기

  const [createURL, setCreateURL] = useState('');
  const [file, setFile] = useState<File>(); // 이미지 파일 상태 추가
  let [src, setSrc] = useState('');

  return (
    <div className='p-20'>
      <h4>글작성</h4>
      <form action='/api/post/new' method='POST'>
        <input
          name='title'
          placeholder='글 제목'
          className='className="block w-full p-2 mb-2 border rounded-lg"'
        />
        <input
          name='content'
          placeholder='글 내용'
          className='className="block w-full p-2 mb-2 border rounded-lg"'
        />
        <input name='img_src' defaultValue={src}
        className='w-full p-2 mb-2 border rounded-lg '
        />


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
                  const res = await axios.post(
                    `/api/post/image?file=${filename}`
                  );
                  // console.log(res.data, '확인~~~~~~~~~~');

                  // 서버에서 응답받은 데이터로 S3에 이미지 업로드하기
                  // TODO: 블로그에 라이브러리 사용법 정리하기

                  // S3 업로드
                  const formData = new FormData();
                  Object.entries({ ...res.data.fields, file }).forEach(
                    ([key, value]) => {
                      formData.append(key, value as any);
                    }
                  );

                  const s3Result = await axios.post(res.data.url, formData);
                  console.log(s3Result, '결과?????????????');

                  if (s3Result.status === 200) {
                    // setSrc(`${s3Result.data.url}/${filename}`);
                    // TODO: s3에 업로드한 이미지 몽고db에 저장하기 그리고 게시물 리스트에서 게시물 클릭시 해당 게시물의 내용과 함께 이미지도 보여주기
                                        
                  } else {
                    console.log('실패');
                  }
                } catch (error) {
                  console.error('에러 발생:', error);
                }
              }
            }}
          >
            글작성버튼
          </button>
        </div>
      </form>
    </div>
  );
}
