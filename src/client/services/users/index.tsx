import { prisma, User, Role } from "@/client/prismaClient";

export type UserId = User["id"];
export type RoleId = Role["id"];
export type UserData = Omit<User, "id" | "createdAt" | "updatedAt"> & {
  roles: RoleId[];
};

export async function getUsers() {
  const data = await prisma.user.findMany({
    include: {
      roles: {
        select: {
          role: true,
        },
      },
    },
  });

  return data.map((user) => ({
    ...user,
    roles: user.roles.map((role) => role.role),
  }));
}

export async function getUserById(id: UserId) {
  const data = await prisma.user.findUnique({
    where: { id },
    include: {
      roles: {
        select: {
          role: true,
        },
      },
    },
  });

  return {
    ...data,
    roles: data?.roles.map((role) => role.role),
  };
}

export async function createUser(data: UserData) {
  console.log(
    data.roles.map((id) => ({
      id,
    }))
  );

  return await prisma.user.create({
    data: {
      ...data,

      roles: {
        create: {
          roleId: data.roles[0],
        },
      },
    },
  });
}

export async function updateUser(id: UserId, data: UserData) {
  await prisma.user.update({
    data: {
      roles: {
        deleteMany: {},
      },
    },
    where: { id },
  });

  return await prisma.user.update({
    data: {
      ...data,

      roles: {
        create: {
          roleId: data.roles[0],
        },
      },
    },
    where: { id },
  });
}

export async function deleteUser(id: UserId) {
  await prisma.user.update({
    data: {
      roles: {
        deleteMany: {},
      },
    },
    where: { id },
  });
  return await prisma.user.delete({ where: { id } });
}
