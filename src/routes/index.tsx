import { Button, ButtonGroup, Flex, Heading } from '@chakra-ui/react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const navigate = useNavigate()

  return (
    <Flex h="100vh" direction="column" justify="center" align="center" gap={4}>
      <Heading>QR</Heading>
      <ButtonGroup>
        <Button onClick={() => navigate({ to: '/login' })}>ログイン</Button>
        <Button onClick={() => navigate({ to: '/register' })}>新規登録</Button>
      </ButtonGroup>
    </Flex>
  )
}
