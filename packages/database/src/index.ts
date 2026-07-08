import { PrismaClient } from '@prisma/client';

export * from '@prisma/client';

// Padrão Singleton para evitar múltiplas conexões em ambiente de desenvolvimento
declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}
