import { useQuery } from '@tanstack/react-query'
import axios from '@/lib/axios'

const useLoginToken = () => {
  const { data: token } = useQuery({
    queryKey: ['loginToken'],
    queryFn: async () => {
      const response = await axios.get('/auth/login-token')
      return response.data.token
    },
  })
  return token
}

export default useLoginToken
