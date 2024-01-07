'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';

export default function SignUp() {
  const role: string = 'user';

  const router = useRouter();

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
    passwordCheck: '',
    role: role,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // TODO: pw입력 후 가입요청 시 가 아닌 실시간으로 pw가 일치하는지 확인하는 로직 추가하기

    if (formState.password !== formState.passwordCheck) {
      alert('비밀번호가 일치하지 않습니다.');
    } else {
      try {
        const response = await axios.post('/api/auth/signup', formState);
        // console.log(response.status, '확인~~~~~~~~~~~');
        if (response.status === 200) {
          alert('회원가입 성공');
          router.push('/');
        }
      } catch (error: any) {
        // FIXME: 왜 이부분만 any를 해줘야 하는지 모르겠다
        console.log('에러!', error);
        alert(error.response.data);
      }
    }
  };

  return (
    <div>
      {/* <form method="POST" action="/api/auth/signup" className="flex flex-col"> */}
      <form onSubmit={handleSubmit} className='flex flex-col'>
        <input
          name='name'
          type='text'
          placeholder='이름'
          onChange={handleInputChange}
        />
        <input
          name='email'
          type='text'
          placeholder='이메일'
          onChange={handleInputChange}
        />
        {/* TODO: 추가-비밀번호 보이게 안보이게 버튼 만들기 */}
        <input
          name='password'
          type='password'
          placeholder='비밀번호'
          onChange={handleInputChange}
        />
        <input
          name='passwordCheck'
          type='password'
          placeholder='비밀번호 확인'
          onChange={handleInputChange}
        />
        <input
          name='role'
          style={{ display: 'none' }}
          defaultValue={role}
          readOnly
        />
        <button type='submit'>회원가입</button>
      </form>
    </div>
  );
}
