'use client'

import {signIn} from 'next-auth/react'

export default function LoginBtn() {
  // let a = true
  return(
    <div>
      {/* {a ? signIn() : "로그인되어있음"} */}
      <button onClick={()=> {signIn()} }>로그인</button>
    </div>
    
  )
}