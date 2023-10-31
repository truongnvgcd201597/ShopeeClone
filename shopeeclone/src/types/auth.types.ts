import { User } from './user.types'
import { SuccessResponse } from './utils.types'

export type AuthResponse = SuccessResponse<{
  access_token: string
  refresh_token: string
  expires_refresh_token: number
  expires: number
  user: User
}>
