import {
  Box,
  Button,
  ButtonGroup,
  CloseButton,
  DialogCloseTrigger,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useRef, useState } from 'react'
import {
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTrigger,
} from '../ui/dialog'
import { toaster } from '../ui/toaster'
import useUsers from '@/hooks/useUsers'

const CustomerImportDialog = () => {
  const fileRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [isImporting, setIsImporting] = useState(false)
  const { importUsersMutate } = useUsers()

  const handleImport = async () => {
    if (!file) return
    setIsImporting(true)
    try {
      const reader = new FileReader()
      const csvContent = await new Promise<string>((resolve, reject) => {
        reader.onload = (e) => {
          resolve(e.target?.result as string)
        }
        reader.onerror = (e) => {
          reject(e)
        }
        reader.readAsText(file)
      })
      const rows = csvContent.split('\n')
      const headers = rows[0].split(',').map((header) => {
        switch (header) {
          case 'ID':
            return 'id'
          case 'メールアドレス':
            return 'email'
          case '姓':
            return 'lastName'
          case '名':
            return 'firstName'
          default:
            return header
        }
      })
      const data = rows.slice(1).map((row) => {
        const values = row.split(',')
        return headers.reduce(
          (acc: Record<string, string>, header, index) => ({
            ...acc,
            [header]: values[index],
          }),
          {},
        )
      })
      importUsersMutate(
        data.map((user) => {
          const { id: _, email, lastName, firstName, ...attributions } = user
          return {
            email,
            lastName,
            firstName,
            attributions: Object.entries(attributions).map(([key, value]) => ({
              key,
              value,
            })),
          }
        }),
      )
    } catch (error) {
      console.error(error)
      toaster.error({
        title: 'CSVファイルのインポートに失敗しました',
      })
    } finally {
      setIsImporting(false)
    }
  }

  return (
    <DialogRoot>
      <DialogTrigger asChild>
        <Button>CSVインポート</Button>
      </DialogTrigger>
      <DialogCloseTrigger>
        <CloseButton as={Box} />
      </DialogCloseTrigger>
      <DialogContent>
        <DialogHeader>CSVインポート</DialogHeader>
        <DialogBody>
          <VStack align="start" gap={4}>
            <Text>{file?.name}</Text>
            <ButtonGroup>
              <Button onClick={() => fileRef.current?.click()}>
                CSVファイルを選択
              </Button>
              {file && (
                <Button loading={isImporting} onClick={handleImport}>
                  CSVファイルをインポート
                </Button>
              )}
            </ButtonGroup>
          </VStack>
        </DialogBody>
        <Input
          type="file"
          ref={fileRef}
          display="none"
          onChange={(e) => e.target.files && setFile(e.target.files[0])}
        />
      </DialogContent>
    </DialogRoot>
  )
}

export default CustomerImportDialog