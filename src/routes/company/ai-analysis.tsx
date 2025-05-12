import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/company/ai-analysis')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/company/ai-analysis"!</div>
}
