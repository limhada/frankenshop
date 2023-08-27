
export default function SignUp() {
  return (
    <div>
        <form method="POST" action="/api/auth/signup" className="flex flex-col">
          <input name="name" type="text" placeholder="이름" /> 
          <input name="email" type="text" placeholder="이메일" />
          <input name="password" type="password" placeholder="비번" />
          <input name="role" style={{display : 'none'}} defaultValue='user'/>
          <button type="submit">id/pw 가입요청</button>
        </form>
    </div>
  )
}