import { useMutation, useQuery } from "@tanstack/react-query"
import type { ProblemAnswerDto } from "@/types/survey"
import { toaster } from "@/components/ui/toaster"
import { getSurvey, submitProblem } from "@/services/survey"

const useSurvey = (id: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['survey', id],
    queryFn: () => getSurvey(id),
  })

  const { mutateAsync: submitProblemMutate, isPending: isSubmitting } =
    useMutation({
      mutationFn: (problemAnswer: ProblemAnswerDto) => submitProblem(id, problemAnswer),
      onSuccess: () => {
        toaster.success({ title: 'アンケートを回答しました' })
      },
      onError: () => {
        toaster.error({ title: 'アンケートを回答できませんでした' })
      },
    })

  return {
    survey: data,
    isLoading,
    error,
    submitProblemMutate,
    isSubmitting,
  }
}

export default useSurvey