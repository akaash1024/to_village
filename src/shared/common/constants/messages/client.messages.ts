/**
 * Client Management Response Messages
 */

export const ClientMessages = {
  CREATED: 'Client created successfully',
  UPDATED: 'Client updated successfully',
  FETCHED: 'Client fetched successfully',
  FETCHED_ALL: 'Clients fetched successfully',
  FOUND: 'Client found successfully',
  NOT_FOUND: 'Client not found',

  CLIENT_USER_NOT_FOUND: 'Client user not found',
  STATUS_UPDATED: 'Client status updated successfully',

  FAILED_TO_CREATE: 'Failed to create client',
  FAILED_TO_UPDATE: 'Failed to update client',
  FAILED_TO_FETCH: 'Failed to fetch client',

  CLIENT_USER_CREATED: 'Client user created successfully',
  CLIENT_USER_UPDATED: 'Client user updated successfully',
  CLIENT_USER_FETCHED: 'Client user fetched successfully',

  FAILED_TO_CREATE_CLIENT_USER: 'Failed to create client user',
  FAILED_TO_UPDATE_CLIENT_USER: 'Failed to update client user',

  CLIENT_USER_LOCATION_MAPPING_CREATED:
    'Client User Location Mapping created successfully',
  FAILED_TO_CREATE_CLIENT_USER_LOCATION_MAPPING:
    'Failed to create client user location mapping',

  CLIENT_USER_STATUS_UPDATED: 'Client user status updated successfully',
  FAILED_TO_UPDATE_CLIENT_USER_STATUS: 'Failed to update client user status',

  USERNAME_ALREADY_EXISTS: 'A user with this username already exists.',
  EMAIL_ALREADY_EXISTS: 'A user with this email already exists.',
  USER_OR_EMAIL_EXISTS: 'Username or Email already exist',

  LOCATION_NOT_FOUND: 'Location not found',
  CLIENT_USER_ALREADY_MAPPED: 'Client User already mapped to location',

  CLIENT_USER_LOCATION_MAPPING_DELETED:
    'Client User Location Mapping deleted successfully',

  FAILED_TO_FETCH_CLIENT_USERS: 'Failed to fetch ClientUsers',
  MAPPING_NOT_FOUND: 'Client User Location Mapping not found',

  LOGIN_AGAIN: 'LogIn Again',
  MISSING_CLIENT_CODE: 'Please provide ClientCode/ClientId',

  FAILED_TO_FETCH_CLIENT_USER_LOCATION_MAPPINGS:
    'Failed to fetch Client User Location Mappings',
  FAILED_TO_DELETE_CLIENT_USER_LOCATION_MAPPING:
    'Failed to delete Client User Location Mapping',
  FAILED_TO_FETCH_CLIENT_USER: 'Failed to fetch Client User',
  FAILED_TO_FETCH_CLIENT_USER_HISTORY: 'Failed to fetch Client User History',

  CLIENT_USER_LOCATION_MAPPING_FETCHED:
    'Client User Location Mapping fetched successfully',
  CLIENT_USERS_LIST_FETCHED: 'List of Client Users fetched successfully',
  CLIENT_USERS_HISTORY_FETCHED: 'History of Client Users fetched successfully',

  FAILED_TO_TOGGLE_STATUS: 'Failed to toggle client status',
  PERMISSION_DENIED: 'Permission is denied',
} as const;
