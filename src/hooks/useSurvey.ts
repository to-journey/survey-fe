import { useQuery } from "@tanstack/react-query"
import { getSurvey } from "@/services/survey"

const useSurvey = (id: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['survey', id],
    queryFn: () => getSurvey(id),
  })

  return {
    survey: data,
    isLoading,
    error,
  }
}

export default useSurvey
