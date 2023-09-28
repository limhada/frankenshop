export default function Content() {
  // 이미지와 정보가 들어있는 배열 객체
  const contentData = [
    {
      imageUrl: '/imgtest/1.jpeg',
      title: 'Title 1',
      description: 'Description 1',
    },
    {
      imageUrl: '/imgtest/2.jpeg',
      title: 'Title 2',
      description: 'Description 2',
    },
    {
      imageUrl: '/imgtest/3.jpeg',
      title: 'Title 3',
      description: 'Description 3',
    },
    {
      imageUrl: '/imgtest/4.jpeg',
      title: 'Title 4',
      description: 'Description 4',
    },
    {
      imageUrl: '/imgtest/5.jpeg',
      title: 'Title 5',
      description: 'Description 5',
    },
    {
      imageUrl: '/imgtest/1.jpeg',
      title: 'Title 6',
      description: 'Description 6',
    },
    {
      imageUrl: '/imgtest/2.jpeg',
      title: 'Title 7',
      description: 'Description 7',
    },
    {
      imageUrl: '/imgtest/3.jpeg',
      title: 'Title 8',
      description: 'Description 8',
    },
    {
      imageUrl: '/imgtest/4.jpeg',
      title: 'Title 9',
      description: 'Description 9',
    },
    {
      imageUrl: '/imgtest/5.jpeg',
      title: 'Title 10',
      description: 'Description 10',
    },
    // {
    //   imageUrl: '/imgtest/1.jpeg',
    //   title: 'Title 11',
    //   description: 'Description 11',
    // },
    // {
    //   imageUrl: '/imgtest/2.jpeg',
    //   title: 'Title 12',
    //   description: 'Description 12',
    // },
  ];

  return (
    <div>
      <h1>상품리스트</h1>
      {/* <img src='/imgtest/1.jpeg' /> */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        {contentData.map((item, i) => (
          <div key={i} className='max-w-sm rounded overflow-hidden shadow-lg'>
            <img src={item.imageUrl} alt={item.title} className='w-full' />
            <div className='px-6 py-4'>
              <div className='font-bold text-xl mb-2'>{item.title}</div>
              <p className='text-gray-700 text-base'>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}