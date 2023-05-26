import { PrismaClient } from '@prisma/client'

// 避免在开发环境热加载情况下出现多次创建 prismaclient 实例的问题
// global 对象不受热加载影响
const client = global.prismadb || new PrismaClient()
if (process.env.NODE_ENV === 'production')
  global.prismadb = client

export default client
