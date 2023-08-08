'use client'
// 무조건 클라이언트 컴포넌트만 가능
export default function Error({ error, reset }: { error: { message: string }; reset: () => void }) {
  return(
    <div>
      <h4>에러남~</h4>
    <button onClick={ ()=>reset() }>리셋버튼</button>
    </div>
  )
}