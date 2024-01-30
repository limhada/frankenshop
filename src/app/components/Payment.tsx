'use client';

import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { paymentApi } from '../redux/apis/paymentApi';

// window.IMP 사용하기 위함
declare const window: typeof globalThis & {
  IMP: any;
};

type UserData = {
  name: string;
  email: string;
  role: string;
};

const Payment = ({ user }: { user: UserData }) => {
  // console.log(user.email, 'user~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');

  // store에서 구매정보 가져오기
  const itemId = useSelector((state: RootState) => state.order.itemId);
  const _id = useSelector((state: RootState) => state.order._id);
  const totalPrice = useSelector((state: RootState) => state.order.totalPrice);
  // console.log(totalPrice, 'ㅎㅇ');

  console.log("_id= ", _id, "itemId= ", itemId, 'totalPrice= ', totalPrice, '_id_id_id_id_id_id_id_id_id_id_id_id_id_id');
  /// store에서 가져온 정보로 비동기로 구매아이템 정보 가져오기
  const payItem = paymentApi.useGetOrderQuery({ _id, itemId, totalPrice });

  console.log(payItem, '111ㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇ');
  // console.log(payItem?.data?.title, '2222ㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎ');

  const requestPay = () => {
    const { IMP } = window;
    // IMP.init('가맹점식별코드');
    IMP.init(process.env.NEXT_PUBLIC_MERCHANT_ID);

    IMP.request_pay(
      {
        // pg: '{PG사코드}.{PG상점ID}',
        pg: 'kakaopay.TC0ONETIME', // PG사 코드표에서 선택 - https://developers.portone.io/docs/ko/tip/pg-2?v=v1
        // pg: 'html5_inicis.INIpayTest', // PG사 코드표에서 선택
        pay_method: 'card', // 결제수단
        merchant_uid:
          new Date().getTime() + Math.floor(Math.random() * 1000000), // 가맹점에서 생성하는 고유 주문번호
        name: payItem?.data?.title,
        amount: totalPrice, // 가격
        // buyer_ 어쩌고 구매자 정보
        buyer_email: user?.email,
        buyer_name: user?.name,
        custom_data: {_id, itemId},
        // FIXME: 추후 추가하기 현재는 정상 동작을 목표로
        // buyer_tel: '010-1234-5678',
        // buyer_addr: '서울특별시',
        // buyer_postcode: '123-456',
      },
      async (res: any) => {
        // 결제 완료 후 추가 코드를 실행하는 두번째 함수
        try {
          const { imp_uid, success, error_msg } = res;
          console.log(
            'imp_uid, res 확인~~~~~~~ ',
            imp_uid,
            success,
            error_msg,
            res
          );

          // axios.get(`/api/test/t1?imp_uid=${imp_uid}`).then((r) => {
          //   console.log('결과 r= ', r);
          // });

          // verifyPayment(imp_uid)
          alert('결제 완료!');
        } catch (error) {
          console.error('Error while verifying payment:', error);
          alert('결제 실패');
        }
      }
    );
  };

  return (
    <div>
      {/* TODO: 카카오페이 결제, KG이니시스 결제 버튼 2개로 만들고 안내사항 추가하기 (KG이니시스는 실 결제가 이루어지고 밤에 환불됨) */}
      <button onClick={requestPay} className='bg-myColor1 text-white'>
        결제하기
      </button>
    </div>
  );
};

export default Payment;
