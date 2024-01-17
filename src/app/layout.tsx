// 'use client'
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import LoginBtn from './LoginBtn';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../pages/api/auth/[...nextauth]';
import LogoutBtn from './LogoutBtn';

import Category from './category';
import ScrollToTop from './ScrollToTop';

const inter = Inter({ subsets: ['latin'] });

import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import { Providers } from './redux/provider';
import Search from './components/Search';

// autoAddCss 속성을 false로 설정하면 Font Awesome 의 CSS 파일을 자동으로 추가하지 않습니다.
config.autoAddCss = false;

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
  console.log('RootLayout - getServerSession로그인 유저 정보 확인', session);

  return (
    <html lang='en'>
      <body className={`${inter.className}`}>
        <Providers>
          {/* navbar */}
          <div className='text-white bg-myColor1 p-5 fixed top-0 left-0 right-0 z-50 h-[200px] shadow-lg'>
            {/* FIXME: h값 조정하기 */}
            <div className='flex'>
              <Category/>
              <Link href='/' className='mr-3 no-underline'>
                frankenshop
              </Link>
              <Link href='/write' className='mr-3 no-underline'>
                상품추가
              </Link>
              <Link href='/write' className='mr-3 no-underline'>
                글쓰기
              </Link>
              <Link href='/list' className='mr-3 no-underline'>
                상품 리스트
              </Link>
              <Link href='/mypage' className='mr-3 no-underline'>
                마이페이지
              </Link>
              <Link href='/carts' className='mr-3 no-underline'>
                장바구니
              </Link>
            </div>
            {/* 로그인 & 로그아웃 버튼 */}
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
            <div className='flex'>
            <Search></Search>
            </div>
          </div>
          {/* TODO: 상단바 위치 고정으로 인한 mt값 조정하기 */}
          <div className='mt-[250px] pl-[2.75rem] pr-[2.75rem]'>{children}</div>
          <ScrollToTop />
          <div className='bg-gray-300 p-4 h-[200px] mt-9'>
            <div>
              ABOUT
              <div>leem1315@gmail.com</div>
              <div>
                꾸준함을 실천하고 몰입을 즐기며 웹 프론트엔드 개발자로 성장을
                추구하는 임종정입니다.
              </div>
            </div>
          </div>
        </Providers>

        {/* 카카오 주소 api */}
        <script
          src='//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'
          async
        ></script>
      </body>
    </html>
  );
}
