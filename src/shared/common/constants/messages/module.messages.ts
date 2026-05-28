export const ModuleMessages = {
  CREATED: 'Module created successfully',
  UPDATED: 'Module updated successfully',
  DELETED: 'Module deleted successfully',
  FETCHED: 'Module fetched successfully',
  FETCHED_ALL: 'Modules fetched successfully',
  HISTORY_FETCHED: 'Module history fetched successfully',
  HISTORY_NOT_FETCHED: 'No module history available for the provided ID',
  NOT_FOUND: 'Module not found',
  ALREADY_EXISTS: 'Module with this name already exists',
  DOES_NOT_EXIST: 'The provided moduleId does not exist',
  STATUS_UPDATED: 'Module status updated successfully',
  FAILED_TO_CREATE: 'Failed to create module',
  FAILED_TO_UPDATE: 'Failed to update module',
  FAILED_TO_DELETE: 'Failed to delete module',
  FAILED_TO_FETCH: 'Failed to fetch module',
  FAILED_TO_FETCH_ALL: 'Failed to fetch modules',
  FAILED_TO_UPDATE_STATUS: 'Failed to update module status',
  MODULE_ID_DO_NOT_EXIST: 'Module with the provided ID does not exist',
} as const;

export const ModuleDynamicMessages = {
  /**
   * Generate a message for module feature count
   * @param count - Number of features in module
   * @example moduleFeatureCount(5) => "Module has 5 features"
   */
  moduleFeatureCount: (count: number) =>
    `Module has ${count} feature${count !== 1 ? 's' : ''}`,

  /**
   * Generate a message for module activation
   * @param moduleName - Name of the module
   * @example moduleActivated('Billing') => "Billing module activated"
   */
  moduleActivated: (moduleName: string) => `${moduleName} module activated`,

  /**
   * Generate a message for module deactivation
   * @param moduleName - Name of the module
   * @example moduleDeactivated('Billing') => "Billing module deactivated"
   */
  moduleDeactivated: (moduleName: string) => `${moduleName} module deactivated`,
};
