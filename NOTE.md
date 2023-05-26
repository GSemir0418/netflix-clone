# 1 初始化
`npx create-next-app --typescript --tailwind`
删除不需要的文件及代码
配置 Tailwind CSS 
global.css 中引入基础样式
安装 Tailwind CSS 插件 bradlc.vscode-tailwindcss

# 2 Auth 页面 （登录？）
无论是传统的用户名密码登录、注册、还是OAuth第三方登录、亦或是鉴权，在 Nextjs 中这里均抽象为 Auth 逻辑


- Tailwind 响应式
sm >640
md >768
lg >1024
xl >1280
2xl  >1536
- peer
- 负值

## Setup Prisma MongoDB
npm install -D prisma
npx prisma init 创建prisma初始文件及env文件
npm install @prisma/client 安装数据库交互工具
lib/prismadb.ts
安装vscode插件 Prisma `Prisma.prisma`
google mongodb atlas
https://www.mongodb.com/cloud/atlas/register
创建cluster
创建用户
ip地址
connect 选择 vscode
url复制到env的DATABASE_URL，替换password，后面加上数据库名
mongodb+srv://gsemir0418:gsqzs123@cluster-netflix-clone.tnttogg.mongodb.net/test

写model schema
id String @id @default(auto()) @map("_id") @db.ObjectId
@id 表示该字段是模型的主键
@map("_id") 表示数据库中的列名（mongodb中默认主键名称为_id）
@db.ObjectId 表示在数据库中的数据类型为 ObjectId

npx prisma db push 同步数据库

## Setup NextAuth
npm install next-auth 
npm install bcrypt @types/bcrypt

创建 api/auth/[...nextauth].ts

providers是一个数组，其概念就是验证用户身份的不同方式，例如用户名/密码、Github登录、Google登录等，每个provider(提供者)就相当于一个独立的身份验证服务
### 实现邮箱密码注册登录逻辑
npm i axios
auth.tsx 利用axios发送登录的post请求
在api/register.ts文件中写登录逻辑
注册逻辑：
1. 首先限制请求方法，需为 POST，否则返回 405
2. try catch
3. 检查用户是否存在，存在则返回 422
4. 使用 create 创建数据，成功返回 200
5. 其他错误统一在 catch 中返回 400

- 利用 next-auth/react 提供的 signIn 实现登录
- 使用自定义Credentials完成登录校验

使用 router.push 完成登陆成功后路由跳转
或者自动重定向
