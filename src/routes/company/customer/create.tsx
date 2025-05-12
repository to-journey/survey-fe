import {
  Button,
  Container,
  Heading,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/company/customer/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Container maxW="container.xl" py={8}>
      <Heading size="lg" mb={6}>
        新規作成
      </Heading>
      <VStack p={4} borderWidth={1} borderRadius="md" gap={4}>
        <VStack align="stretch" gap={2}>
          <Text>名前:</Text>
          <Input w="320px" />
        </VStack>
        <VStack align="stretch" gap={2}>
          <Text>メールアドレス:</Text>
          <Input w="320px" />
        </VStack>
        <Button>作成</Button>
      </VStack>
    </Container>
  )
}
