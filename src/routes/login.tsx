import { useEffect } from 'react'
import {
  Button,
  Container,
  Flex,
  Heading,
  Input,
  Text,
  VStack,
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
    <Container maxW="container.xl" py={8}>
      <Heading size="lg" mb={6}>
        ログイン
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack gap={4}>
          <Flex direction="column" gap={2}>
            <Input
              w="320px"
              type="email"
              placeholder="メールアドレス"
              {...register('email')}
            />
            {errors.email && <Text color="red">{errors.email.message}</Text>}
          </Flex>
          <Flex direction="column" gap={2}>
            <Input
              w="320px"
              type="password"
              placeholder="パスワード"
              {...register('password')}
            />
            {errors.password && <Text color="red">{errors.password.message}</Text>}
          </Flex>
          <Button type="submit" loading={isLoading}>ログイン</Button>
          <Link to="/register">新規登録</Link>
        </VStack>
      </form>
    </Container>
  )
}
