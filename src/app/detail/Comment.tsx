'use client';

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
          console.log(comment);
          fetch('/api/comment/new', {
            method: 'POST',
            body: JSON.stringify({
              comment: comment,
              _id: _id,
            }),
          });
        }}
      >
        댓글 작성
      </button>
    </div>
  );
}
