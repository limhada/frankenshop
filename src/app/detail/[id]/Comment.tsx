'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';

interface CommentProps {
  _id: string;
}

interface CommentData {
  content: string;
}
export default function Comment({ _id }: CommentProps) {
  let [comment, setComment] = useState('');

  let [data, setData] = useState<CommentData[]>([]); // let [data, setData] = useState([{content: ""}]); 같은 기능을 하지만 제네릭을 사용하는게 더 명확하고 안전하기 때문에 좋음
  

  useEffect(()=> {
    axios.get(`/api/comment/list?_id=${_id}`)
    .then((r)=> {
      // console.log(r.data, "확인~~");
      setData(r.data)
      // console.log(data) // -> 데이터가 비어있는 경우 state변경 함수는 약간 늦게 실행되기 때문 따라서 오래걸리는 setData(r.data) 보다 console.log(data)를 먼저 실행하기 때문!
    })

  },[])

  console.log(data, "확인~~~~~~~~~~~~~~~~~~~~~~~~~~~");

  return (
    <div>
      <div>댓글목록</div>
      
      {
        data.length > 0 ?
        data.map((el, i)=>{
          return(
            <p key={i}>{el.content}</p>
          )
        })
        : <p>아직 댓글이 없습니다</p>
      }
      
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
            // console.log(r.data); // 서버로부터 받은 데이터
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
