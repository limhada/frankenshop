import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import LoginBtn from './LoginBtn';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../pages/api/auth/[...nextauth]';
import LogoutBtn from './LogoutBtn';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'frankenshop',
  description: 'frankenshop',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  // 현재 auth로 로그인한 유저의 정보가 나타남(이름, 이메일, 프로필사진)
  let session = await getServerSession(authOptions);
  console.log("로그인 유저 정보 확인", session);


  return (
    <html lang='en'>
      <body className={`${inter.className}`}>
        {/* navbar */}
        <div className='bg-mycolor1 p-5'>
          <Link href='/' className='mr-3 no-underline'>
            홈
          </Link>
          <Link href='/write' className='mr-3 no-underline'>
            글 쓰기
          </Link>
          <Link href='/list' className='mr-3 no-underline'>
            상품 리스트
          </Link>
          <Link href='/cart' className='mr-3 no-underline'>
            장바구니
          </Link>
          { session ?
              <div>{session.user?.name}<LogoutBtn/></div> :
              <LoginBtn></LoginBtn>
          }
        </div>
        {children}
      </body>
    </html>
  );
}
