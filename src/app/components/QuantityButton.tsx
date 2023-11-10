'use client';

import { useState } from 'react';

export default function QuantityButton() {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (num: number) => {
    // 수량 1미만으로 감소하지 않게
    if (num === 1 || (num === -1 && quantity > 1)) {
      setQuantity(quantity + num);
    }
  };

  return (
    <div>
      <button onClick={() => handleQuantityChange(1)}>+</button>
      <div>수량: {quantity}</div>
      <button onClick={() => handleQuantityChange(-1)}>-</button>
    </div>
  );
}
