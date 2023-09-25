import ImageComponent from '../mypage/ImageComponent';
import Banner from './Banner';

export default function Mainpage() {
  return (
    <div>
      <h1>메인페이지</h1>
      <Banner />
      <ImageComponent />

      <div>메인페이지 내용</div>
    </div>
  );
}
