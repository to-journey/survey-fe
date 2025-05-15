import { useState } from 'react'
import { FaEye } from 'react-icons/fa'
import {
  Button,
  Container,
  Flex,
  Heading,
  Input,
  Table,
  VStack,
} from '@chakra-ui/react'
import { createFileRoute, useNavigate, useParams } from '@tanstack/react-router'
import {
  createColumnHelper,
  filterFns,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table'
import type { User } from '@/types/user'
import useSurveyParticipations from '@/hooks/useSurveyParticipantions'
import ConfirmDialog from '@/components/ConfirmDialog'
import useSetting from '@/hooks/useSetting'

export const Route = createFileRoute('/user/shop/$id/')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const { id } = useParams({ from: '/user/shop/$id/' })
  const { surveyParticipations } = useSurveyParticipations(id)
  const { setting } = useSetting('cut_points')
  const [globalFilter, setGlobalFilter] = useState('')

  const columnHelper = createColumnHelper<User>()

  const columns = [
    columnHelper.accessor('id', {
      header: 'ID',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('firstName', {
      header: '名',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('lastName', {
      header: '姓',
      cell: (info) => info.getValue(),
    }),
  ]

  const table = useReactTable({
    data: surveyParticipations,
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
    <Container maxW="container.xl" py={10}>
      <Heading></Heading>
      <VStack align="stretch" gap={4}>
        <Flex justify="right">
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
                  <ConfirmDialog
                    title="アンケートを見る"
                    description={
                      <>
                        本当にアンケートを見ますか？<br />
                        スコアが{setting?.value}ポイント削減されます。
                      </>
                    }
                    onConfirm={() => {
                      navigate({
                        to: '/user/shop/$id/user/$userId',
                        params: {
                          id,
                          userId: row.original.id,
                        },
                      })
                    }}
                  >
                    <Button variant="ghost" size="sm">
                      <FaEye />
                    </Button>
                  </ConfirmDialog>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </VStack>
    </Container>
  )
}
