export const RoleMessages = {
  CREATED: 'Role created successfully',
  UPDATED: 'Role updated successfully',
  DELETED: 'Role deleted successfully',
  FETCHED: 'Role fetched successfully',
  FETCHED_ALL: 'Roles fetched successfully',
  NOT_FOUND: 'Role not found',
  ALREADY_EXISTS: 'Role with this name already exists',
  PERMISSION_GRANTED: 'Permission granted successfully',
  PERMISSION_REVOKED: 'Permission revoked successfully',
  FAILED_TO_CREATE: 'Failed to create role',
  FAILED_TO_UPDATE: 'Failed to update role',
  FAILED_TO_DELETE: 'Failed to delete role',
} as const;

export const RoleDynamicMessages = {
  /**
   * Generate a message for role assignment
   * @param roleName - Name of the role
   * @param userName - Name of the user
   * @example roleAssigned('Admin', 'John') => "Admin role assigned to John"
   */
  roleAssigned: (roleName: string, userName: string) =>
    `${roleName} role assigned to ${userName}`,

  /**
   * Generate a message for role permission count
   * @param count - Number of permissions
   * @example rolePermissionCount(5) => "Role has 5 permissions"
   */
  rolePermissionCount: (count: number) =>
    `Role has ${count} permission${count !== 1 ? 's' : ''}`,
};
