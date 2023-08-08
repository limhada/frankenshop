import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'frankenshop',
  description: 'frankenshop',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${inter.className}`}>
        {/* navbar */}
        <div className='bg-mycolor1 p-5'>
          <Link href='/' className='mr-3 no-underline'>
            홈
          </Link>
          <Link href='/list' className='mr-3 no-underline'>
            리스트
          </Link>
          <Link href='/cart' className='mr-3 no-underline'>
            장바구니
          </Link>
        </div>
        {children}
      </body>
    </html>
  );
}
