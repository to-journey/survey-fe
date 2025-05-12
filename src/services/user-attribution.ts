import type { UserAttribution } from "@/types/user-attribution"
import axios from "@/lib/axios"

export const createUserAttribution = async (data: UserAttribution) => {
  const response = await axios.post('/user-attributions', data)
  return response.data
}

export const getUserAttributions = async () => {
  const response = await axios.get('/user-attributions')
  return response.data
}

export const getUserAttribution = async (id: string) => {
  const response = await axios.get(`/user-attributions/${id}`)
  return response.data
}

export const updateUserAttribution = async (data: UserAttribution) => {
  const response = await axios.put(`/user-attributions/${data.id}`, data)
  return response.data
}

export const deleteUserAttribution = async (id: string) => {
  const response = await axios.delete(`/user-attributions/${id}`)
  return response.data
}
