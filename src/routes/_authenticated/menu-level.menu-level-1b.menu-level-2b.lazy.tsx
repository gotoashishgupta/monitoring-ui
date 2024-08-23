import { createLazyFileRoute } from '@tanstack/react-router'

function About() {
  return <div className="p-2">Hello from /menu-level/menu-level-1b/menu-level-2b!</div>
}

export const Route = createLazyFileRoute('/_authenticated/menu-level/menu-level-1b/menu-level-2b')({
  component: About,
})
