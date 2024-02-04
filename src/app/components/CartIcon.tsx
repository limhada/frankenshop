'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

import { cartsApi } from '../redux/apis/cartsApi';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

// TODO: 상세페이지 및 메인 페이지의 장바구니 아이콘 함께 사용할 수 있게 코드 수정하기

const CartIcon = ({_id, type}: any) => {
  const quantity = useSelector((state: RootState) => state.cart.quantity);
  // console.log(quantity);

  // console.log(type, 'type ㅎㅇ~~~~~~~~~~~~~');

  // const router = useRouter();
  // console.log(_id, 'CartCion/_id~~~~~~~~~~~~~~~~~~~~ ');


  // FIXME: rtkquery 사용 전 장바구니 추가 로직
  // const handleAddToCart = () => {
  //   // const _id = { _id: _id };
  //   axios
  //     .post('/api/carts/addToCart', { _id })
  //     .then((response) => {
  //       // console.log("장바구니 추가 확인", response.data);

  //       // FIXME: 중요 - 추후 리덕스 또는 다른 방법을 사용하여 해결
  //       // 장바구니에 물품을 추가하고, 장바구니로 이동 시 새로 고침 없이 수량이 업데이트되지 않는 문제를 해결하기 위함
  //       router.refresh();
  //     })
  //     .catch((error) => {
  //       // 요청이 실패한 경우에 대한 처리
  //       console.error(error);
  //     });
  // };

  const mutation = cartsApi.useAddToCartMutation();
  const addToCart = mutation[0];

  return (
    <div>
      <FontAwesomeIcon
        icon={faCartShopping}
        className='text-myColor1'
        onClick={() => {
          // 상세페이지의 장바구니 버튼일 경우 현재 선택된 수량을 함께 전달
          if (type === 'detail') {
            addToCart({_id, quantity})
          } else {
            addToCart({_id})
          }
          alert('장바구니에 추가되었습니다.')
        }}
      />
    </div>
  );
};

export default CartIcon;
