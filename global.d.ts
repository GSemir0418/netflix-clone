import { PrismaClient } from "@prisma/client";

// 解决 global.prismadb 的 TS 报错
declare global {
  namespace globalThis {
    var prismadb: PrismaClient
  }
}