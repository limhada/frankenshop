'use client'

import {signOut} from 'next-auth/react'

export default function LogoutBtn() {
  return(
    // callbackUrl을 통해 로그아웃 시 리다이렉트할 url을 인자로 받을 수 있다
    <button onClick={()=>{ signOut({ callbackUrl: '/' }) }}>로그아웃</button>
  )
}