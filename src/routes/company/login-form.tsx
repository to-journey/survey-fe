import {
  Box,
  Button,
  ButtonGroup,
  CloseButton,
  Container,
  Flex,
  Heading,
  Input,
  Table,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { FaTrash } from 'react-icons/fa'
import { createFileRoute } from '@tanstack/react-router'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  createColumnHelper,
  filterFns,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table'
import type { UserAttribution } from '@/types/user-attribution'
import useUserAttributions from '@/hooks/useUserAttributions'
import {
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { userAttributionSchema } from '@/types/user-attribution'
import ConfirmDialog from '@/components/ConfirmDialog'

export const Route = createFileRoute('/company/login-form')({
  component: RouteComponent,
})

function RouteComponent() {
  const {
    userAttributions,
    createUserAttributionMutate,
    deleteUserAttributionMutate,
  } = useUserAttributions()

  const columnHelper = createColumnHelper<UserAttribution>()

  const columns = [
    columnHelper.accessor('name', {
      header: '名前',
    }),
  ]

  const table = useReactTable({
    data: userAttributions,
    columns,
    filterFns: {
      fuzzy: filterFns.equals,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserAttribution>({
    resolver: zodResolver(userAttributionSchema),
  })

  const onSubmit = (data: UserAttribution) => {
    createUserAttributionMutate(data)
  }

  return (
    <Container maxW="container.xl" py={8}>
      <Flex>
        <Box>
          <Heading size="lg" mb={6}>
            ユーザーフィールド
          </Heading>
        </Box>
      </Flex>
      <VStack align="stretch" gap={4}>
        <Table.Root>
          <Table.Body>
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Row key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Table.ColumnHeader key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </Table.ColumnHeader>
                ))}
                <Table.ColumnHeader>アクション</Table.ColumnHeader>
              </Table.Row>
            ))}
          </Table.Body>
          <Table.Body>
            {table.getRowModel().rows.map((row) => (
              <Table.Row key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Table.Cell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Cell>
                ))}
                <Table.Cell>
                  <ButtonGroup>
                    <ConfirmDialog
                      title="削除"
                      description="本当に削除しますか？"
                      onConfirm={() => {
                        deleteUserAttributionMutate(row.original.id!)
                      }}
                    >
                      <Button variant="ghost" size="sm">
                        <FaTrash />
                      </Button>
                    </ConfirmDialog>
                  </ButtonGroup>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
        <Flex justify="start">
          <DialogRoot>
            <DialogTrigger asChild>
              <Button>追加</Button>
            </DialogTrigger>
            <DialogCloseTrigger asChild>
              <CloseButton as={Box} />
            </DialogCloseTrigger>
            <DialogContent p={4}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <VStack align="stretch" gap={4}>
                  <DialogHeader>
                    <DialogTitle>ユーザーフィールドを追加</DialogTitle>
                  </DialogHeader>
                  <Input placeholder="名前" {...register('name')} />
                  {errors.name && (
                    <Text color="red">{errors.name.message}</Text>
                  )}
                  <Input
                    placeholder="デフォルト値"
                    {...register('defaultValue')}
                  />
                  {errors.defaultValue && (
                    <Text color="red">{errors.defaultValue.message}</Text>
                  )}
                  <DialogFooter>
                    <Button type="submit">追加</Button>
                  </DialogFooter>
                </VStack>
              </form>
            </DialogContent>
          </DialogRoot>
        </Flex>
      </VStack>
    </Container>
  )
}
