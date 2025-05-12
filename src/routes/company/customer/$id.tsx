import { Container, Flex, Heading, Text, VStack } from '@chakra-ui/react'
import { createFileRoute, useParams } from '@tanstack/react-router'
import useUser from '@/hooks/useUser'

export const Route = createFileRoute('/company/customer/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = useParams({ from: '/company/customer/$id' })
  const { user } = useUser(id)

  return (
    <Container maxW="container.xl" py={10}>
      <Heading size="lg" mb={6}>
        顧客情報
      </Heading>
      <VStack align="stretch" gap={4}>
        <Flex>
          <Text>名前:&nbsp;</Text>
          <Text>{user?.firstName}</Text>
          <Text>{user?.lastName}</Text>
        </Flex>
        <Flex>
          <Text>メールアドレス:&nbsp;</Text>
          <Text>{user?.email}</Text>
        </Flex>
      </VStack>
    </Container>
  )
}
