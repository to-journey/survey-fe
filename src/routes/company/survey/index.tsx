import { useState } from 'react'
import { FaEye, FaTrash } from 'react-icons/fa'
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
import type { Survey } from '@/types/survey'
import ConfirmDialog from '@/components/ConfirmDialog'
import useSurveys from '@/hooks/useSurveys'

export const Route = createFileRoute('/company/survey/')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const [globalFilter, setGlobalFilter] = useState('')
  const { surveys, deleteSurveyMutate } = useSurveys()

  const columnHelper = createColumnHelper<Survey>()

  const columns = [
    columnHelper.accessor('id', {
      header: 'ID',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('name', {
      header: '名前',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('description', {
      header: '説明',
      cell: (info) => info.getValue(),
    }),
  ]

  const table = useReactTable({
    data: surveys,
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
        アンケート
      </Heading>
      <VStack align="stretch" gap={4}>
        <Flex justify="space-between">
          <Button onClick={() => navigate({ to: '/company/survey/create' })}>
            新規作成
          </Button>
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
                        deleteSurveyMutate(row.original.id!)
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
                          to: '/company/survey/$id',
                          params: {
                            id: row.original.id!,
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
