// import { connectDB } from '../../util/database';
import Mainpage from './mainpage/page';

// import styles from './page.module.css'

export default async function Home() {
  // const client = await connectDB;
  // const db = client.db('frankenshop');
  // let result = await db.collection('post').find().toArray();
  // console.log(result);

  return (
    // <main className={styles.main}>
    <main>
      <Mainpage />
    </main>
  );
}
