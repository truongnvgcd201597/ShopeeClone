import { User } from 'src/types/user.types'

export const saveAccessTokenToLocalStorage = (access_token: string): void => {
  localStorage.setItem('access_token', access_token)
}

export const clearLocalStorage = (): void => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('profile')
}

export const getAccessTokenFromLocalStorage = (): string => {
  return localStorage.getItem('access_token') || ''
}

export const getUserProfile = (): User | null => {
  const result = localStorage.getItem('profile')
  return result ? JSON.parse(result) : null
}

export const setUserProfile = (profile: User): void => {
  localStorage.setItem('profile', JSON.stringify(profile))
}
