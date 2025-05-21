import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toaster } from '@/components/ui/toaster'
import { createUser, deleteUser, getUsers, importUsers, updateUser } from '@/services/user'

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

  const { mutateAsync: createUserMutate, isPending: isCreating } = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      toaster.success({
        title: 'ユーザーを作成しました',
      })
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
    onError: () => {
      toaster.error({
        title: 'ユーザーを作成できませんでした',
      })
    },
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

  const { mutateAsync: importUsersMutate, isPending: isImporting } = useMutation({
    mutationFn: importUsers,
    onSuccess: () => {
      toaster.success({
        title: 'ユーザーをインポートしました',
      })
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
    onError: () => {
      toaster.error({
        title: 'ユーザーをインポートできませんでした',
      })
    },
  })

  return {
    users: users ?? [],
    isLoading,
    error,
    createUserMutate,
    isCreating,
    updateUserMutate,
    isUpdating,
    deleteUserMutate,
    isDeleting,
    importUsersMutate,
    isImporting,
  }
}

export default useUsers