import useSWR from 'swr'
import fetcher from '@/lib/fetcher'

function useMovieList() {
  const { data, error, isLoading } = useSWR('/api/movies', fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateIfStale: false,
  })
  return { data, error, isLoading }
}
export default useMovieList
