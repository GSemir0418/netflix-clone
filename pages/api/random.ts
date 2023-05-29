import type { NextApiRequest, NextApiResponse } from 'next'
import serverAuth from '@/lib/serverAuth'
import prismadb from '@/lib/prismadb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET')
    res.status(405).end()

  try {
    // 仅利用 serverAuth 鉴定权限
    await serverAuth(req)

    // 获取全部电影数据条数
    const movieCount = await prismadb.movie.count()
    // 根据总条数，生成 [0, 总条数) 区间内的随机索引
    const randomIndex = Math.floor(Math.random() * movieCount)

    // 利用 findMany 方法的 skip 配置项，实现随机跳过若干条数据，取其中一条数据
    // take 与 skip 一般应用于 分页 需求
    const randomMovies = await prismadb.movie.findMany({
      take: 1,
      skip: randomIndex,
    })

    return res.status(200).json(randomMovies[0])
  }
  catch (error) {
    console.error(error)
    return res.status(400).end()
  }
}
