import { useSearchParams } from 'react-router-dom'

export default function useQueryParms() {
  const [searchParams] = useSearchParams()

  return Object.fromEntries([...searchParams])
}
