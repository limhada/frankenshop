'use client';

import axios from 'axios';
import { useState } from 'react';

interface CommentProps {
  _id: string;
}
export default function Comment({ _id }: CommentProps) {
  let [comment, setComment] = useState('');
  return (
    <div>
      <div>댓글목록</div>
      <input
        onChange={(e) => {
          setComment(e.target.value);
        }}
        className='bg-gray-200'
      />
      <button
        onClick={() => {
          // console.log(comment);
          axios.post('/api/comment/new', {
            comment: comment,
            _id: _id,
          })
          .then(r => {
            console.log(r.data); // 서버로부터 받은 데이터
          })
          .catch(error => {
            // 요청이 실패한 경우에 대한 처리
            console.error(error);
          });

        }}
      >
        댓글 작성
      </button>
    </div>
  );
}
