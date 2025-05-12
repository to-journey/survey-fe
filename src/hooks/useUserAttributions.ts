import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createUserAttribution,
  deleteUserAttribution,
  getUserAttributions,
  updateUserAttribution,
} from '@/services/user-attribution'
import { toaster } from '@/components/ui/toaster'

const useUserAttributions = () => {
  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery({
    queryKey: ['userAttributions'],
    queryFn: getUserAttributions,
  })

  const { mutateAsync: createUserAttributionMutate, isPending: isCreating } =
    useMutation({
      mutationFn: createUserAttribution,
      onSuccess: () => {
        toaster.success({
          title: 'ユーザー属性を作成しました',
        })
        queryClient.invalidateQueries({ queryKey: ['userAttributions'] })
      },
      onError: () => {
        toaster.error({
          title: 'ユーザー属性を作成できませんでした',
        })
      },
    })

  const { mutateAsync: updateUserAttributionMutate, isPending: isUpdating } =
    useMutation({
      mutationFn: updateUserAttribution,
      onSuccess: () => {
        toaster.success({
          title: 'ユーザー属性を更新しました',
        })
        queryClient.invalidateQueries({ queryKey: ['userAttributions'] })
      },
      onError: () => {
        toaster.error({
          title: 'ユーザー属性を更新できませんでした',
        })
      },
    })

  const { mutateAsync: deleteUserAttributionMutate, isPending: isDeleting } =
    useMutation({
      mutationFn: deleteUserAttribution,
      onSuccess: () => {
        toaster.success({
          title: 'ユーザー属性を削除しました',
        })
        queryClient.invalidateQueries({ queryKey: ['userAttributions'] })
      },
      onError: () => {
        toaster.error({
          title: 'ユーザー属性を削除できませんでした',
        })
      },
    })

  return {
    userAttributions: data ?? [],
    isLoading,
    error,
    createUserAttributionMutate,
    isCreating,
    updateUserAttributionMutate,
    isUpdating,
    deleteUserAttributionMutate,
    isDeleting,
  }
}

export default useUserAttributions
