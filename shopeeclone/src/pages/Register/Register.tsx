import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { getRules } from 'src/utils/rules'

interface FormData {
  email: string
  password: string
  'confirm-password': string
}

export default function Register() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<FormData>()
  const rules = getRules(getValues)

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  return (
    <div className='bg-orangeShopee'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='grid grid-cols-1 lg:grid-cols-5 lg:py-12 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='my-8 p-10 rounded bg-white shadow-sm' onSubmit={onSubmit}>
              <div className='text-2xl'>Register</div>
              <div className='mt-8'>
                <input
                  type='email'
                  placeholder='Email/Phone Number/Username'
                  {...register('email', rules.email)}
                  className='p-3 w-full outline-none border border-gray-300 rounded-sm focus:border-gray-600 focus:shadow'
                />
                <div className='my-2 text-red-600 min-h-[1.1rem] text-sm'>{errors.email?.message}</div>
              </div>
              <div className='mt-2'>
                <input
                  type='password'
                  autoComplete='on'
                  placeholder='Password'
                  {...register('password', rules.password)}
                  className='p-3 w-full outline-none border border-gray-300 rounded-sm focus:border-gray-600 focus:shadow'
                />
                <div className='my-2 text-red-600 min-h-[1.1rem] text-sm'>{errors.password?.message}</div>
              </div>
              <div className='mt-2'>
                <input
                  type='password'
                  autoComplete='on'
                  placeholder='Confirm Password'
                  {...register('confirm-password', rules['confirm-password'])}
                  className='p-3 w-full outline-none border border-gray-300 rounded-sm focus:border-gray-600 focus:shadow'
                />
                <div className='my-2 text-red-600 min-h-[1rem] text-sm'>{errors['confirm-password']?.message}</div>
              </div>
              <div className='mt-3'>
                <button
                  type='submit'
                  className='w-full py-[12px] bg-orange-500 text-white uppercase hover:bg-orange-600 rounded-sm'
                >
                  REGISTER
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
