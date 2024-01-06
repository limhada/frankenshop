'use client';

// TODO: 블로그에 정리하기 쿼리 파라미터 값 가져오는 방법
import {usePathname, useSearchParams, useParams} from 'next/navigation'


export default function Test2() {
  let a = usePathname()
  let c = useParams()
  console.log(a)
  console.log(c)
  const searchParams = useSearchParams();
  const quantity = searchParams?.get("quantity");
  const quantity2 = searchParams?.getAll("quantity")
  console.log(quantity);
  console.log(quantity2);
  return (
    <div>
      <div>

        </div>
    </div>
  );
}
