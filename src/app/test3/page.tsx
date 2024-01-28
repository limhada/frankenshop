'use client';

// window.IMP 사용하기 위함
declare const window: typeof globalThis & {
  IMP: any;
};

const Payment = () => {
  const requestPay = () => {
    const { IMP } = window;
    // IMP.init('가맹점식별코드');
    IMP.init(process.env.NEXT_PUBLIC_MERCHANT_ID);

    IMP.request_pay(
      {
        pg: 'kakaopay.TC0ONETIME', // PG사 코드표에서 선택
        // pg: '{PG사코드}.{PG상점ID}',
        pay_method: 'card',
        merchant_uid: new Date().getTime(),
        name: '테스트 상품',
        amount: 10,
        buyer_email: 'test@naver.com',
        buyer_name: '유저',
        buyer_tel: '010-1234-5678',
        buyer_addr: '서울특별시',
        buyer_postcode: '123-456',
      },
      async (rsp: any) => {
        try {
          // console.log('ㅎㅇ~~~~~~~', rsp);
          if (rsp.success) {
            alert('결제 완료!');
          } else {
            alert('결제 실패!');
          }
        } catch (error) {
          console.error('Error while verifying payment:', error);
          alert('결제 실패');
        }
      }
    );
  };

  return (
    <div>
      <button onClick={requestPay} className='bg-myColor1 text-white'>
        결제하기
      </button>
    </div>
  );
};

export default Payment;
