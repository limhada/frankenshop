'use client'

import { useRouter } from "next/navigation";

// // 테스트용 페이지
// import axios from 'axios';

export default function Test() {

  const router = useRouter()

  return (
    <div>
      테스트
      <button onClick={()=> {
      }}>홈 버튼</button>
    </div>
  );
}
