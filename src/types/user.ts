export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

export type User = {
  id: string
  lastName: string
  firstName: string
  email: string
  role: Role
  attributions: Array<{
    key: string
    value: string
  }>
}
