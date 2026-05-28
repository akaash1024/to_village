/**
 * Common Response Messages
 */

export const CommonMessages = {
  SUCCESS: 'Operation completed successfully',
  CREATED: 'Resource created successfully',
  UPDATED: 'Resource updated successfully',
  DELETED: 'Resource deleted successfully',
  FETCHED: 'Data fetched successfully',
  NOT_FOUND: 'Resource not found',
  ALREADY_EXISTS: 'Resource already exists',
  INTERNAL_ERROR: 'Internal server error',
  INVALID_REQUEST: 'Invalid request',
  INVALID_PARAMETER: 'Invalid parameter',
  UNAUTHORIZED: 'Unauthorized access',
  FORBIDDEN: 'Access forbidden',
  BAD_REQUEST: 'Bad request',
  UNEXPECTED_ERROR: 'Unexpected error occurred',
  PATIENTS_NOT_FOUND: 'Patients not found',
  INTEGRATION_NOT_FOUND: 'Integration Not Found',
} as const;

export const CommonDynamicMessages = {
  /**
   * Generate a message for item count
   * @param count - Number of items
   * @example itemsFound(5) => "Found 5 items"
   */
  itemsFound: (count: number) => `Found ${count} item${count !== 1 ? 's' : ''}`,

  /**
   * Generate a message for resource by name
   * @param resourceName - Name of the resource
   * @example resourceNotFound('User') => "User not found"
   */
  resourceNotFound: (resourceName: string) => `${resourceName} not found`,

  /**
   * Generate a message for resource creation by name
   * @param resourceName - Name of the resource
   * @example resourceCreated('User') => "User created successfully"
   */
  resourceCreated: (resourceName: string) =>
    `${resourceName} created successfully`,
};
