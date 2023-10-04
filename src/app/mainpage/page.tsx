import Content from './Content';
import ImageComponent from './ImageComponent';

// import Test from './Test';

export default function Mainpage() {
  // const imgtest = [
  //   '/imgtest/1.jpeg',
  //   '/imgtest/2.jpeg',
  //   '/imgtest/3.jpeg',
  //   '/imgtest/4.jpeg',
  //   '/imgtest/5.jpeg',
  // ];

  return (
    <div>
      <h1>메인페이지</h1>

      {/* <Test data={imgtest} /> */}
      <ImageComponent />
      <Content />
    </div>
  );
}
