import { Box, Button, Flex, Stack, Text, VStack } from '@chakra-ui/react'
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
        transition: 'all 0.2s',
      }}
      activeProps={{
        style: {
          backgroundColor: 'rgb(243, 244, 246)',
          color: 'rgb(79, 70, 229)',
          fontWeight: '600',
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
      p={6}
      direction="column"
      justify="space-between"
      bg="white"
      borderRightWidth="1px"
      borderColor="gray.200"
      boxShadow="sm"
    >
      <VStack align="stretch" gap={6}>
        <Flex justify="start">
          <Link to="/">
            <Text fontSize="2xl" fontWeight="bold" color="indigo.600">
              QR Survey
            </Text>
          </Link>
        </Flex>
        {user?.role === Role.ADMIN ? (
          <Stack gap={2}>
            <MenuItem to="/company/customer">顧客管理</MenuItem>
            <MenuItem to="/company/ai-analysis">AI分析</MenuItem>
            <MenuItem to="/company/survey">アンケート</MenuItem>
            <MenuItem to="/company/login-form">ログインフォーム</MenuItem>
            <MenuItem to="/company/setting">設定</MenuItem>
          </Stack>
        ) : (
          <Stack gap={2}>
            <MenuItem to="/user/survey">アンケート</MenuItem>
            <MenuItem to="/user/shop">店舗</MenuItem>
          </Stack>
        )}
      </VStack>
      <VStack align="stretch" gap={4} bg="gray.50" p={4} rounded="lg">
        {user && (
          <>
            <Box>
              <Text fontSize="sm" color="gray.500">
                {user.role === Role.ADMIN ? '管理者' : 'ユーザー'}
              </Text>
              {user.role === Role.USER && (
                <Text fontSize="sm" fontWeight="semibold" color="indigo.600">
                  {user.point} ポイント
                </Text>
              )}
              <Text fontSize="sm" color="gray.500">
                最終ログイン: {new Date(user.lastLogin).toLocaleDateString('ja-JP')}
              </Text>
            </Box>
            <Button
              colorScheme="indigo"
              variant="outline"
              size="sm"
              onClick={() => {
                logout?.()
                navigate({ to: '/login' })
              }}
            >
              ログアウト
            </Button>
          </>
        )}
      </VStack>
    </Flex>
  )
}

export default Menu