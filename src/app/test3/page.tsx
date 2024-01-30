// 'use client';

// // window.IMP 사용하기 위함
// declare const window: typeof globalThis & {
//   IMP: any;
// };

// const Payment = () => {
//   const requestPay = () => {
//     const { IMP } = window;
//     // IMP.init('가맹점식별코드');
//     IMP.init(process.env.NEXT_PUBLIC_MERCHANT_ID);

//     IMP.request_pay(
//       {
//         pg: 'kakaopay.TC0ONETIME', // PG사 코드표에서 선택
//         // pg: '{PG사코드}.{PG상점ID}',
//         pay_method: 'card', // 결제수단
//         merchant_uid:
//           new Date().getTime() + Math.floor(Math.random() * 1000000), // 가맹점에서 생성하는 고유 주문번호
//         name: '테스트 상품',
//         amount: 10, // 가격
//         // buyer_ 어쩌고 구매자 정보
//         buyer_email: 'test@naver.com',
//         buyer_name: '구매자 이름',
//         buyer_tel: '010-1234-5678',
//         buyer_addr: '서울특별시',
//         buyer_postcode: '123-456',
//       }, // 결제 완료 후 추가 코드를 실행하는 두번째 함수
//       async (res: any) => {
//         try {
//           const { imp_uid, success, error_msg } = res;
//           console.log(
//             'imp_uid, res 확인~~~~~~~ ',
//             imp_uid,
//             success,
//             error_msg,
//             res
//           );

//           alert('결제 완료!');
//         } catch (error) {
//           console.error('Error while verifying payment:', error);
//           alert('결제 실패');
//         }
//       }
//     );
//   };

//   return (
//     <div>
//       <button onClick={requestPay} className='bg-myColor1 text-white'>
//         결제하기
//       </button>
//       <button
//         onClick={() => {
//           axios.get(`/api/test/t1?imp_uid=test22`).then((r) => {
//             console.log('결과 r= ', r);
//           });
//         }}
//       >
//         테스트
//       </button>
//     </div>
//   );
// };

// export default Payment;
