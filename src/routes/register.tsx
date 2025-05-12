import { createFileRoute } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Container, Flex, Heading, Input, Text, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import type { RegisterForm } from '@/types/auth'
import type { UserAttribution } from '@/types/user-attribution'
import { registerSchema } from '@/types/auth'
import { useApp } from '@/providers/app'
import useUserAttributions from '@/hooks/useUserAttributions'

export const Route = createFileRoute('/register')({
  component: RouteComponent,
})

function RouteComponent() {
  const { register: registerMutation, isLoading } = useApp()
  const { userAttributions } = useUserAttributions()
  const [attributions, setAttributions] = useState<Array<{ key: string, value: string }>>([])
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = (data: RegisterForm) => {
    registerMutation?.({ ...data, attributions })
  }

  return (
    <Container maxW="container.xl" py={8}>
      <Heading size="lg" mb={6}>
        新規登録
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
          <Flex direction="column" gap={2}>
            <Input
              w="320px"
              type="text"
              placeholder="名"
              {...register('firstName')}
            />
            {errors.firstName && <Text color="red">{errors.firstName.message}</Text>}
          </Flex>
          <Flex direction="column" gap={2}>
            <Input
              w="320px"
              type="text"
              placeholder="姓"
              {...register('lastName')}
            />
            {errors.lastName && <Text color="red">{errors.lastName.message}</Text>}
          </Flex>
          {userAttributions.map((userAttribution: UserAttribution) => {
            return (
              <Flex key={userAttribution.id} direction="column" gap={2}>
                <Input
                  w="320px"
                  type="text"
                  placeholder={userAttribution.name}
                  value={attributions.find((a) => a.key === userAttribution.name)?.value || ''}
                  onChange={(e) => {
                    if (!attributions.some((a) => a.key === userAttribution.name)) {
                      setAttributions([...attributions, { key: userAttribution.name, value: e.target.value }])
                    } else {
                      setAttributions(attributions.map((a) => a.key === userAttribution.name ? { ...a, value: e.target.value } : a))
                    }
                  }}
                />
              </Flex>
            )
          })}
          <Button type="submit" loading={isLoading}>新規登録</Button>
        </VStack>
      </form>
    </Container>
  )
}
