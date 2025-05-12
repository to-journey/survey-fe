import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/user/survey/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/user/survey/$id"!</div>
}
