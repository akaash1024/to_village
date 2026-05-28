/**
 * Feature Management Response Messages
 */

export const FeatureMessages = {
  CREATED: 'Feature created successfully',
  UPDATED: 'Feature updated successfully',
  DELETED: 'Feature deleted successfully',
  FETCHED: 'Feature fetched successfully',
  FETCHED_ALL: 'Features fetched successfully',
  FEATURE_HISTORY_FETCHED: 'Feature history fetched successfully',
  NOT_FOUND: 'Feature not found',
  ALREADY_EXISTS: 'Feature with this name already exists',
  DOES_NOT_EXIST: 'Feature with the provided ID does not exist',
  STATUS_UPDATED: 'Feature status updated successfully',
  FAILED_TO_CREATE: 'Failed to create feature',
  FAILED_TO_UPDATE: 'Failed to update feature',
  FAILED_TO_DELETE: 'Failed to delete feature',
  FAILED_TO_FETCH: 'Failed to fetch feature',
  FAILED_TO_FETCH_ALL: 'Failed to fetch features',
  FAILED_TO_UPDATE_STATUS: 'Failed to update feature status',
} as const;

export const FeatureDynamicMessages = {
  /**
   * Generate a message for feature API count
   * @param count - Number of APIs in feature
   * @example featureApiCount(3) => "Feature has 3 APIs"
   */
  featureApiCount: (count: number) =>
    `Feature has ${count} API${count !== 1 ? 's' : ''}`,

  /**
   * Generate a message for feature permission update
   * @param permission - Permission type
   * @example featurePermissionGranted('view') => "View permission granted for feature"
   */
  featurePermissionGranted: (permission: string) =>
    `${permission.charAt(0).toUpperCase() + permission.slice(1)} permission granted for feature`,
};
