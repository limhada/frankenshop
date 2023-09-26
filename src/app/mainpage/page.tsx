import ImageComponent from './ImageComponent';
import Banner from './Banner';
import Test from './test';

export default function Mainpage() {
  const imgtest = [
    '/imgtest/1.jpeg',
    '/imgtest/2.jpeg',
    '/imgtest/3.jpeg',
    '/imgtest/4.jpeg',
    '/imgtest/5.jpeg',
  ];

  return (
    <div>
      <h1>메인페이지</h1>
      <Banner />
      <ImageComponent />

      <div>메인페이지 내용</div>
<Test data={imgtest} />
    </div>
  );
}
