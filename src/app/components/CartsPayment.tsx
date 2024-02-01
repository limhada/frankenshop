'use client';

import {
  usePathname,
  useSearchParams,
  useRouter,
} from 'next/navigation';

// window.IMP 사용하기 위함
declare const window: typeof globalThis & {
  IMP: any;
};

type UserData = {
  user: { name: string; email: string; role: string };
  ordersCartData: {
    name: string;
    email: string;
    orderPrice: number;
    createAt: string;
  };
};

const Payment = ({ user, ordersCartData }: UserData) => {
  const merchantId = process.env.NEXT_PUBLIC_MERCHANT_ID;
  // console.log('ordersCartData= ~~~~~~~~~~~~~~', ordersCartData);
  // console.log('ordersCartData= ~~~~~~~~~~~~~~', ordersCartData.createAt);

  const router = useRouter();

  const createAt = ordersCartData.createAt;

  // url의 쿼리스트링으로 _id값 가져오기
  const searchParams = useSearchParams();
  const _id = searchParams?.get('_id');
  // console.log('searchParams= ', _id);

  // 현재 페이지의 경로를 가져오기
  let pathname = usePathname();
  // console.log('usePathname= ', pathname);

  const match = pathname?.match(/\/order\/(.*)/);
  const orderSubpath = match ? match[1] : null;
  // console.log('orderSubpath= ', orderSubpath); // carts or detail

  const requestPay = () => {
    const { IMP } = window;
    // IMP.init('가맹점식별코드');
    IMP.init(merchantId);

    IMP.request_pay(
      {
        // pg: '{PG사코드}.{PG상점ID}',
        pg: 'kakaopay.TC0ONETIME', // PG사 코드표에서 선택 - https://developers.portone.io/docs/ko/tip/pg-2?v=v1
        // pg: 'html5_inicis.INIpayTest', // PG사 코드표에서 선택
        pay_method: 'card', // 결제수단
        merchant_uid:
          new Date().getTime() + Math.floor(Math.random() * 1000000), // 가맹점에서 생성하는 고유 주문번호
        name: '장바구니', // FIXME: 상품이름 장바구니이므로 현재는 장바구니로 통일 차후 장바구니에서 한번에 결제하는 상품 이름 배열에 넣어 추가하기
        amount: ordersCartData?.orderPrice, // 가격
        // buyer_ 어쩌고 구매자 정보
        buyer_name: user?.name,
        buyer_email: user?.email,
        custom_data: { _id, orderSubpath, createAt },
        // FIXME: 추후 추가하기 현재는 정상 동작을 목표로
        // buyer_tel: '010-1234-5678',
        // buyer_addr: '서울특별시',
        // buyer_postcode: '123-456',
      },
      async (res: any) => {
        // 결제 완료 후 추가 코드를 실행하는 두번째 함수
        try {
          const { imp_uid, success, error_msg } = res;
          // console.log(
          //   'imp_uid, res 확인~~~~~~~ ',
          //   imp_uid,
          //   success,
          //   error_msg,
          //   res
          // );
          // axios.get(`/api/test/t1?imp_uid=${imp_uid}`).then((r) => {
          //   console.log('결과 r= ', r);
          // });
          // verifyPayment(imp_uid)
          if (success) {
            alert('장바구니 상품 결제 완료!');
            // router.push('/');
            router.replace('/');

          } else if (!success) {
            alert('결제 실패!');
            // router.push('/');
            router.replace('/');
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
      {/* TODO: 카카오페이 결제, KG이니시스 결제 버튼 2개로 만들고 안내사항 추가하기 (KG이니시스는 실 결제가 이루어지고 밤에 환불됨) */}
      <button onClick={requestPay} className='w-[6rem] text-white h-[3rem] mr-[1rem] cursor-pointer overflow-visible p-2  border-5 border-gray-300 rounded-md bg-myColor1'>
        결제하기
      </button>
    </div>
  );
};

export default Payment;
