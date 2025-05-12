import {
  Checkbox,
  HStack,
  Portal,
  RadioGroup,
  Select,
  Text,
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
    <VStack key={problem.id} align="start" gap={4}>
      <HStack fontSize="lg" fontWeight="bold">
        <Text>第{problem.id}問</Text>
        <Text>{problem.name}</Text>
      </HStack>
      <HStack>
        <Text>問題:</Text>
        <Text>{problem.description}</Text>
      </HStack>
      {problem.type === ProblemType.CHECKBOX && (
        <VStack gap={2}>
          {problem.options.map((option) => (
            <HStack key={option}>
              {problem.type === ProblemType.CHECKBOX && (
                <Checkbox.Root>
                  <Checkbox.HiddenInput />
                  <Checkbox.Control />
                  <Checkbox.Label>{option}</Checkbox.Label>
                </Checkbox.Root>
              )}
            </HStack>
          ))}
        </VStack>
      )}
      {problem.type === ProblemType.RADIO && (
        <VStack gap={2}>
          {problem.options.map((option) => (
            <HStack key={option}>
              {problem.type === ProblemType.RADIO && (
                <RadioGroup.Root>
                  <RadioGroup.Item value={option}>
                    <RadioGroup.ItemHiddenInput />
                    <RadioGroup.ItemIndicator />
                    <RadioGroup.ItemText>{option}</RadioGroup.ItemText>
                  </RadioGroup.Item>
                </RadioGroup.Root>
              )}
            </HStack>
          ))}
        </VStack>
      )}
      {problem.type === ProblemType.DROPDOWN && (
        <Select.Root
          collection={options}
          width="320px"
        >
          <Select.HiddenSelect />
          <Select.Label>Select framework</Select.Label>
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText placeholder="Select framework" />
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
