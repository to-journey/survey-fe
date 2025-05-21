import { useEffect } from 'react'
import {
  Button,
  Container,
  Flex,
  Heading,
  Input,
  Text,
  VStack,
  Box,
} from '@chakra-ui/react'
import { Link, createFileRoute, useLocation, useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { LoginForm } from '@/types/auth'
import { loginSchema } from '@/types/auth'
import { useApp } from '@/providers/app'
import { Role } from '@/types/user'

export const Route = createFileRoute('/login')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const { search } = useLocation()
  const token = new URLSearchParams(search).get('token')
  const { login, user, isLoading } = useApp()
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = (data: LoginForm) => {
    login?.({
      ...data,
      token,
    })
  }

  useEffect(() => {
    if (user) {
      if (user.role === Role.ADMIN) {
        navigate({ to: '/company' })
      } else {
        navigate({ to: '/user' })
      }
    }
  }, [user, navigate])

  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.50">
      <Box
        bg="white"
        p={8}
        rounded="xl"
        shadow="lg"
        w="full"
        maxW="md"
      >
        <VStack spacing={6}>
          <Heading size="lg" color="indigo.600">
            ログイン
          </Heading>
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
            <VStack spacing={4} align="stretch">
              <Box>
                <Text mb={2} fontSize="sm" fontWeight="medium" color="gray.700">
                  メールアドレス
                </Text>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  {...register('email')}
                  size="lg"
                  borderColor={errors.email ? "red.300" : "gray.200"}
                  _hover={{ borderColor: "indigo.300" }}
                  _focus={{ borderColor: "indigo.500", boxShadow: "0 0 0 1px rgb(99, 102, 241)" }}
                />
                {errors.email && (
                  <Text mt={1} fontSize="sm" color="red.500">
                    {errors.email.message}
                  </Text>
                )}
              </Box>
              <Box>
                <Text mb={2} fontSize="sm" fontWeight="medium" color="gray.700">
                  パスワード
                </Text>
                <Input
                  type="password"
                  placeholder="••••••••"
                  {...register('password')}
                  size="lg"
                  borderColor={errors.password ? "red.300" : "gray.200"}
                  _hover={{ borderColor: "indigo.300" }}
                  _focus={{ borderColor: "indigo.500", boxShadow: "0 0 0 1px rgb(99, 102, 241)" }}
                />
                {errors.password && (
                  <Text mt={1} fontSize="sm" color="red.500">
                    {errors.password.message}
                  </Text>
                )}
              </Box>
              <Button
                type="submit"
                colorScheme="indigo"
                size="lg"
                width="full"
                isLoading={isLoading}
                loadingText="ログイン中..."
              >
                ログイン
              </Button>
              <Flex justify="center" pt={4}>
                <Link
                  to="/register"
                  style={{
                    color: 'rgb(79, 70, 229)',
                    textDecoration: 'none',
                    fontWeight: 500,
                  }}
                >
                  アカウントをお持ちでない方はこちら
                </Link>
              </Flex>
            </VStack>
          </form>
        </VStack>
      </Box>
    </Flex>
  )
}