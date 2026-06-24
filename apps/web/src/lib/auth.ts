export const roles = ["admin", "operator", "customer"] as const;

export type Role = (typeof roles)[number];

const roleScore: Record<Role, number> = {
  admin: 3,
  operator: 2,
  customer: 1,
};

export const isRole = (value: string): value is Role =>
  roles.includes(value as Role);

export const canAccessRole = (role: Role, minimum: Role): boolean =>
  roleScore[role] >= roleScore[minimum];
