import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { Survey } from '@/types/survey'
import { toaster } from '@/components/ui/toaster'
import {
  createSurvey,
  deleteSurvey,
  getSurveys,
  updateSurvey,
} from '@/services/survey'

const useSurveys = () => {
  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery({
    queryKey: ['surveys'],
    queryFn: () => getSurveys(),
  })

  const { mutateAsync: createSurveyMutate, isPending: isCreating } =
    useMutation({
      mutationFn: (survey: Survey) => createSurvey(survey),
      onSuccess: () => {
        toaster.success({ title: 'アンケートを作成しました' })
        queryClient.invalidateQueries({ queryKey: ['surveys'] })
      },
      onError: () => {
        toaster.error({ title: 'アンケートを作成できませんでした' })
      },
    })

  const { mutateAsync: updateSurveyMutate, isPending: isUpdating } =
    useMutation({
      mutationFn: (survey: Survey) => updateSurvey(survey.id!, survey),
      onSuccess: () => {
        toaster.success({ title: 'アンケートを更新しました' })
        queryClient.invalidateQueries({ queryKey: ['surveys'] })
      },
      onError: () => {
        toaster.error({ title: 'アンケートを更新できませんでした' })
      },
    })

  const { mutateAsync: deleteSurveyMutate, isPending: isDeleting } =
    useMutation({
      mutationFn: (id: string) => deleteSurvey(id),
      onSuccess: () => {
        toaster.success({ title: 'アンケートを削除しました' })
        queryClient.invalidateQueries({ queryKey: ['surveys'] })
      },
      onError: () => {
        toaster.error({ title: 'アンケートを削除できませんでした' })
      },
    })

  return {
    surveys: data ?? [],
    isLoading,
    error,
    createSurveyMutate,
    isCreating,
    updateSurveyMutate,
    isUpdating,
    deleteSurveyMutate,
    isDeleting,
  }
}

export default useSurveys
