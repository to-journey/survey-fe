import { Box } from '@chakra-ui/react'
import {
  Outlet,
  createFileRoute,
  useNavigate,
} from '@tanstack/react-router'
import { useEffect } from 'react'
import LeftSidebar from '../components/LeftSidebar'
import { useApp } from '@/providers/app'
import { Role } from '@/types/user'

export const Route = createFileRoute('/company')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const { user, isLoading } = useApp()

  return (
    <Box w="100vw" h="100vh" display="flex">
      <LeftSidebar />
      <Box flex={1} p={4} overflowY="auto">
        <Outlet />
      </Box>
    </Box>
  )
}
