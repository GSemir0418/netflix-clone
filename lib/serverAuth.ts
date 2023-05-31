import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import prismadb from '@/lib/prismadb'
import { authOptions } from '@/pages/api/auth/[...nextauth]'

async function serverAuth(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)

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
