import type { CreateUser, User } from "@/types/user"
import axios from "@/lib/axios"

export const getProfile = async () => {
  const response = await axios.get('/auth/profile')
  return response.data
}

export const getUsers = async () => {
  const response = await axios.get('/user')
  return response.data
}

export const getUser = async (id: string) => {
  const response = await axios.get(`/user/${id}`)
  return response.data
}

export const createUser = async (user: CreateUser) => {
  const response = await axios.post('/user', user)
  return response.data
}

export const updateUser = async (user: User) => {
  const response = await axios.put(`/user/${user.id}`, user)
  return response.data
}

export const deleteUser = async (id: string) => {
  const response = await axios.delete(`/user/${id}`)
  return response.data
}

export const importUsers = async (users: Array<CreateUser>) => {
  const response = await axios.post('/user/import', users)
  return response.data
}
