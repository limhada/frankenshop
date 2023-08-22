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
  // console.log(result, "확인중")

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
              // const target = e.target as HTMLElement;
              const target = (e.target as HTMLElement).parentElement;
              axios({
                url: '/api/post/delete',
                method: 'DELETE',
                data: result[i]._id.toString(),
              })
                .then((response) => {
                  // console.log('확인~~~~~~~~~~1');
                  if (response.status === 200 && target) {
                    // if (target) {
                      target.style.opacity = '0';
                      // console.log('확인~~~~~~~~~~2');
                      setTimeout(()=>{
                        target.style.display = 'none';
                      }, 1000)
                    // }
                    // console.log('확인~~~~~~~~~~3');
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

// opacity가 0으로 바뀌지 않음 클릭시 삭제는 정상적으로 서버로 동작함
