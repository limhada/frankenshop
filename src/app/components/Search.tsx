
import { connectDB } from '@/util/database';




const Search = async () => {

  const db = (await connectDB).db('frankenshop');
  let result = await db
    .collection('contentsNames')
    .findOne()
  // console.log('result~~~~~~~~~~~~`', result);
  // console.log('result~~~~~~~~~~~~`', result?.contentsNames);


  return (
    <div>
      {/* <SearchInput result={result?.contentsNames}></SearchInput> */}
    </div>
  );
};

export default Search;
