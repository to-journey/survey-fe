import {
  HStack,
  Text,
  VStack
} from '@chakra-ui/react'
import ProblemDetail from './ProblemDetail'
import type { FC } from 'react'
import type { Survey } from '@/types/survey'

interface Props {
  survey: Survey
}

const SurveyDetail: FC<Props> = ({ survey }) => {
  return (
    <VStack align="start">
      <HStack>
        <Text fontSize="lg" fontWeight="bold">アンケート名:</Text>
        <Text>{survey.name}</Text>
      </HStack>
      <HStack>
        <Text>アンケート説明:</Text>
        <Text>{survey.description}</Text>
      </HStack>
      {survey.problems.map((problem) => (
        <ProblemDetail key={problem.id} problem={problem} />
      ))}
    </VStack>
  )
}

export default SurveyDetail
