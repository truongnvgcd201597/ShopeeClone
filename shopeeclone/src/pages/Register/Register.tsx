import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import InputField from 'src/components/InputField/InputField'
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
      <div className='container'>
        <div className='grid grid-cols-1 lg:grid-cols-5 lg:py-12 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='my-8 p-10 rounded bg-white shadow-sm' onSubmit={onSubmit}>
              <div className='text-2xl'>Register</div>
              <InputField
                name='email'
                register={register}
                type='email'
                className='mt-8'
                errorMessage={errors.email?.message}
                placeholder='Email/Phone Number/Username'
                rules={rules.email}
              />
              <InputField
                name='password'
                register={register}
                type='password'
                className='mt-2'
                errorMessage={errors.password?.message}
                placeholder='Password'
                rules={rules.password}
                autoCompelete='on'
              />
              <InputField
                name='confirm-password'
                register={register}
                type='password'
                className='mt-2'
                errorMessage={errors['confirm-password']?.message}
                placeholder='Confirm Password'
                rules={rules['confirm-password']}
                autoCompelete='on'
              />
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
