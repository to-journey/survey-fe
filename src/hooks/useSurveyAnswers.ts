import { useQuery } from '@tanstack/react-query'
import { getSurveyAnswers } from '@/services/survey'

const useSurveyAnswers = (id: string, userId: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['survey-answer', id, userId],
    queryFn: () => getSurveyAnswers(id, userId),
  })

  return {
    surveyAnswers: data ?? [],
    isLoading,
    error,
  }
}

export default useSurveyAnswers
