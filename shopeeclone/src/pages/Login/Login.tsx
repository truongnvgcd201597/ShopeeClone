import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { loginAccount } from 'src/api/auth.api'
import Button from 'src/components/Button'
import InputField from 'src/components/InputField/InputField'
import { AppContext } from 'src/contexts/app.context'
import { ErrorResponse } from 'src/types/utils.types'
import { Schema, schema } from 'src/utils/rules'
import { isAxiosErrorUnprocessableEntityError } from 'src/utils/utils'

type FormData = Pick<Schema, 'email' | 'password'>
const loginSchema = schema.pick(['email', 'password'])

export default function Login() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })
  const [isLoading, setIsLoading] = useState(false)

  const loginAccountMutation = useMutation({
    mutationFn: (body: FormData) => loginAccount(body),
    onMutate: () => {
      setIsLoading(true)
    },
    onSuccess: (data) => {
      setProfile(data.data.data.user)
      setIsAuthenticated(true)
      navigate('/')
    },
    onSettled: () => {
      setIsLoading(false)
    }
  })

  const onSubmit = handleSubmit((data) => {
    loginAccountMutation.mutate(data, {
      onSuccess: () => {
        setIsAuthenticated(true)
        navigate('/')
      },
      onError(error) {
        if (isAxiosErrorUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof FormData, {
                type: 'server',
                message: formError[key as keyof FormData]
              })
            })
          }
        }
      }
    })
  })

  return (
    <div className='bg-orangeShopee'>
      <div className='container'>
        <div className='grid grid-cols-1 lg:grid-cols-5 lg:py-12 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='my-8 p-10 rounded bg-white shadow-sm' onSubmit={onSubmit}>
              <div className='text-2xl'>Login</div>
              <InputField
                name='email'
                register={register}
                type='email'
                className='mt-8'
                errorMessage={errors.email?.message}
                placeholder='Email/Phone Number/Username'
              />
              <div className='mt-3'>
                <InputField
                  name='password'
                  register={register}
                  type='password'
                  className='mt-2'
                  errorMessage={errors.password?.message}
                  placeholder='Password'
                  autoCompelete='on'
                />
              </div>
              <div className='mt-3'>
                <Button
                  type='submit'
                  className='w-full py-[12px] bg-orange-500 text-white uppercase hover:bg-orange-600 rounded-sm'
                  isLoading={isLoading}
                  disabled={isLoading}
                >
                  LOGIN
                </Button>
              </div>
              <div className='mt-8 text-center'>
                <div className='flex justify-center items-center gap-2'>
                  <span className='text-slate-400'>New to Shopee?</span>
                  <Link to='/register' className='text-orangeShopee'>
                    Register
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
