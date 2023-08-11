export const USERS = {
  index: "/users",
  item: (id: number) => `/users/${id}`,
  create: `/users/create`,
} as const;

export const ROLES = {
  index: "/roles",
  item: (id: number) => `/roles/${id}`,
  create: `/roles/create`,
} as const;
