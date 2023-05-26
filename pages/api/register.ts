import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'
import prismadb from '@/lib/prismadb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // 首先校验请求方法
  if (req.method !== 'POST')
    return res.status(405).end()

  try {
    const { email, name, password } = req.body
    // 检查 email 校验 user 是否存在
    const existingUser = await prismadb.user.findUnique({
      where: { email },
    })
    if (existingUser)
      return res.status(422).json({ error: 'Email taken' })

    // 保存数据
    const hashedPassword = await bcrypt.hash(password, 12)
    const user = await prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: '',
        emailVerified: new Date(),
      },
    })
    // 成功后返回 200 + user
    return res.status(200).json(user)
  }
  // 其他一律错误都作为 400
  catch (error) {
    return res.status(400).end()
  }
}
