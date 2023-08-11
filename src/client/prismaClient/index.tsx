import {
  PrismaClient,
  User,
  Role,
  RoleUser,
  PrismaPromise,
} from "@prisma/client";

export const prisma = new PrismaClient();

export type { User, Role, RoleUser };
