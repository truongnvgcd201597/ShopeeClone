import { Link } from 'react-router-dom'

export default function ProductItem() {
  return (
    <Link to='/'>
      <div className='overflow-hidden rounded-sm bg-white shadow transition-transform duration-100 hover:translate-y-[-0.04rem] hover:shadow-md p-1'>
        <div className='relative w-full pt-[100%]'>
          <img
            src='https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lmh7pjoikwdba2'
            alt=''
            className='absolute top-0 bg-white w-full object-cover'
          />
          <div className='overflow-hidden p-2'>
            <div className='min-h-[2rem] text-xs line-clamp-2'>
              Tai nghe Không dây Amoi F9 / F9 pro - Bluetooth 5.3 - Pin 280 giờ - Chống nước IPX7
            </div>
            <div className='mt-3 flex items-center'>
              <div className='max-w-[50%] truncate text-gray-500 line-through'>
                <span className='text-xs'>₫</span>
                <span className='text-sm'>5.000</span>
              </div>
              <div className='ml-1 truncate text-orange-500'>
                <span className='text-xs'>₫</span>
                <span className='text-sm'>2.000</span>
              </div>
            </div>
          </div>
          <div className='mt-3 flex items-center justify-end'>
            <div className='flex items-center'>
              <div className='relative'>
                <div className='absolute top-0 left-0 h-full' style={{ width: '50%' }}>
                  <svg
                    enableBackground='new 0 0 15 15'
                    viewBox='0 0 15 15'
                    x={0}
                    y={0}
                    className='w-3 h-3 fill-yellow-300 text-yellow-300'
                  >
                    <polygon
                      points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeMiterlimit={10}
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className='ml-2 text-sm'>
              <span>5.66k</span>
              <span className='ml-1'>sold</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
