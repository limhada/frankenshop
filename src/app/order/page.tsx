import { getServerSession } from 'next-auth';
import { authOptions } from '../../../pages/api/auth/[...nextauth]';

export default async function Oder() {
  let session = await getServerSession(authOptions);
  // console.log(session);
  return (
    <div>
      <h1>결제 페이지</h1>
    </div>
  );
}
