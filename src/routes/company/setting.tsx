import { useEffect, useState } from 'react'
import { Button, Container, Heading, Input, Text, VStack } from '@chakra-ui/react'
import { createFileRoute } from '@tanstack/react-router'
import useSetting from '@/hooks/useSetting'

export const Route = createFileRoute('/company/setting')({
  component: RouteComponent,
})

function RouteComponent() {
  const { setting: rewardPoints, update: updateRewardPoints, isUpdating: isUpdatingRewardPoints } = useSetting('reward_points')
  const { setting: cutPoints, update: updateCutPoints, isUpdating: isUpdatingCutPoints } = useSetting('cut_points')

  const [rewardPointsValue, setRewardPointsValue] = useState<string>()
  const [cutPointsValue, setCutPointsValue] = useState<string>()

  useEffect(() => {
    if (typeof rewardPointsValue === 'undefined' && rewardPoints?.value) {
      setRewardPointsValue(rewardPoints?.value)
    }
  }, [rewardPoints])

  useEffect(() => {
    if (typeof cutPointsValue === 'undefined' && cutPoints?.value) {
      setCutPointsValue(cutPoints?.value)
    }
  }, [cutPoints])

  return (
    <Container maxW="container.xl" py={10}>
      <Heading mb={4}>設定</Heading>
      <VStack align="start" gap={4}>
        <VStack align="start">
          <Text>報酬ポイント</Text>
          <Input
            type="number"
            value={rewardPointsValue}
            onChange={(e) => setRewardPointsValue(e.target.value)}
          />
          <Button loading={isUpdatingRewardPoints} onClick={() => rewardPointsValue && updateRewardPoints(rewardPointsValue)}>
            更新
          </Button>
        </VStack>
        <VStack align="start">
          <Text>ポイント削減量</Text>
          <Input
            type="number"
            value={cutPointsValue}
            onChange={(e) => setCutPointsValue(e.target.value)}
          />
          <Button loading={isUpdatingCutPoints} onClick={() => cutPointsValue && updateCutPoints(cutPointsValue)}>
            更新
          </Button>
        </VStack>
      </VStack>
    </Container>
  )
}
