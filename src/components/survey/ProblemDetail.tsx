import {
  Button,
  Checkbox,
  HStack,
  Input,
  Portal,
  RadioGroup,
  Select,
  Text,
  Textarea,
  VStack,
  createListCollection,
} from '@chakra-ui/react'
import { useParams } from '@tanstack/react-router'
import { useState } from 'react'
import type { FC } from 'react'
import type { Problem } from '@/types/survey'
import { ProblemType } from '@/types/survey'
import useSurvey from '@/hooks/useSurvey'

interface Props {
  problem: Problem
}

const ProblemDetail: FC<Props> = ({ problem }) => {
  const { id } = useParams({ from: '/user/survey/$id' })
  const { submitProblemMutate, isSubmitting } = useSurvey(id)
  const [answer, setAnswer] = useState<string>('')

  const options = createListCollection({
    items: problem.options,
  })

  const handleSubmit = () => {
    submitProblemMutate({
      id: problem.id,
      answer
    })
  }

  return (
    <VStack align="start" gap={4}>
      <HStack fontSize="lg" fontWeight="bold">
        <Text>第{problem.number}問</Text>
        <Text>{problem.name}</Text>
      </HStack>
      <HStack>
        <Text>問題:</Text>
        <Text>{problem.description}</Text>
      </HStack>
      {problem.type === ProblemType.SINGLE && (
        <Input
          w="320px"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
      )}
      {problem.type === ProblemType.MULTIPLE && (
        <Textarea
          w="320px"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
      )}
      {problem.type === ProblemType.CHECKBOX && (
        <VStack gap={2}>
          {problem.options.map((option) => (
            <Checkbox.Root
              key={option}
              checked={answer.split(',').includes(option)}
              onCheckedChange={(e) => {
                const checked = answer.split(',')
                setAnswer(
                  e.checked
                    ? [...checked, option].join(',')
                    : checked.filter((o: string) => o !== option).join(','),
                )
              }}
            >
              <HStack>
                <Checkbox.HiddenInput />
                <Checkbox.Control />
                <Checkbox.Label>{option}</Checkbox.Label>
              </HStack>
            </Checkbox.Root>
          ))}
        </VStack>
      )}
      {problem.type === ProblemType.RADIO && (
        <RadioGroup.Root
          value={answer}
          onValueChange={(e) => e.value && setAnswer(e.value)}
        >
          <VStack gap={2}>
            {problem.options.map((option) => (
              <HStack key={option}>
                <RadioGroup.Item value={option}>
                  <RadioGroup.ItemHiddenInput />
                  <RadioGroup.ItemIndicator />
                  <RadioGroup.ItemText>{option}</RadioGroup.ItemText>
                </RadioGroup.Item>
              </HStack>
            ))}
          </VStack>
        </RadioGroup.Root>
      )}
      {problem.type === ProblemType.DROPDOWN && (
        <Select.Root
          collection={options}
          width="320px"
          value={[answer]}
          onValueChange={(e) => setAnswer(e.value[0])}
        >
          <Select.HiddenSelect />
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText placeholder="選択してください" />
            </Select.Trigger>
            <Select.IndicatorGroup>
              <Select.Indicator />
            </Select.IndicatorGroup>
          </Select.Control>
          <Portal>
            <Select.Positioner>
              <Select.Content>
                {options.items.map((option, index) => (
                  <Select.Item key={index} item={option}>
                    {option}
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Portal>
        </Select.Root>
      )}
      <Button onClick={handleSubmit} loading={isSubmitting}>
        回答する
      </Button>
    </VStack>
  )
}

export default ProblemDetail
