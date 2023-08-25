import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: `${process.env.NEXT_PUBLIC_CLIENT_ID}`,
      clientSecret: `${process.env.NEXT_PUBLIC_CLIENT_SECRET}`,
    }),
  ],
  // secret : 'jwt생성시 사용됨 avasjkdhasjkdh2123asd 이런식으로 복잡하게 입력하기'
  secret: `${process.env.NEXT_PUBLIC_SECRET}`,
};
export default NextAuth(authOptions);
