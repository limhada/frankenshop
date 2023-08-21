'use client'

import { ObjectId } from "mongodb";
import Link from "next/link"


interface ListItemProps {
  result: {
    _id: ObjectId;
    title: string;
    content: string;
  }[];
}

export default function ListItem({result}: ListItemProps) {
// console.log(result, "확인중")

  return(
    <div>
      {result.map((el, i) => (
          <div className='shadow-md bg-white rounded-md p-5 mb-3' key={i}>
            <Link href={'/detail/' + result[i]._id.toString()}>
              <h4 className='text-2xl font-bold m-0'>{el.title}</h4>
              <p className='text-gray-500 my-1 mx-0'>{el.content}</p>
            </Link>
            <Link href={'/edit/' + result[i]._id.toString()}>수정</Link>
          </div>
        ))}
    </div>
  )
}