import { getServerSession } from 'next-auth';
import Image from 'next/image';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export default async function OderItems() {

  let session = await getServerSession(authOptions);



  try{

  }catch (error) {
    console.log('에러!', error);
  }



  return (
    <div>
      {/* {cartList.map((el: any, i: number) => ( */}
      {/* <div key={`${payItem.data._id}`} className='flex' id={`carList-${payItem.data._id}`}> */}

       {/* {payItem.isSuccess ? (
        <div className='w-[90%] shadow-md bg-white rounded-md p-5 mb-[5rem] opacity-100 transition-all duration-1000'>
          <table className='w-full border-collapse border border-gray-300'>
              <thead></thead>
            <tbody>
              <tr>
                <th className='border p-4 w-1/5' rowSpan={2}>
                  <div className='flex items-center justify-center'>
                    <Image
                      src={payItem.data.img_src}
                      width={100}
                      height={100}
                      alt='상품 이미지'
                    />
                  </div>
                </th>
                <th className='p-4 text-center w-2/5 border-b'>상품명</th>
                <th className='p-4 text-center w-1/5 border-b'>수량</th>
                <th className='p-4 text-center w-1/5 border-b'>가격</th>
              </tr>

              <tr>
                <td className='p-4 text-center'>{payItem.data.title}</td>
                <td className='p-4 text-center'>
                  {payItem.data.totalQuantity}
                </td>
                <td className='p-4 text-center'>
                  {payItem.data.totalPrice.toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : null} */}
    </div>
  );
}
