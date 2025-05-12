import { Container } from '@chakra-ui/react'
import { createFileRoute, useParams } from '@tanstack/react-router'
import useSurvey from '@/hooks/useSurvey'
import SurveyDetail from '@/components/survey/SurveyDetail'

export const Route = createFileRoute('/user/survey/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = useParams({ from: '/user/survey/$id' })
  const { survey } = useSurvey(id)
  
  return (
    <Container maxW="container.xl" py={10}>
      {survey && <SurveyDetail survey={survey} />}
    </Container>
  )
}
