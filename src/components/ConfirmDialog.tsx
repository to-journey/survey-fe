import { Box, Button, CloseButton, Flex } from '@chakra-ui/react'
import {
  DialogCloseTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

interface Props {
  children: React.ReactNode
  title: string
  description: React.ReactNode
  onConfirm: () => void
}

const ConfirmDialog = ({ children, title, description, onConfirm }: Props) => {
  return (
    <DialogRoot size="xs">
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogCloseTrigger asChild>
          <CloseButton as={Box} />
        </DialogCloseTrigger>
        <DialogHeader>
          <Flex w="full" direction="column" gap={2}>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
            <Flex justify="end">
              <Button onClick={onConfirm}>Confirm</Button>
            </Flex>
          </Flex>
        </DialogHeader>
      </DialogContent>
    </DialogRoot>
  )
}

export default ConfirmDialog
