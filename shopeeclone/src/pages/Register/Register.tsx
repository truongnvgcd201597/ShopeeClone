import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { omit } from 'lodash'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { registerAccount } from 'src/api/auth.api'
import Button from 'src/components/Button'
import InputField from 'src/components/InputField/InputField'
import { AppContext } from 'src/contexts/app.context'
import { ErrorResponse } from 'src/types/utils.types'
import { schema, Schema } from 'src/utils/rules'
import { isAxiosErrorUnprocessableEntityError } from 'src/utils/utils'

type FormData = Schema

export default function Register() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const [isLoading, setIsLoading] = useState(false)

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm-password'>) => registerAccount(body),
    onMutate: () => {
      setIsLoading(true)
    },
    onSuccess: () => {
      setIsAuthenticated(true)
      navigate('/')
    },
    onSettled: () => {
      setIsLoading(false)
    }
  })

  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm-password'])
    registerAccountMutation.mutate(body, {
      onSuccess(data) {
        setProfile(data.data.data.user)
        setIsAuthenticated(true)
        navigate('/')
      },
      onError(error) {
        if (isAxiosErrorUnprocessableEntityError<ErrorResponse<Omit<FormData, 'confirm-password'>>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof Omit<FormData, 'confirm-password'>, {
                type: 'server',
                message: formError[key as keyof Omit<FormData, 'confirm-password'>]
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
              <div className='text-2xl'>Register</div>
              <InputField
                name='email'
                register={register}
                type='email'
                className='mt-8'
                errorMessage={errors.email?.message}
                placeholder='Email/Phone Number/Username'
              />
              <InputField
                name='password'
                register={register}
                type='password'
                className='mt-2'
                errorMessage={errors.password?.message}
                placeholder='Password'
                autoCompelete='on'
              />
              <InputField
                name='confirm-password'
                register={register}
                type='password'
                className='mt-2'
                errorMessage={errors['confirm-password']?.message}
                placeholder='Confirm Password'
                autoCompelete='on'
              />
              <div className='mt-3'>
                <Button
                  type='submit'
                  className='w-full py-[12px] bg-orange-500 text-white uppercase hover:bg-orange-600 rounded-sm'
                  isLoading={isLoading}
                  disabled={isLoading}
                >
                  REGISTER
                </Button>
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
