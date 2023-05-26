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