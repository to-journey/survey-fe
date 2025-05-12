import { Outlet, createFileRoute, useNavigate } from '@tanstack/react-router'
import { Box } from '@chakra-ui/react'
import { useEffect } from 'react'
import LeftSidebar from '@/components/LeftSidebar'
import { useApp } from '@/providers/app'

export const Route = createFileRoute('/user')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const { user, isLoading } = useApp()

  useEffect(() => {
    if (!isLoading && !user) {
      navigate({ to: '/login' })
    }
  }, [isLoading, user, navigate])

  return (
    <Box w="100vw" h="100vh" display="flex">
      <LeftSidebar />
      <Box flex={1} p={4} overflowY="auto">
        <Outlet />
      </Box>
    </Box>
  )
}
