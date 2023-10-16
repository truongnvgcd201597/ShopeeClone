import { Link } from 'react-router-dom'

export default function Register() {
  return (
    <div className='bg-orangeShopee'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='grid grid-cols-1 lg:grid-cols-5 lg:py-12 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='my-8 p-10 rounded bg-white shadow-sm'>
              <div className='text-2xl'>Register</div>
              <div className='mt-8'>
                <input
                  type='email'
                  name='email'
                  placeholder='Email/Phone Number/Username'
                  className='p-3 w-full outline-none border border-gray-300 rounded-sm focus:border-gray-600 focus:shadow'
                />
                <div className='my-2 text-red-600 min-h-[1rem] text-sm'>Invalid email</div>
              </div>
              <div className='mt-3'>
                <input
                  type='password'
                  name='password'
                  placeholder='Password'
                  className='p-3 w-full outline-none border border-gray-300 rounded-sm focus:border-gray-600 focus:shadow'
                />
                <div className='my-2 text-red-600 min-h-[1rem] text-sm'>Invalid password</div>
              </div>
              <div className='mt-3'>
                <input
                  type='password'
                  name='confirm-password'
                  placeholder='Confirm Password'
                  className='p-3 w-full outline-none border border-gray-300 rounded-sm focus:border-gray-600 focus:shadow'
                />
                <div className='my-2 text-red-600 min-h-[1rem] text-sm'>Unmatching password</div>
              </div>
              <div className='mt-3'>
                <button className='w-full py-[12px] bg-orange-500 text-white uppercase hover:bg-orange-600 rounded-sm'>
                  LOGIN
                </button>
              </div>
              <div className='mt-8 text-center'>
                <div className='flex justify-center items-center gap-2'>
                  <span className='text-gray-400'>Do you already have an account?</span>
                  <Link to='/login' className='text-orangeShopee'>
                    Login
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
