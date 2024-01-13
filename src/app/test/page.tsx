// 'use client';

import CryptoJS from 'crypto-js';

const key = `${process.env.AES_KEY}`;
const myData = 'Hello, world!';
console.log('초기값=', myData);

// AES알고리즘 사용 암호화
const encrypted = CryptoJS.AES.encrypt(JSON.stringify(myData), key).toString();
console.log('암호화 된 값=', encrypted);

// AES알고리즘 사용 복호화 ( 복구 키 필요 )
const bytes = CryptoJS.AES.decrypt(encrypted, key);
console.log('복호화 된 값=', bytes);

// 인코딩, 문자열로 변환, JSON 변환
// const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
const decrypted = bytes.toString(CryptoJS.enc.Utf8);
console.log('인코딩, 문자열로 변환, JSON 변환 된 값=', decrypted);

export default function Test() {

  return <div>테스트</div>;
}
