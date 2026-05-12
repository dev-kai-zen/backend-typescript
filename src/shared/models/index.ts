/**
 * Central Sequelize model registry (same idea as wellness-and-safety-be `shared/models/index.js`).
 * Import once at process startup — before `sequelize.authenticate()` — so every `Model.init`
 * and association runs in a stable order without scattering side-effect imports in `index.ts`.
 */
import { sequelize } from "../../config/sequelize-config";

import { User } from "../../modules/users/users.model";
import { RefreshToken } from "../../modules/refresh-token/refresh-token.model";
import { AuditLog } from "../../modules/audit-logs/audit-logs.model";
import { UserLog } from "../../modules/user-logs/user-logs.model";
import { Role } from "../../modules/rbac/roles/rbac-roles.model";
import { RbacGroup } from "../../modules/rbac/groups/rbac-groups.model";
import { RbacPermission } from "../../modules/rbac/permissions/rbac-permissions.model";
import { RbacRolePermission } from "../../modules/rbac/role-permissions/rbac-role-permissions.model";
import { RbacUserRole } from "../../modules/rbac/user-roles/rbac-user-roles.model";
import { AsaOperation } from "../../modules/content-management/asa-operations/asa-operations.model";
import { AsaDivision } from "../../modules/content-management/asa-divisions/asa-divisions.model";
import { AsaRegion } from "../../modules/content-management/asa-regions/asa-regions.model";
import { AsaArea } from "../../modules/content-management/asa-areas/asa-areas.model";
import { AsaBranchType } from "../../modules/content-management/asa-branch-type/asa-branch-type.model";
import { AsaBranch } from "../../modules/content-management/asa-branches/asa-branches.model";

export const models = {
  User,
  RefreshToken,
  AuditLog,
  UserLog,
  Role,
  RbacGroup,
  RbacPermission,
  RbacRolePermission,
  RbacUserRole,
  AsaOperation,
  AsaDivision,
  AsaRegion,
  AsaArea,
  AsaBranchType,
  AsaBranch,
} as const;

export type AppModels = typeof models;

export { sequelize };
