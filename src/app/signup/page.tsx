export default function Write() {
  return (
    <div>
      <div className='w-[50%] bg-mycolor1'>
        <h4>회원가입</h4>
        <form action='/api/signUp' method='POST'>
          <input name='id' placeholder='아이디' />
          <input name='pw' placeholder='패스워드' />
          <button type='submit'>가입하기</button>
        </form>
      </div>
    </div>
  );
}
