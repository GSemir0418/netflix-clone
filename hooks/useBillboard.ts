import useSWR from 'swr'
import fetcher from '@/lib/fetcher'

function useBillboard() {
  const { data, error, isLoading } = useSWR('/api/random', fetcher, {
    // only revalidate once
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })
  return {
    data,
    error,
    isLoading,
  }
}
export default useBillboard
