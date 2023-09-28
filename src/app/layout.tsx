import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import LoginBtn from './LoginBtn';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../pages/api/auth/[...nextauth]';
import LogoutBtn from './LogoutBtn';
import SearchBar from './SearchBar';
import Category from './Category';
import ScrollToTop from './ScrollToTop';

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
  console.log('getServerSession로그인 유저 정보 확인', session);

  return (
    <html lang='en'>
      <body className={`${inter.className}`}>
        {/* navbar */}
        <div className='bg-mycolor1 p-5 fixed top-0 left-0 right-0 z-50'>
          <Link href='/' className='mr-3 no-underline'>
            frankenshop
          </Link>
          <Link href='/write' className='mr-3 no-underline'>
            글 쓰기
          </Link>
          <Link href='/list' className='mr-3 no-underline'>
            상품 리스트
          </Link>
          <Link href='/mypage' className='mr-3 no-underline'>
            마이페이지
          </Link>
          <Link href='/cart' className='mr-3 no-underline'>
            장바구니
          </Link>
          {session ? (
            <div>
              {session.user?.name}
              <LogoutBtn />
            </div>
          ) : (
            <div className='mr-3 no-underline'>
              <LoginBtn></LoginBtn>
            </div>
          )}
          {session ? null : (
            <Link href='/signup' className='mr-3 no-underline'>
              회원가입
            </Link>
          )}
          <Category />
          <SearchBar />
        </div>
        {/* TODO: 상단바 위치 고정으로 인한 mt값 조정하기 */}
        <div className='mt-[200px]'>{children}</div>
        <ScrollToTop/>
        <div className='bg-gray-300 p-4 h-[200px] mt-9'>
          하단 문의전화번호 or 회사 명 등등 각종 정보
        </div>
      </body>
    </html>
  );
}
