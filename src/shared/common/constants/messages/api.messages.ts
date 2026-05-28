/**
 * API Management Response Messages
 */

export const ApiMessages = {
  CREATED: 'API created successfully',
  UPDATED: 'API updated successfully',
  DELETED: 'API deleted successfully',
  FETCHED: 'API fetched successfully',
  FETCHED_ALL: 'APIs fetched successfully',
  NOT_FOUND: 'API not found',
  ALREADY_EXISTS: 'API with same URL and method already exists',
  STATUS_UPDATED: 'API status updated successfully',
  FAILED_TO_CREATE: 'Failed to create API',
  FAILED_TO_UPDATE: 'Failed to update API',
  FAILED_TO_DELETE: 'Failed to delete API',
  FAILED_TO_FETCH: 'Failed to fetch API',
  FAILED_TO_FETCH_ALL: 'Failed to fetch APIs',
  FAILED_TO_UPDATE_STATUS: 'Failed to update API status',
} as const;

export const ApiDynamicMessages = {
  /**
   * Generate a message for API version update
   * @param version - New version number
   * @example apiVersionUpdated('v2.0') => "API updated to version v2.0"
   */
  apiVersionUpdated: (version: string) => `API updated to version ${version}`,

  /**
   * Generate a message for API count
   * @param count - Number of APIs
   * @example apiCount(15) => "15 APIs found"
   */
  apiCount: (count: number) => `${count} API${count !== 1 ? 's' : ''} found`,

  /**
   * Generate a message for duplicate API with URL and method
   * @param url - API URL
   * @param method - HTTP method
   * @example apiAlreadyExists('/api/users', 'POST') => "API with URL '/api/users' and method 'POST' already exists"
   */
  apiAlreadyExists: (url: string, method: string) =>
    `API with URL '${url}' and method '${method}' already exists`,
};
