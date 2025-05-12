import {
  Button,
  Flex,
  HStack,
  Heading,
  Input,
  Select,
  Text,
  VStack,
  createListCollection,
} from '@chakra-ui/react'
import { FaTrash } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import type { Problem } from '@/types/survey'
import { ProblemType } from '@/types/survey'

interface CreateProblemProps {
  problem: Problem
  onUpdate: (problem: Problem) => void
  onDelete: () => void
}

const CreateProblem = ({ problem, onUpdate, onDelete }: CreateProblemProps) => {
  const [name, setName] = useState(problem.name)
  const [description, setDescription] = useState(problem.description)
  const [problemType, setProblemType] = useState<ProblemType>(
    ProblemType.SINGLE,
  )
  const [options, setOptions] = useState<Array<string>>([])

  useEffect(() => {
    onUpdate({
      number: problem.number,
      name,
      description,
      type: problemType,
      options,
    })
  }, [name, description, problemType, options])

  const handleTypeChange = (value: ProblemType) => {
    setProblemType(value)
  }

  const problemTypes = createListCollection({
    items: [
      { label: 'テキスト', value: ProblemType.SINGLE },
      { label: 'テキストエリア', value: ProblemType.MULTIPLE },
      { label: 'チェックボックス', value: ProblemType.CHECKBOX },
      { label: 'ラジオボタン', value: ProblemType.RADIO },
      { label: 'ドロップダウン', value: ProblemType.DROPDOWN },
    ],
  })

  return (
    <VStack align="start">
      <HStack>
        <Heading>第{problem.number}問</Heading>
        <Button variant="ghost" size="sm" onClick={onDelete}>
          <FaTrash />
        </Button>
      </HStack>
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
      <Select.Root
        w="320px"
        value={[problemType]}
        collection={problemTypes}
      >
        <Select.Trigger>
          <Select.ValueText placeholder="タイプ" />
        </Select.Trigger>
        <Select.Content>
          {problemTypes.items.map((item) => (
            <Select.Item
              key={item.value}
              item={item}
              onClick={() => handleTypeChange(item.value)}
            >
              {item.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
      {(problemType === ProblemType.CHECKBOX ||
        problemType === ProblemType.RADIO ||
        problemType === ProblemType.DROPDOWN) && (
        <VStack align="stretch" gap={2}>
          <Text>オプション</Text>
          {options.map((option, index) => (
            <HStack key={index} gap={2}>
              <Input
                w="320px"
                value={option}
                onChange={(e) => {
                  const newOptions = [...options]
                  newOptions[index] = e.target.value
                  setOptions(newOptions)
                }}
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  setOptions(options.filter((_, i) => i !== index))
                }
              >
                <FaTrash />
              </Button>
            </HStack>
          ))}
          <Flex justify="start">
            <Button onClick={() => setOptions([...options, ''])}>
              オプション追加
            </Button>
          </Flex>
        </VStack>
      )}
    </VStack>
  )
}

export default CreateProblem
