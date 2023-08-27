import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: `${process.env.NEXT_PUBLIC_CLIENT_ID}`,
      clientSecret: `${process.env.NEXT_PUBLIC_CLIENT_SECRET}`,
    }),
  ],
  // pages: {
  //   //  src/app 폴더 밑에 signin 폴더를 만들고 그 밑에 page.tsx 파일 생성
  //   signIn: "/signin", // 내가 원하는 커스텀 sign-in 페이지의 url 
  // },
  // secret : 'jwt생성시 사용됨 avasjkdhasjkdh2123asd 이런식으로 복잡하게 입력하기'
  secret: `${process.env.NEXT_PUBLIC_SECRET}`,
};
export default NextAuth(authOptions);
