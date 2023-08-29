'use client';

// FIXME: 주석 다시 공부하고 정리 후 삭제하기

import axios from 'axios';
import { ObjectId } from 'mongodb';
import Link from 'next/link';
import { MouseEvent } from 'react';

interface ListItemProps {
  result: {
    _id: ObjectId;
    title: string;
    content: string;
  }[];
}

export default function ListItem({ result }: ListItemProps) {
  // console.log(result, "확인")

  return (
    <div>
      {result.map((el, i) => (
        <div
          className='shadow-md bg-white rounded-md p-5 mb-3 opacity-100 transition-all duration-1000'
          key={i}
        >
          <Link href={'/detail/' + result[i]._id.toString()}>
            <h4 className='text-2xl font-bold m-0'>{el.title}</h4>
            <p className='text-gray-500 my-1 mx-0'>{el.content}</p>
          </Link>
          <Link href={'/edit/' + result[i]._id.toString()}>수정</Link>
          <span
            onClick={(e: MouseEvent) => {
              const target = (e.target as HTMLElement).parentElement;
              axios({
                url: '/api/post/delete',
                method: 'DELETE',
                data: result[i]._id.toString(),
              })
                .then((r) => {
                  if (r.status === 200 && target) {
                      target.style.opacity = '0';
                      setTimeout(()=>{
                        target.style.display = 'none';
                      }, 1000)
                  }
                  // if (r.status === 500) {
                  //   alert("권한이 없습니다.")
                  // }
                  else {
                    console.log('Error:', r.status);
                    alert("작성자만 삭제할 수 있습니다.")
                  }
                  // FIXME: 알럴트창 나오게 에러 수정하기....
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
