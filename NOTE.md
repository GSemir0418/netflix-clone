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

npx prisma db push 同步数据库 记得将ip加入至mongodb

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

### 实现 Google 与 Github 登录

npm i react-icons 安装图标库

env中添加 GITHUB_ID= GITHUB_SECRET= GOOGLE_CLIENT_ID= GOOGLE_CLIENT_SECRET=

在NextAuth的 providers 添加Github和Google的provider

安装 nextauth 和 prisma 的适配器，以便于next的登陆业务自动访问数据库
npm i @next-auth/prisma-adapter
在 nextauth 中配置这个 adapter

- 实现github登录
1. Settings -> Developer settings -> OAuth Apps -> Register a new application
2. name: 'netflix-clone'
Homepage URL: 'http://localhost:3000' // 生产环境会改成别的
Authorization callback URL: 'http://localhost:3000'
3. 将生成的 Client ID 和 Client Secret 复制到 env 中

- 实现google登录
1. google 搜索 google developer console
2. 创建项目
名称: 'netflix-clone'
3. 搜索栏搜索 api -> api service -> OAuth consent screen
4. External ✅ -> create
name: 'netflix-clone' , email *2
5. 一路 continue -> done
6. Credentials -> 点上面的 create credentials -> OAuth Client ID
type 选择 web application name不管 然后 ADD Authorized redirect URIS
'http://localhost:3000/api/auth/callback/google'
7. 复制生成好的 id 和 secret 即可

# Protecting Routes & Profiles Page

创建 lib/serverAuth.ts 工具函数，接收带有 jwt 的 req，返回当前登录用户

编写 api/current，利用 serverAuth 获取当前登录用户

创建 lib/fetcher 工具函数，封装 axios 请求，用于 swr

创建 hooks/useCurrentUser，使用 swr 缓存并自动更新 currentUser
npm i swr 

路由守卫:
1. pages/index.tsx 编写 getServerSideProps 获取服务端数据
2. 注意不可以使用我们写的 lib/serverAuth 获取当前用户，因为那是客户端的逻辑，而现在需要写的是服务端的逻辑
3. 使用 next-auth/react 提供的 getSession 方法，将 context 参数传入，判断 session 数据是否存在，如果不存在则重定向至登录页
4. 记得最后 return 空的 props 即可
5. 在 homepage 中写一个退出登录的方法，测试是否重定向成功

profile page:
1. 需求：登陆成功后在主页显示用户个人信息，单击进入浏览页面（暂未开发）
2. 使用 useCurrentUser Hook 获取当前用户数据