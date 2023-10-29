import { User } from './user.types'
import { ResponseAPI } from './utils.types'

export type AuthResponse = ResponseAPI<{
  accessToken: string
  expires: string
  user: User
}>
