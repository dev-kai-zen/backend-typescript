/**
 * RBAC Sequelize models — imported only from this module's `models.register.js`.
 * Order: category → role → permission → role_permission → user_role.
 */
import { RbacCategory } from "./categories/rbac-categories.model";
import { RbacPermission} from "./permissions/rbac-permissions.model";
import { RbacRolePermission } from "./role-permissions/rbac-role-permissions.model";
import { RbacRole } from "./roles/rbac-roles.model";
import { RbacUserRole } from "./user-roles/rbac-user-roles.model";

export const ContentManagementModels = {
    RbacCategory,
    RbacPermission,
    RbacRolePermission,
    RbacRole,
    RbacUserRole
};