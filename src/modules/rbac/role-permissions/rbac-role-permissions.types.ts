export type RolePermissionsWithPermissionDetails = {
    id: number;
    role_id: number;
    permission_id: number;
    permission: {
        permission_code: string;
    };
};