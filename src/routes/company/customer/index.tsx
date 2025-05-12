import {
  Button,
  ButtonGroup,
  Container,
  Flex,
  Heading,
  Input,
  Table,
  VStack,
} from '@chakra-ui/react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import {
  createColumnHelper,
  filterFns,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'
import { FaEye, FaTrash } from 'react-icons/fa'
import type { User } from '@/types/user'
import ConfirmDialog from '@/components/ConfirmDialog'
import useUsers from '@/hooks/useUsers'

export const Route = createFileRoute('/company/customer/')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const { users, deleteUserMutate } = useUsers()
  const [globalFilter, setGlobalFilter] = useState('')
  
  const columnHelper = createColumnHelper<User>()

  const columns = [
    columnHelper.accessor('id', {
      header: 'ID',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('lastName', {
      header: '姓',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('firstName', {
      header: '名',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('email', {
      header: 'メールアドレス',
      cell: (info) => info.getValue(),
    }),
  ]

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter,
    },
    filterFns: {
      fuzzy: filterFns.equals,
    },
  })

  return (
    <Container maxW="container.xl" py={8}>
      <Heading size="lg" mb={6}>
        顧客一覧
      </Heading>
      <VStack align="stretch" gap={4}>
        <Flex justify="end">
          {/* <Button onClick={() => navigate({ to: '/company/customer/create' })}>
            新規作成
          </Button> */}
          <Input
            w="320px"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search"
          />
        </Flex>
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
                        deleteUserMutate(row.original.id)
                      }}
                    >
                      <Button variant="ghost" size="sm">
                        <FaTrash />
                      </Button>
                    </ConfirmDialog>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        navigate({
                          to: '/company/customer/$id',
                          params: {
                            id: row.original.id.toString(),
                          },
                        })
                      }
                    >
                      <FaEye />
                    </Button>
                  </ButtonGroup>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </VStack>
    </Container>
  )
}
