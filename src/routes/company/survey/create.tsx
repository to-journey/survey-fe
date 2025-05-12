import {
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import type { Problem } from '@/types/survey'
import { ProblemType } from '@/types/survey'
import CreateProblem from '@/components/survey/CreateProblem'
import useSurveys from '@/hooks/useSurveys'
import { toaster } from '@/components/ui/toaster'

export const Route = createFileRoute('/company/survey/create')({
  component: RouteComponent,
})

function RouteComponent() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [problems, setProblems] = useState<Array<Problem>>([
    {
      number: 1,
      name: '',
      description: '',
      type: ProblemType.SINGLE,
      options: [],
    },
  ])
  const [email, setEmail] = useState('')
  const [participants, setParticipants] = useState<Array<string>>([])
  const { createSurveyMutate, isCreating } = useSurveys()

  return (
    <Container maxW="container.xl" py={8}>
      <Heading>アンケート</Heading>
      <Grid templateColumns="1fr 1fr">
        <VStack mt={8} align="stretch" gap={4}>
          <Input
            w="320px"
            placeholder="タイトル"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            w="320px"
            placeholder="説明"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {problems.map((problem, index) => (
            <CreateProblem
              key={index}
              problem={problem}
              onUpdate={(updatedProblem) => {
                setProblems(
                  problems.map((p, i) => (i === index ? updatedProblem : p)),
                )
              }}
              onDelete={() =>
                setProblems(problems.filter((_p, i) => i !== index))
              }
            />
          ))}
          <Flex justify="start">
            <Button
              onClick={() =>
                setProblems([
                  ...problems,
                  {
                    number: problems.length + 1,
                    name: '',
                    description: '',
                    type: ProblemType.SINGLE,
                    options: [],
                  },
                ])
              }
            >
              問題追加
            </Button>
          </Flex>
          <Flex justify="start">
            <Button
              loading={isCreating}
              onClick={() =>
                createSurveyMutate({
                  name,
                  description,
                  problems,
                  participants,
                })
              }
            >
              作成
            </Button>
          </Flex>
        </VStack>
        <VStack mt={8} align="stretch" gap={4}>
          <Text>メールアドレス: </Text>
          <VStack align="start">
            {participants.map((participant, index) => (
              <Text key={index}>{participant}</Text>
            ))}
          </VStack>
          <Input
            w="320px"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Flex
            justify="start"
            onClick={() => {
              if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                toaster.error({ title: 'メールアドレスが不正です' })
                return
              }
              if (participants.includes(email)) {
                toaster.error({ title: 'すでに招待されています' })
                return
              }
              setParticipants([...participants, email])
            }}
          >
            <Button>招待</Button>
          </Flex>
        </VStack>
      </Grid>
    </Container>
  )
}
