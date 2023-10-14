'use client';

import { ObjectId } from "mongodb";

export interface CartProps {
  cartData: {_id: ObjectId;
  title: string;
  description: string;
  img_src: string;
  author: string;
  price: string;
  like: boolean;}[]
}


export default function CartList({ cartData }: CartProps) {
  console.log(cartData);
  console.log(cartData[0]);
  // const t = JSON.parse(cartData)
  /**
   * 
   * cartData =  [{"_id":"6509b47802b7712df0cd3d53","title":"상품1","img_src":"https://github.com/limhada/frankenshop/blob/main/public/imgtest/1.jpeg?raw=true","author":"q","price":"10,000","like":true,"description":"상품1의 내용","cart":false},{"_id":"65254cdcbbca6b503b707627","title":"상품2","img_src":"https://github.com/limhada/frankenshop/blob/main/public/imgtest/1.jpeg?raw=true","author":"q","price":"12,000","like":true,"description":"상품2의 내용","cart":false},{"_id":"65254d63bbca6b503b70762a","title":"상품3","img_src":"https://github.com/limhada/frankenshop/blob/main/public/imgtest/1.jpeg?raw=true","author":"q","price":"13,000","like":false,"description":"상품3의 내용","cart":false}]
   */
  return (
    <div>
      데이터 확인용 {JSON.stringify(cartData)}
      
      {cartData.map((item, i) => (
        <div key={i}>
          <h3>{item.title}</h3>
          {/* <img src={item.img_src} alt="상품 이미지" /> */}
          <p>{item.price}</p>
        </div>
      ))} 


    </div>
  );
}
