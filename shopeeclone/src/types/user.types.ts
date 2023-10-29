type AccessRoles = 'Admin' | 'User'
export interface User {
  roles: AccessRoles[]
  _id: string
  email: string
  createdAt: string
  updatedAt: string
}
