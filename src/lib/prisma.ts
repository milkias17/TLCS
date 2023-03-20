import { PrismaClient, UserRole } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

prisma.$use(async (params, next) => {
  if (params.action !== "create" || params.model !== "User") {
    return await next(params);
  }

  const result = await next(params);

  const student = await prisma.student.findUnique({
    where: {
      user_id: result.user_id,
    },
  });

  if (student) {
    return result;
  }

  switch (result.role) {
    case UserRole.STUDENT:
      await prisma.student.create({
        data: {
          user_id: result.user_id,
          batch: params.args.data.batch,
          dept: params.args.data.department,
          college: params.args.data.college,
        },
      });
      break;
  }

  return result;
});

export default prisma;
