import { useQuery } from "@tanstack/react-query"
import { getUser } from "@/services/user"

const useUser = (id: string) => {
  const { data: user, isLoading, error } = useQuery({
    queryKey: ['user', id],
    queryFn: () => getUser(id),
  })

  return {
    user,
    isLoading,
    error,
  }
}

export default useUser
