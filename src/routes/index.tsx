import { Flex, Heading, QrCode } from '@chakra-ui/react'
import { createFileRoute } from '@tanstack/react-router'
import useLoginToken from '@/hooks/useLoginToken';

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const token = useLoginToken();

  return (
    <Flex h="100vh" direction="column" justify="center" align="center" gap={4}>
      <Heading>QR</Heading>
      <QrCode.Root value={`${window.location.origin}/login?token=${token}`} size='xl'>
        <QrCode.Frame>
          <QrCode.Pattern />
        </QrCode.Frame>
      </QrCode.Root>
    </Flex>
  )
}
