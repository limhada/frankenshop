import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { connectDB } from '../../../util/database';

import { MongoDBAdapter } from '@next-auth/mongodb-adapter';

// TODO: jwt의 role 값 db에서 가져와서 넣어주기

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: `${process.env.NEXT_PUBLIC_CLIENT_GIT_ID}`,
      clientSecret: `${process.env.NEXT_PUBLIC_CLIENT_GIT_SECRET}`,
    }),

    // 다른 인증 제공자 설정...

    // id/pw로 로그인 시 입력 창
    CredentialsProvider({
      //1. 로그인페이지 폼 자동생성해주는 코드

      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
        // nickname: { label: "nickname" type: "nickname" },
      },

      //2. 로그인요청시 실행되는코드
      //직접 DB에서 아이디,비번 비교하고
      //아이디,비번 맞으면 return 결과, 틀리면 return null 해야함
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }
        let db = (await connectDB).db('frankenshop');
        let user = await db
          .collection('user_cred')
          .findOne({ email: credentials.email });
        if (!user) {
          console.log('해당 이메일은 없음');
          return null;
        }
        // console.log(user, 'user정보 확인');

        // bcrypt.compare(사용자가 입력한 비밀번호, 데이터베이스에 저장된 비밀번호의 해시);
        const pwcheck = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!pwcheck) {
          console.log('비번틀림');
          return null;
        }
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],

  // 세션방식 옵션
  session: {
    // FIXME: JS에서는 정상동작 TS에서 에러
    // strategy: `jwt`,

    // 로그인상태 유지기간
    maxAge: 24 * 60 * 60, // 1일
  },

  jwt: {
    secret: `${process.env.NEXT_PUBLIC_SECRET}`,
    encryption: true, // JWT(JSON Web Token)의 내용을 암호화하도록 설정하는 것
    maxAge: 1 * 60 * 60, // jwt expiration time (1 시간)
  },

  callbacks: {
    // FIXME: any타입 해결하기
    jwt: async ({ token, user }: any) => {
      if (user) {
        // JWT에 기입할 정보
        token.user = {};
        token.user.name = user.name;
        token.user.email = user.email;
        // 터미널에 표시되는 정보
        // 권한 같은것 들도 추가해서 전달할 수 있음

        // JWT토큰 사용 시 role:'user' 추가 하는 방법
        token.user.role = 'user';
        // 서버컴포넌트에서 - getServerSession()을 통해 jwt에 추가한 값을 확인할 수 있음

        // session 방식 사용할 경우 mongoDB에 role 추가하는 방법
        const db = (await connectDB).db('frankenshop');
        let data = await db.collection('users').updateOne(
          { email: user.email }, // 사용자 문서를 식별하는 필드를 사용하여 업데이트
          { $set: { role: 'user' } } // 업데이트할 필드와 값을 지정
          // FIXME: 몽고db users에 role이 추가되지 않는 부분 확인하기
          // $set은 몽고디비에서 사용되는 업데이트 연산자(Update Operator) 중 하나이며,
          // $set 연산자는 필드가 존재하지 않을 때에만 값을 설정하고, 이미 필드가 존재하면 아무런 작업을 수행하지 않습니다.
          // 즉 최초 1번만 role이 추가되고 여러번 수정되지 않음!
        );
      }
      return token;
    },
    session: async ({ session, token }: any) => {
      // session 조회 할 때 아래 코드 같이 설정할 경우 토근에 보낸 값을 전부 볼 수 있음
      if (token && token.user) {
        session.user = token.user;
      }
      return session;
    },
  },

  // pages: {
  //   //  src/app 폴더 밑에 signin 폴더를 만들고 그 밑에 page.tsx 파일 생성
  //   signIn: "/signin", // 내가 원하는 커스텀 sign-in 페이지의 url
  // },
  // secret : 'jwt생성시 사용됨 avasjkdhasjkdh2123asd 이런식으로 복잡하게 입력하기'
  secret: `${process.env.NEXT_PUBLIC_SECRET}`,

  // FIXME: 활설화 시 로그인 에러남
  // adapter: MongoDBAdapter(connectDB),
};
export default NextAuth(authOptions);
