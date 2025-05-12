import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toaster } from '@/components/ui/toaster'
import { deleteUser, getUsers, updateUser } from '@/services/user'

const useUsers = () => {
  const queryClient = useQueryClient()

  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  })

  const { mutateAsync: updateUserMutate, isPending: isUpdating } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      toaster.success({
        title: 'ユーザー情報を更新しました',
      })
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
    onError: () => {
      toaster.error({
        title: 'ユーザー情報を更新できませんでした',
      })
    },
  })

  const { mutateAsync: deleteUserMutate, isPending: isDeleting } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      toaster.success({
        title: 'ユーザーを削除しました',
      })
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
    onError: () => {
      toaster.error({
        title: 'ユーザーを削除できませんでした',
      })
    },
  })

  return {
    users: users ?? [],
    isLoading,
    error,
    updateUserMutate,
    deleteUserMutate,
    isUpdating,
    isDeleting,
  }
}

export default useUsers
