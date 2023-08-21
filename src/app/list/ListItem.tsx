'use client';

import axios from 'axios';
import { ObjectId } from 'mongodb';
import Link from 'next/link';

interface ListItemProps {
  result: {
    _id: ObjectId;
    title: string;
    content: string;
  }[];
}

export default function ListItem({ result }: ListItemProps) {
  // console.log(result, "확인중")

  return (
    <div>
      {result.map((el, i) => (
        <div className='shadow-md bg-white rounded-md p-5 mb-3' key={i}>
          <Link href={'/detail/' + result[i]._id.toString()}>
            <h4 className='text-2xl font-bold m-0'>{el.title}</h4>
            <p className='text-gray-500 my-1 mx-0'>{el.content}</p>
          </Link>
          <Link href={'/edit/' + result[i]._id.toString()}>수정</Link>
          <span
            onClick={() => {
              // fetch('/api/post/delete', {
              //   method: 'DELETE',
              //   body: result[i]._id.toString(),
              // })
              //   .then((r) => {
              //     if (r.status == 200) {
              //       return r.json();
              //     } else {
              //       // 서버가 에러코드 전송시 실행할 코드
              //       // ex)
              //       // if(r.status == 500) {
              //       //   서버통신 실패코드 500일때 실행할 코드 작성
              //       // }
              //     }
              //   })
              //   .then((r) => {
              //     // ajax가 성공 시 실행할 코드
              //     // console.log(r); // 서버가 보낸 json 확인
              //   })
              //   .catch((error) => {
              //     console.log(error);
              //   });


              // 기존 fetch를 axios로 변경
              axios({
                url: '/api/post/delete',
                method: 'DELETE',
                data: result[i]._id.toString(),
              })
                .then((response) => {
                  if (response.status === 200) {
                    // ajax가 성공 시 실행할 코드
                    console.log(response.data, "ListItem 서버 데이터 확인"); // 서버가 보낸 json 확인
                  } else {
                    // 서버가 에러코드 전송시 실행할 코드
                    // ex) 서버통신 실패코드 500일때 실행할 코드 작성
                    if (response.status === 500) {
                      console.log("서버통신 실패코드 500에 대한 처리를 하세요.");
                    }
                  }
                })
                .catch((error) => {
                  console.log(error);
                });

            }}
          >
            삭제
          </span>
        </div>
      ))}
    </div>
  );
}
