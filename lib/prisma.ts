// Prisma client mock - database integration removed for demo
// This prevents build-time initialization errors
// In production, configure with DATABASE_URL

export const prisma = {
    user: {
        findUnique: async () => null,
        create: async (data: any) => ({ id: 'mock', ...data }),
        findMany: async () => [],
    },
    debate: {
        findUnique: async () => null,
        findMany: async () => [],
        create: async (data: any) => ({ id: 'mock', ...data }),
        update: async (data: any) => ({ id: 'mock' }),
    },
    argument: {
        create: async (data: any) => ({ id: 'mock', ...data }),
        findMany: async () => [],
    },
};
