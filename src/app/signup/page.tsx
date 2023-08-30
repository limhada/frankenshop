'use client';

import axios from 'axios';
import { ChangeEvent, FormEvent, useState } from 'react';

export default function SignUp() {
  const role:string = 'user';

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
    role: role,
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post('/api/auth/signup', formState);
      console.log(response.status, '확인~~~~~~~~~~~');
      if (response.status === 200) {
        alert('회원가입 성공');
        // 이후 필요한 로직 추가
      }
      // if (response.status === 400) {
      //   alert(response.data);
      // }
    } catch (error: any) {
      // FIXME: 왜 이부분만 any를 해줘야 하는지 모르겠다
      console.log('에러!', error);
      // console.log('에러!', error.response);
      alert(error.response.data);
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
        <input
          name='password'
          type='password'
          placeholder='비밀번호'
          onChange={handleInputChange}
        />
        <input
          name='role'
          style={{ display: 'none' }}
          defaultValue={role}
          readOnly
        />
        <button type='submit'>id/pw 가입요청</button>
      </form>
    </div>
  );
}
