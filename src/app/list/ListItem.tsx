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
    author: string;
  }[];
  session: {
    user: {
      name: string;
      email: string;
      role: string;
    };
  };
    role: string;
}

export default function ListItem({ result, session, role }: ListItemProps) {
  // console.log(result, '확인~~');
  // console.log(session, '확인');
  // console.log(session.user.role === 'user');
  // console.log(session?.user.role === 'admin');
  // let router = useRouter();

  return (
    <div>
      {result.map((el, i) => (
        <div
          className='shadow-md bg-white rounded-md p-5 mb-3 opacity-100 transition-all duration-1000'
          key={i}
        >
          <Link href={'/detail2/' + result[i]._id.toString()}>
            <h4 className='text-2xl font-bold m-0'>{el.title}</h4>
            <p className='text-gray-500 my-1 mx-0'>{el.content}</p>
          </Link>

          {
            // FIXME: 작성자와 로그인된 유저의 정보가 일치하면 수정 버튼 렌더링

            
            el.author === session?.user.email || role === 'admin' ? (
              <Link
                href={'/edit/' + result[i]._id.toString()}
                // onClick={(e) => {
                //   if (el.author !== session.user.email) {
                //     e.preventDefault();
                //     alert('수정 권한이 없습니다.');
                //   }
                // }}
              >
                수정
              </Link>
            ) : null
          }

          {
            // FIXME: 작성자와 로그인된 유저의 정보가 일치하면 수정 버튼 렌더링
            el.author === session?.user.email || role === 'admin' ? (
              <span
                onClick={(e: MouseEvent) => {
                  const target = (e.target as HTMLElement).parentElement;
                  axios({
                    url: '/api/post/delete',
                    method: 'DELETE',
                    data: result[i]._id.toString(),
                  })
                    .then((r) => {
                      // console.log(r.status);
                      if (r.status === 200 && target) {
                        // console.log("확인");
                        target.style.opacity = '0';
                        setTimeout(() => {
                          target.style.display = 'none';
                        }, 1000);
                      }
                    })
                    .catch((error) => {
                      console.log(error);
                      // console.log(error.request.status);
                      // console.log(error.request.response);
                      if (error.request.status) {
                        // FIXME: request가 아닌 response를 사용해야 되나???
                        // alert("권한이 없습니다.")
                        alert(JSON.parse(error.request.response));
                      }
                    });
                }}
              >
                삭제
              </span>
            ) : null
          }
        </div>
      ))}
    </div>
  );
}
