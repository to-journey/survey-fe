import {
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
import type { FC } from 'react'
import type { Problem } from '@/types/survey'
import { ProblemType } from '@/types/survey'

interface Props {
  problem: Problem
}

const ProblemDetail: FC<Props> = ({ problem }) => {
  const options = createListCollection({
    items: problem.options,
  })

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
      {problem.type === ProblemType.SINGLE && <Input w="320px" />}
      {problem.type === ProblemType.MULTIPLE && <Textarea w="320px" />}
      {problem.type === ProblemType.CHECKBOX && (
        <VStack gap={2}>
          {problem.options.map((option) => (
            <Checkbox.Root>
              <HStack key={option}>
                <Checkbox.HiddenInput />
                <Checkbox.Control />
                <Checkbox.Label>{option}</Checkbox.Label>
              </HStack>
            </Checkbox.Root>
          ))}
        </VStack>
      )}
      {problem.type === ProblemType.RADIO && (
        <RadioGroup.Root>
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
        <Select.Root collection={options} width="320px">
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
    </VStack>
  )
}

export default ProblemDetail
