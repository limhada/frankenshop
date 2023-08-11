'use client';

// useRouter 사용 예시
// FIXME: useRouter 실습 페이지 // 지울 페이지

import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
export default function DetailLink() {
  let path = usePathname();
  let Sparams = useSearchParams();
  let Uparams = useParams();

  // console.log(path, "패스"); // 현재 경로 ex) /list
  // console.log(Sparams, "파라미터");
  // console.log(Uparams); // 유저가 [다이나믹 라우트] 입력한거 출력

  let router = useRouter();
  return (
    <button
      onClick={() => {
        router.push('/');
      }}
    >
      홈 버튼
    </button>
  );
}

