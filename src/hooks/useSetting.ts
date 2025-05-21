import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getSetting, updateSetting } from "@/services/setting"
import { toaster } from "@/components/ui/toaster"

const useSetting = (name: string) => {
  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery({
    queryKey: ['setting', name],
    queryFn: () => getSetting(name),
  })

  const { mutateAsync: update, isPending: isUpdating } = useMutation({
    mutationFn: (value: string) => updateSetting(name, value),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['setting', name] })
      toaster.success({
        title: '設定を更新しました',
      })
    },
    onError: () => {
      toaster.error({
        title: '設定を更新できませんでした',
      })
    },
  })

  return {
    setting: data,
    isLoading,
    error,
    update,
    isUpdating,
  }
}

export default useSetting