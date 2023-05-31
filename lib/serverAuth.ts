import type { NextApiRequest } from 'next'
import { getSession } from 'next-auth/react'
import prismadb from '@/lib/prismadb'

async function serverAuth(req: NextApiRequest) {
  const session = await getSession({ req })

  // session be like {
  //   user: { name: 'test', email: 'test@gmail.com', image: '' },
  //   expires: '2023-06-28T05:11:30.563Z'
  // }
  if (!session?.user?.email)
    throw new Error('Not signed in')

  const currentUser = await prismadb.user.findUnique({
    where: {
      email: session.user.email,
    },
  })

  if (!currentUser)
    throw new Error('Not signed in')

  return { currentUser }
}
export default serverAuth
