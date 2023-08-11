import { prisma, Role } from "@/client/prismaClient";

export type RoleData = Omit<Role, "id">;
export type RoleId = Role["id"];

export async function getRoles() {
  const data = await prisma.role.findMany();
  console.log(data);
  return data;
}

export async function getRoleById(id: RoleId) {
  return await prisma.role.findUnique({ where: { id } });
}

export async function createRole(data: RoleData) {
  return await prisma.role.create({
    data,
  });
}

export const updateRole = async (id: RoleId, data: RoleData) => {
  return await prisma.role.update({
    where: {
      id,
    },
    data,
  });
};

export const deleteRole = async (id: RoleId) => {
  return await prisma.role.delete({
    where: {
      id,
    },
  });
};
