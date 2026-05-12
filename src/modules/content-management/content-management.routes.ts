import { Router } from "express";

import { asaAreasRoutes } from "./asa-areas/asa-areas.routes";
import { asaBranchTypeRoutes } from "./asa-branch-type/asa-branch-type.routes";
import { asaBranchesRoutes } from "./asa-branches/asa-branches.routes";
import { asaDivisionsRoutes } from "./asa-divisions/asa-divisions.routes";
import { asaOperationsRoutes } from "./asa-operations/asa-operations.routes";
import { asaRegionsRoutes } from "./asa-regions/asa-regions.routes";

export const contentManagementRoutes = Router();

contentManagementRoutes.use("/asa-areas", asaAreasRoutes);
contentManagementRoutes.use("/asa-branch-types", asaBranchTypeRoutes);
contentManagementRoutes.use("/asa-branches", asaBranchesRoutes);
contentManagementRoutes.use("/asa-divisions", asaDivisionsRoutes);
contentManagementRoutes.use("/asa-operations", asaOperationsRoutes);
contentManagementRoutes.use("/asa-regions", asaRegionsRoutes);
