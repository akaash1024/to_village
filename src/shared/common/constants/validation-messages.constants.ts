/**
 * Centralized Validation Messages
 * All validation error messages should be defined here
 */

export const VALIDATION_MESSAGES = {
  REQUIRED: (field: string) => `${field} is required`,
  INVALID: (field: string) => `${field} is invalid`,
  TOO_SHORT: (field: string, min: number) =>
    `${field} must be at least ${min} characters long`,
  TOO_LONG: (field: string, max: number) =>
    `${field} must be at most ${max} characters long`,
  MIN_VALUE: (field: string, min: number) => `${field} must be at least ${min}`,
  MAX_VALUE: (field: string, max: number) => `${field} must be at most ${max}`,
  MUST_BE_NUMBER: (field: string) => `${field} must be a number`,
  MUST_BE_STRING: (field: string) => `${field} must be a string`,
  MUST_BE_BOOLEAN: (field: string) => `${field} must be a boolean`,
  MUST_BE_ARRAY: (field: string) => `${field} must be an array`,
  MUST_BE_OBJECT: (field: string) => `${field} must be an object`,
  MUST_BE_DATE: (field: string) => `${field} must be a valid date`,
  MUST_BE_EMAIL: (field: string) => `${field} must be a valid email address`,
  MUST_BE_URL: (field: string) => `${field} must be a valid URL`,
  MUST_BE_UUID: (field: string) => `${field} must be a valid UUID`,
  MUST_BE_POSITIVE: (field: string) => `${field} must be a positive number`,
  MUST_BE_INTEGER: (field: string) => `${field} must be an integer`,
  NOT_EMPTY: (field: string) => `${field} cannot be empty`,
  INVALID_FORMAT: (field: string) => `${field} has an invalid format`,
  INVALID_ENUM: (field: string, values: string[]) =>
    `${field} must be one of: ${values.join(', ')}`,
  ARRAY_MIN_SIZE: (field: string, min: number) =>
    `${field} must contain at least ${min} items`,
  ARRAY_MAX_SIZE: (field: string, max: number) =>
    `${field} must contain at most ${max} items`,

  // Authentication validation messages
  AUTH: {
    EMAIL_REQUIRED: 'Email is required',
    EMAIL_INVALID: 'Email must be a valid email address',
    PASSWORD_REQUIRED: 'Password is required',
    PASSWORD_TOO_SHORT: (min: number) =>
      `Password must be at least ${min} characters long`,
    PASSWORD_TOO_WEAK:
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    CONFIRM_PASSWORD_REQUIRED: 'Confirm password is required',
    PASSWORDS_DO_NOT_MATCH: 'Passwords do not match',
    OLD_PASSWORD_REQUIRED: 'Old password is required',
    NEW_PASSWORD_REQUIRED: 'New password is required',
    TOKEN_REQUIRED: 'Token is required',
    TOKEN_INVALID: 'Token is invalid',
  },

  // API validation messages
  API: {
    NAME_REQUIRED: 'API name is required',
    NAME_TOO_SHORT: (min: number) =>
      `API name must be at least ${min} characters long`,
    NAME_TOO_LONG: (max: number) =>
      `API name must be at most ${max} characters long`,
    URL_REQUIRED: 'API URL is required',
    URL_INVALID: 'API URL must be a valid URL',
    URL_INVALID_FORMAT:
      'API URL must start with / and contain only valid characters (alphanumeric, /, _, -, {}, :)',
    METHOD_REQUIRED: 'HTTP method is required',
    METHOD_INVALID: 'HTTP method must be one of: GET, POST, PUT, PATCH, DELETE',
    VERSION_REQUIRED: 'API version is required',
    STATUS_REQUIRED: 'Status is required',
    STATUS_INVALID: 'Status must be a boolean value',
    ACTION_REQUIRED: 'Action is required',
    RATE_LIMIT_INVALID: 'Rate limit must be a valid number',
    MODULE_ID_REQUIRED: 'Module is required',
  },

  // Module validation messages
  MODULE: {
    NAME_REQUIRED: 'Module name is required',
    NAME_TOO_SHORT: (min: number) =>
      `Module name must be at least ${min} characters long`,
    NAME_TOO_LONG: (max: number) =>
      `Module name must be at most ${max} characters long`,
    DESCRIPTION_REQUIRED: 'Module description is required',
    ICON_REQUIRED: 'Module icon is required',
    STATUS_REQUIRED: 'Status is required',
    STATUS_INVALID: 'Status must be a boolean value',
    VERSION_REQUIRED: 'Module version is required',
  },

  // Feature validation messages
  FEATURE: {
    NAME_REQUIRED: 'Feature name is required',
    NAME_TOO_SHORT: (min: number) =>
      `Feature name must be at least ${min} characters long`,
    NAME_TOO_LONG: (max: number) =>
      `Feature name must be at most ${max} characters long`,
    DESCRIPTION_REQUIRED: 'Feature description is required',
    MODULE_ID_REQUIRED: 'Module ID is required',
    MODULE_ID_INVALID: 'Module ID must be a valid number',
    STATUS_REQUIRED: 'Status is required',
    STATUS_INVALID: 'Status must be a boolean value',
    PERMISSION_GROUP_INVALID: 'Permission group must be a valid object',
    API_IDS_INVALID: 'API IDs must be an array of numbers',
  },

  // User validation messages
  USER: {
    FIRST_NAME_REQUIRED: 'First name is required',
    LAST_NAME_REQUIRED: 'Last name is required',
    EMAIL_REQUIRED: 'Email is required',
    EMAIL_INVALID: 'Email must be a valid email address',
    PHONE_REQUIRED: 'Phone number is required',
    PHONE_INVALID: 'Phone number is invalid',
    ROLE_REQUIRED: 'Role is required',
    ROLE_INVALID: 'Role must be a valid role ID',
    STATUS_REQUIRED: 'Status is required',
    STATUS_INVALID: 'Status must be a boolean value',
  },

  // Role validation messages
  ROLE: {
    NAME_REQUIRED: 'Role name is required',
    NAME_TOO_SHORT: (min: number) =>
      `Role name must be at least ${min} characters long`,
    NAME_TOO_LONG: (max: number) =>
      `Role name must be at most ${max} characters long`,
    DESCRIPTION_REQUIRED: 'Role description is required',
    PERMISSIONS_REQUIRED: 'Permissions are required',
    PERMISSIONS_INVALID: 'Permissions must be an array',
  },

  // Client validation messages
  CLIENT: {
    NAME_REQUIRED: 'Client name is required',
    NAME_TOO_SHORT: (min: number) =>
      `Client name must be at least ${min} characters long`,
    NAME_TOO_LONG: (max: number) =>
      `Client name must be at most ${max} characters long`,
    EMAIL_REQUIRED: 'Email is required',
    EMAIL_INVALID: 'Email must be a valid email address',
    PHONE_REQUIRED: 'Phone number is required',
    PHONE_INVALID: 'Phone number is invalid',
    ADDRESS_REQUIRED: 'Address is required',
    STATUS_REQUIRED: 'Status is required',
    STATUS_INVALID: 'Status must be a boolean value',
  },

  // Pagination validation messages
  PAGINATION: {
    PAGE_REQUIRED: 'Page number is required',
    PAGE_INVALID: 'Page number must be a positive integer',
    PAGE_MIN: 'Page number must be at least 1',
    PER_PAGE_REQUIRED: 'Items per page is required',
    PER_PAGE_INVALID: 'Items per page must be a positive integer',
    PER_PAGE_MIN: (min: number) => `Items per page must be at least ${min}`,
    PER_PAGE_MAX: (max: number) => `Items per page must be at most ${max}`,
    SORT_KEY_INVALID: 'Sort key is invalid',
    SORT_VALUE_INVALID: 'Sort value must be either "asc" or "desc"',
  },

  // Location validation messages
  LOCATION: {
    NAME_REQUIRED: 'Location name is required',
    ADDRESS_REQUIRED: 'Address is required',
    CITY_REQUIRED: 'City is required',
    STATE_REQUIRED: 'State is required',
    COUNTRY_REQUIRED: 'Country is required',
    ZIP_CODE_REQUIRED: 'ZIP code is required',
    ZIP_CODE_INVALID: 'ZIP code format is invalid',
    LATITUDE_INVALID: 'Latitude must be a valid number',
    LONGITUDE_INVALID: 'Longitude must be a valid number',
  },

  // File validation messages
  FILE: {
    REQUIRED: 'File is required',
    TOO_LARGE: (maxSize: string) => `File size must be less than ${maxSize}`,
    INVALID_TYPE: (allowedTypes: string[]) =>
      `File type must be one of: ${allowedTypes.join(', ')}`,
    UPLOAD_FAILED: 'File upload failed',
  },

  // Date validation messages
  DATE: {
    INVALID_FORMAT: 'Date format is invalid',
    START_DATE_REQUIRED: 'Start date is required',
    END_DATE_REQUIRED: 'End date is required',
    END_DATE_BEFORE_START: 'End date must be after start date',
    DATE_IN_PAST: 'Date cannot be in the past',
    DATE_IN_FUTURE: 'Date cannot be in the future',
  },
} as const;

/**
 * Custom validation message decorator
 * Usage: @IsNotEmpty({ message: VALIDATION_MESSAGES.REQUIRED('Email') })
 */
export const createValidationMessage = {
  isNotEmpty: (field: string) => ({
    message: VALIDATION_MESSAGES.NOT_EMPTY(field),
  }),
  isString: (field: string) => ({
    message: VALIDATION_MESSAGES.MUST_BE_STRING(field),
  }),
  isNumber: (field: string) => ({
    message: VALIDATION_MESSAGES.MUST_BE_NUMBER(field),
  }),
  isBoolean: (field: string) => ({
    message: VALIDATION_MESSAGES.MUST_BE_BOOLEAN(field),
  }),
  isEmail: (field: string) => ({
    message: VALIDATION_MESSAGES.MUST_BE_EMAIL(field),
  }),
  isUrl: (field: string) => ({
    message: VALIDATION_MESSAGES.MUST_BE_URL(field),
  }),
  minLength: (field: string, min: number) => ({
    message: VALIDATION_MESSAGES.TOO_SHORT(field, min),
  }),
  maxLength: (field: string, max: number) => ({
    message: VALIDATION_MESSAGES.TOO_LONG(field, max),
  }),
  min: (field: string, min: number) => ({
    message: VALIDATION_MESSAGES.MIN_VALUE(field, min),
  }),
  max: (field: string, max: number) => ({
    message: VALIDATION_MESSAGES.MAX_VALUE(field, max),
  }),
  isArray: (field: string) => ({
    message: VALIDATION_MESSAGES.MUST_BE_ARRAY(field),
  }),
  isDate: (field: string) => ({
    message: VALIDATION_MESSAGES.MUST_BE_DATE(field),
  }),
};
