import { useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

export default function NotFound() {
  const navigate = useNavigate()

  useEffect(() => {
    const id = setTimeout(() => {
      navigate({ to: '/' })
    }, 1500)

    return () => clearTimeout(id)
  }, [])

  return <div>Page not found. Redirecting…</div>
}
