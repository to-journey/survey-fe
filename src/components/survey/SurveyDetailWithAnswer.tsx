import { HStack, Text, VStack } from '@chakra-ui/react'
import ProblemDetail from './ProblemDetail'
import type { FC } from 'react'
import type { Answer, Survey } from '@/types/survey'

interface Props {
  survey: Survey
  answers: Array<Answer>
}

const SurveyDetailWithAnswer: FC<Props> = ({ survey, answers }) => {
  return (
    <VStack align="start">
      <HStack>
        <Text fontSize="lg" fontWeight="bold">
          アンケート名:
        </Text>
        <Text>{survey.name}</Text>
      </HStack>
      <HStack>
        <Text>アンケート説明:</Text>
        <Text>{survey.description}</Text>
      </HStack>
      {answers.map(({ problem, answer }) => (
        <ProblemDetail
          id={survey.id}
          key={problem.id}
          problem={problem}
          defaultAnswer={answer}
          readonly
        />
      ))}
    </VStack>
  )
}

export default SurveyDetailWithAnswer
