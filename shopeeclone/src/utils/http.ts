import axios, { AxiosError, AxiosInstance } from 'axios'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import { toast } from 'react-toastify'
import {
  clearLocalStorage,
  getAccessTokenFromLocalStorage,
  saveAccessTokenToLocalStorage,
  setUserProfile
} from './auth'
import path from 'src/constants/path'
import { AuthResponse } from 'src/types/auth.types'

export class Http {
  instance: AxiosInstance
  private accessToken: string
  constructor() {
    // eslint-disable-next-line prettier/prettier
    ;(this.accessToken = getAccessTokenFromLocalStorage()),
      (this.instance = axios.create({
        baseURL: 'https://api-ecom.duthanhduoc.com/',
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json'
        }
      }))

    // Add a request interceptor
    axios.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.authorization = this.accessToken
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === path.login || url === path.register) {
          const data = response.data as AuthResponse
          this.accessToken = data.data?.access_token
          saveAccessTokenToLocalStorage(this.accessToken)
          setUserProfile(data.data?.user)
        } else if (url === path.logout) {
          this.accessToken = ''
          clearLocalStorage()
        }
        return response
      },
      function (error: AxiosError) {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data
          const message = data.message || error.message
          toast.error(message)
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance

export default http
