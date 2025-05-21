import { Link, createFileRoute } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Container, Flex, Heading, Input, Text, VStack, Box } from '@chakra-ui/react'
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
            新規登録
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
              <Box>
                <Text mb={2} fontSize="sm" fontWeight="medium" color="gray.700">
                  姓
                </Text>
                <Input
                  type="text"
                  placeholder="山田"
                  {...register('lastName')}
                  size="lg"
                  borderColor={errors.lastName ? "red.300" : "gray.200"}
                  _hover={{ borderColor: "indigo.300" }}
                  _focus={{ borderColor: "indigo.500", boxShadow: "0 0 0 1px rgb(99, 102, 241)" }}
                />
                {errors.lastName && (
                  <Text mt={1} fontSize="sm" color="red.500">
                    {errors.lastName.message}
                  </Text>
                )}
              </Box>
              <Box>
                <Text mb={2} fontSize="sm" fontWeight="medium" color="gray.700">
                  名
                </Text>
                <Input
                  type="text"
                  placeholder="太郎"
                  {...register('firstName')}
                  size="lg"
                  borderColor={errors.firstName ? "red.300" : "gray.200"}
                  _hover={{ borderColor: "indigo.300" }}
                  _focus={{ borderColor: "indigo.500", boxShadow: "0 0 0 1px rgb(99, 102, 241)" }}
                />
                {errors.firstName && (
                  <Text mt={1} fontSize="sm" color="red.500">
                    {errors.firstName.message}
                  </Text>
                )}
              </Box>
              {userAttributions.map((userAttribution: UserAttribution) => (
                <Box key={userAttribution.id}>
                  <Text mb={2} fontSize="sm" fontWeight="medium" color="gray.700">
                    {userAttribution.name}
                  </Text>
                  <Input
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
                    size="lg"
                    borderColor="gray.200"
                    _hover={{ borderColor: "indigo.300" }}
                    _focus={{ borderColor: "indigo.500", boxShadow: "0 0 0 1px rgb(99, 102, 241)" }}
                  />
                </Box>
              ))}
              <Button
                type="submit"
                colorScheme="indigo"
                size="lg"
                width="full"
                isLoading={isLoading}
                loadingText="登録中..."
              >
                新規登録
              </Button>
              <Flex justify="center" pt={4}>
                <Link
                  to="/login"
                  style={{
                    color: 'rgb(79, 70, 229)',
                    textDecoration: 'none',
                    fontWeight: 500,
                  }}
                >
                  すでにアカウントをお持ちの方はこちら
                </Link>
              </Flex>
            </VStack>
          </form>
        </VStack>
      </Box>
    </Flex>
  )
}