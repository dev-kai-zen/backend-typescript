/**
 * RBAC Sequelize models — imported only from this module's `models.register.js`.
 * Order: category → role → permission → role_permission → user_role.
 */
import { AsaArea } from "./asa-areas/asa-areas.model.js";
import { AsaBranchType } from "./asa-branch-type/asa-branch-type.model.js";
import { AsaBranch } from "./asa-branches/asa-branches.model.js";
import { AsaDivision } from "./asa-divisions/asa-divisions.model.js";
import { AsaOperation } from "./asa-operations/asa-operations.model.js";
import { AsaRegion } from "./asa-regions/asa-regions.model.js";

export const ContentManagementModels = {
  AsaArea,
  AsaBranchType,
  AsaBranch,
  AsaDivision,
  AsaOperation,
  AsaRegion,
};