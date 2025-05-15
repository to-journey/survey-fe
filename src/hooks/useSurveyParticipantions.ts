import { useQuery } from '@tanstack/react-query'
import { getSurveyParticipations } from '@/services/survey'

const useSurveyParticipations = (id: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['survey-participations', id],
    queryFn: () => getSurveyParticipations(id),
  })

  return { surveyParticipations: data ?? [], isLoading, error }
}

export default useSurveyParticipations
