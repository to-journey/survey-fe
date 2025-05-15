import { Button, Flex, Stack, Text, VStack } from '@chakra-ui/react'
import { Link, useNavigate } from '@tanstack/react-router'
import { useApp } from '@/providers/app'
import { Role } from '@/types/user'

const MenuItem = ({
  to,
  children,
}: {
  to: string
  children: React.ReactNode
}) => {
  return (
    <Link
      to={to}
      style={{
        display: 'block',
        padding: '0.75rem',
        borderRadius: '0.375rem',
        textDecoration: 'none',
        color: 'inherit',
      }}
      activeProps={{
        style: {
          backgroundColor: 'rgb(243, 244, 246)',
        },
      }}
    >
      <Text fontSize="md" fontWeight="medium">
        {children}
      </Text>
    </Link>
  )
}

const Menu = () => {
  const navigate = useNavigate()
  const { user, logout } = useApp()

  return (
    <Flex
      h="100vh"
      w="320px"
      p={4}
      direction="column"
      justify="space-between"
      bg="white"
      borderRightWidth="1px"
      borderColor="gray.200"
    >
      <VStack align="stretch" gap={4}>
        <Flex justify="start">
          <Link to="/">
            <Text fontSize="lg" fontWeight="bold">
              QR
            </Text>
          </Link>
        </Flex>
        {user?.role === Role.ADMIN ? (
          <Stack gap={2}>
            <MenuItem to="/company/customer">顧客管理ページ</MenuItem>
            <MenuItem to="/company/ai-analysis">AI分析</MenuItem>
            <MenuItem to="/company/survey">アンケートページ</MenuItem>
            <MenuItem to="/company/login-form">ログインフォームの編集</MenuItem>
          </Stack>
        ) : (
          <Stack gap={2}>
            <MenuItem to="/user/survey">アンケートページ</MenuItem>
            <MenuItem to="/user/shop">店舗</MenuItem>
          </Stack>
        )}
      </VStack>
      <Button
        onClick={() => {
          logout?.()
          navigate({ to: '/login' })
        }}
      >
        ログアウト
      </Button>
    </Flex>
  )
}

export default Menu
