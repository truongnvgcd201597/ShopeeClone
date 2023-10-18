import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

type Rules = {
  [key in 'email' | 'password' | 'confirm-password']?: RegisterOptions
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
  email: {
    required: {
      value: true,
      message: 'Email is required'
    },
    minLength: { value: 5, message: 'Minimum email length is 5 words' },
    maxLength: { value: 160, message: 'Maximum email length is 160 words' },
    pattern: {
      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
      message: 'Invalid email format'
    }
  },
  password: {
    required: {
      value: true,
      message: 'Password is required'
    },
    minLength: { value: 6, message: 'Minimum password length is 6 words' },
    maxLength: { value: 160, message: 'Maximum password length is 160 words' }
  },
  'confirm-password': {
    required: {
      value: true,
      message: 'Confirm password is required'
    },
    minLength: { value: 6, message: 'Minimum password length is 6 words' },
    maxLength: { value: 160, message: 'Maximum password length is 160 words' },
    validate:
      typeof getValues === 'function'
        ? (value) => value === getValues('password') || 'Password does not match'
        : undefined
  }
})

export const schema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .email()
    .min(5, 'Minimum email length is 5 words')
    .max(160, 'Maximum email length is 160 words'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Minimum password length is 6 words')
    .max(160, 'Maximum password length is 160 words'),
  'confirm-password': yup
    .string()
    .required('Password is required')
    .min(6, 'Minimum password length is 6 words')
    .max(160, 'Maximum password length is 160 words')
    .oneOf([yup.ref('password')], 'Password does not match')
})

export type Schema = yup.InferType<typeof schema>
