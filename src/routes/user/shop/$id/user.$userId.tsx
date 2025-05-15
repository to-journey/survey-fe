import { Container, Heading, VStack } from '@chakra-ui/react'
import { createFileRoute, useParams } from '@tanstack/react-router'
import useSurveyAnswers from '@/hooks/useSurveyAnswers'
import useSurvey from '@/hooks/useSurvey'
import SurveyDetailWithAnswer from '@/components/survey/SurveyDetailWithAnswer'

export const Route = createFileRoute('/user/shop/$id/user/$userId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id, userId } = useParams({ from: '/user/shop/$id/user/$userId' })
  const { survey } = useSurvey(id)
  const { surveyAnswers: answers } = useSurveyAnswers(id, userId)

  return (
    <Container maxW="container.xl" py={10}>
      <VStack align="start" gap={4}>
        <Heading>回答を見る</Heading>
        {survey && <SurveyDetailWithAnswer survey={survey} answers={answers} />}
      </VStack>
    </Container>
  )
}
