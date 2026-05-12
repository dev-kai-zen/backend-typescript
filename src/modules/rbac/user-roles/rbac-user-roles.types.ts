/**
 * Plain shape from `RbacUserRole.findAll({ include: role })` + `toJSON()`.
 * Role fields stay nested under `role` unless you remap them flat.
 */
export type UserRolesWithRoleDetails = {
  id: number;
  user_id: number;
  role_id: number;
  assigned_by: number;
  role: {
    role_name: string;
    role_description: string | null;
  };
};