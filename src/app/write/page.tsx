'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function Write() {
  // FIXME: 현재 로그인이 되어있지 않다면 로그인 페이지로 이동시키기 -> nextjs 미들웨어로 처리하기
  // FIXME: 이미지파일 선택 시 정상적으로 업로드 되는지 확인하기!! 맨 아래 주석처리된 코드는 정상적인 코드이지만 중복된 코드가 많아서 수정중임

  const router = useRouter();

  const [createURL, setCreateURL] = useState('');
  const [file, setFile] = useState<File>(); // 이미지 파일 상태 추가
  let [src, setSrc] = useState('');

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // TODO: 이미지 파일 없이 게시물 작성 가능하게 수정하기!!!!!!!!!!!!

  const postData = {
    title: title,
    content: content,
    img_src: '',
  };

  return (
    <div className='p-20'>
      <h4>글작성</h4>
      <form
        action='/api/post/new'
        method='POST'
        onSubmit={async (e: FormEvent) => {
          e.preventDefault();

          try {
            if (file) {
              let filename = encodeURIComponent(file.name);

              // 서버로 파일을 post 요청하기
              const res = await axios.post(`/api/post/image?file=${filename}`);
              // console.log(res.data, '확인~~~~~~~~~~');

              // 서버에서 응답받은 데이터로 S3에 이미지 업로드하기
              // TODO: 블로그에 라이브러리 사용법 정리하기

              // S3 업로드
              const s3FormData = new FormData();
              Object.entries({ ...res.data.fields, file }).forEach(
                ([key, value]) => {
                  s3FormData.append(key, value as any);
                }
              );
              // TODO: s3에 이미지를 업로드 할때,중복 이름의 이미지 업로드 되지 않는 문제 해결하기
              const s3Result = await axios.post(res.data.url, s3FormData);
              // console.log(s3Result, '결과?????????????');

              if (s3Result.status === 204) {
                // setSrc(`${res.data.url}/${filename}`);
                // TODO: s3에 업로드한 이미지 몽고db에 저장하기 그리고 게시물 리스트에서 게시물 클릭시 해당 게시물의 내용과 함께 이미지도 보여주기
                // ㄴ> 게시판 답변: 파일명에 랜덤문자넣거나 날짜 넣거나 그렇게, (내가 생각한 방법 : 현재 유저의닉네임+현재시간+이미지이름 으로 s3에 이미지 이름을 저장)
                // e.target.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
                postData.img_src = `${res.data.url}/${filename}`;

                const postResponse = await axios.post(
                  '/api/post/new',
                  postData
                );
                if (postResponse.status === 200) {
                  // 페이지를 새로고침하면서 이동
                  router.refresh();
                  router.push('/list');
                }
              } else {
                console.log('이미지 업로드 실패');
              }
            }

            // 이미지 없을때 글작성 서버로 요청
            const postResponse = await axios.post('/api/post/new', postData);
            if (postResponse.status === 200) {
              // 페이지를 새로고침하면서 이동
              router.refresh();
              router.push('/list');
            }
          } catch (error) {
            console.error('에러 발생:', error);
          }
        }}
      >
        <input
          name='title'
          placeholder='글 제목'
          className='className="block w-full p-2 mb-2 border rounded-lg"'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          name='content'
          placeholder='글 내용'
          className='className="block w-full p-2 mb-2 border rounded-lg"'
          value={content}
          onChange={(e) => setContent(e.target.value)}
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
            }}
          >
            글작성버튼
          </button>
        </div>
      </form>
    </div>
  );
}
