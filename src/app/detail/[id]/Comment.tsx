'use client';

// TODO: 댓글 삭제기능

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface CommentProps {
  _id: string;
  session: {
    user: {
      name: string;
      email: string;
      role: string;
    };
  };
}

interface CommentData {
  content: string;
  author_name: string;
}

// TODO: 댓글 작성 버튼 클릭 시 댓글창에 기존에 입력 한 값 초기화 시키기

export default function Comment({ _id, session }: CommentProps) {
  let router = useRouter();

  let [comment, setComment] = useState('');

  let [data, setData] = useState<CommentData[]>([]); // let [data, setData] = useState([{content: ""}]); 같은 기능을 하지만 제네릭을 사용하는게 더 명확하고 안전하기 때문에 좋음

  // 페이지에 접속 시 댓글 정보를 요청하는 코드
  useEffect(() => {
    axios.get(`/api/comment/list?_id=${_id}`).then((r) => {
      setData(r.data);
      // console.log(data) // -> 데이터가 비어있는 경우 state변경 함수는 약간 늦게 실행되기 때문 따라서 오래걸리는 setData(r.data) 보다 console.log(data)를 먼저 실행하기 때문!
    });
  }, []);

  // TODO: 로그인 상태 아니면 댓글작성 안보이게 그리고 댓글작성 만약 누르면 로그인 하라고 안내하기

  return (
    <div>
      <div>댓글목록</div>

      {
        // 서버에서 응답받은 댓글 정보가 들어있는 data
        data.length > 0 ? (
          data.map((el, i) => {
            return (
              <p key={i}>
                작성자:{el.author_name} 내용:{el.content}{' '}
              </p>
            );
          })
        ) : (
          <p>아직 댓글이 없습니다</p>
        )
      }

      <input
        // value 속성을 사용하여 입력 필드의 값을 comment 상태와 동기화
        value={comment}
        onChange={(e) => {
          setComment(e.target.value);
        }}
        className='commentInput bg-gray-200'
      />
      <button
        onClick={() => {
          // console.log(comment);
          if (session === null) {
            alert('로그인하세요');
            // TODO: 로그인 하라는 알림과 함께 로그인창으로 이동할지 결정하기
            setComment('');
          }
          if (comment === '') {
            alert('내용을 입력하세요');
          } else {
            axios
              .post('/api/comment/new', {
                comment: comment,
                _id: _id,
              })
              .then((r) => {
                // console.log(r.data,"확인"); // 서버로부터 받은 데이터
                setData(r.data); // 서버의 res에 들어있는 댓글 작성 클릭 시 전송된 댓글이 포함된 댓글 리스트를 업데이트 하기

                // 댓글 작성 창 초기화
                setComment('');
              })
              .catch((error) => {
                // 요청이 실패한 경우에 대한 처리
                console.error(error);
              });
          }
        }}
      >
        댓글 작성
      </button>
    </div>
  );
}
