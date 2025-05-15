import axios from "@/lib/axios"

export const getSetting = async (name: string) => {
  const response = await axios.get(`/setting/${name}`)
  return response.data
}

export const updateSetting = async (name: string, value: string) => {
  const response = await axios.patch(`/setting/${name}`, { value })
  return response.data
}
