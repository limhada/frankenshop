import styles from './write.module.css'
export default function Write() {
  return(
    <div className="p-20">
      <div className={styles.container}>dd</div>
      <h2 className={styles.title}>Write Page</h2>
      <h4>글작성</h4>
      <form action="/api/test" method="POST">
        <input name="title" placeholder="글 제목"/>
        <input name="content" placeholder="글 내용"/>
        <button type="submit">버튼</button>
      </form>
    </div>
  )
};
