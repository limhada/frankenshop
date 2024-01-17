import { connectDB } from '@/util/database';

import SearchInput from './SearchInput';

const Search = async () => {
  const db = (await connectDB).db('frankenshop');
  let result = await db.collection('contentsNames').findOne();
  // console.log('result~~~~~~~~~~~~`', result);
  // console.log('result~~~~~~~~~~~~`', result?.contentsNames);

  // 테스트용 데이터
  // const result1 = [
  //   '상품1', '상품2', '상품3', '상품4', '상품5',
  //   '상품6', '상품7', '상품8', '상품9', '상품10',
  //   '상품11', '상품12', '상품13', '상품14', '상품15',
  //   '상품16', '상품17', '상품18', '상품19', '상품20',
  //   '상품21', '상품22', '상품23', '상품24', '상품25',
  //   '상품26', '상품27', '상품28', '상품29', '상품30',
  //   '상품31', '상품32', '상품33', '상품34', '상품35',
  //   '상품36', '상품37', '상품38', '상품39', '상품40',
  //   '상품41', '상품42', '상품43', '상품44', '상품45',
  //   '상품46', '상품47', '상품48', '상품49', '상품50',
  //   '상품51', '상품52', '상품53', '상품54', '상품55',
  //   '파인애플',
  //   '딸기',
  //   '딸기와 사과와 딸기',
  //   '코코아',
  //   'abbbc',
  //   '샤인머스켓',
  //   '초코송이',
  //   '고구마',
  //   '1.2',
  //   '1..2',
  //   '1.2.3',
  //   'abbbbc',
  //   'bbbbbaac',
  //   '!1.23,',

  // ]

  return (
    <div>
      <SearchInput nameList={result?.contentsNames}></SearchInput>
      {/* <SearchInput nameList={result1}></SearchInput> */}
    </div>
  );
};

export default Search;
