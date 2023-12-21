import Address from '../components/Address';

const Test = () => {
  return (
    <div>
      <ul>
        <li className='mb-[1.25rem]'>
          <div className='inline-block font-bold mb-[0.4rem]'>배송지명</div>
          <input
            type='text'
            id='detailAddress'
            placeholder='예) 집'
            className='w-full overflow-visible p-4 border border-gray-200 rounded-md bg-white text-base font-normal text-gray-900'
          />
        </li>
      </ul>

      <Address></Address>
    </div>
  );
};

export default Test;
