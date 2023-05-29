import type { NextPageContext } from 'next'
import { getSession, signOut } from 'next-auth/react'
import useCurrentUser from '@/hooks/useCurrentUser'
import Navbar from '@/components/Navbar'

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    }
  }
  // 记得 return props
  return {
    props: {},
  }
}
export default function Home() {
  const { data: user } = useCurrentUser()

  return (
    <>
      <Navbar />
      <div className="text-2xl text-sky-500">Hello Netflix</div>
      <p className='text-white'>Logged in as : {user?.name}</p>
      <button onClick={() => { signOut() }} className="h-10 w-full bg-white">sign out</button>
    </>
  )
}
