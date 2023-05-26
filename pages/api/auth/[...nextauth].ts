import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { compare } from 'bcrypt'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prismadb from '@/lib/prismadb'

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    // 自定义一个 Credentials 提供者实例用于邮箱密码登录方式
    Credentials({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      // 定义身份验证的授权函数，成功后返回用户对象
      async authorize(credentials) {
        // 如果没有 email 或 password 直接报错
        if (!credentials?.email || !credentials?.password)
          throw new Error('Email and password required')

        // 根据 email 找到 用户
        const user = await prismadb.user.findUnique({
          where: {
            email: credentials.email,
          },
        })
        // 如果找不到用户或者密码不存在，则说明用户不存在
        if (!user || !user.hashedPassword)
          throw new Error('Email does not exist')
        // 比较密码是否正确
        const isCorrectPassword = await compare(
          credentials.password, user.hashedPassword,
        )
        // 不正确就报错
        if (!isCorrectPassword)
          throw new Error('Incorrect password')

        return user
      },
    }),
  ],
  // 指定自定义登录路由
  pages: {
    signIn: '/auth',
  },
  // 开发环境启用调试模式
  debug: process.env.NODE_ENV === 'development',
  adapter: PrismaAdapter(prismadb),
  // 配置会话策略为 jwt/database
  session: {
    strategy: 'jwt',
  },
  // 配置 jwt 密钥
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  // 设置 cookie 密钥
  secret: process.env.NEXTAUTH_SECRET,
})
