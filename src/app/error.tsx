'use client';
// TODO: 에러페이지 수정하기
// 무조건 클라이언트 컴포넌트만 가능
export default function Error({
  error, // 에러 정보가 들어있음
  reset, // 페이지 다시로드 할 수 있음
}: {
  error: { message: string };
  reset: () => void;
}) {
  return (
    <div>
      <h4>에러남~</h4>
      <button onClick={() => reset()}>리셋버튼</button>
    </div>
  );
}
