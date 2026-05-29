/**
 * Authentication Response Messages
 */

export const AuthMessages = {
  LOGIN_SUCCESS: 'Login successful',
  LOGIN_FAILED: 'Login failed',
  LOGOUT_SUCCESS: 'Logout successful',
  LOGOUT_FAILED: 'Logout failed',
  INVALID_CREDENTIALS: 'Invalid username or password',
  TOKEN_EXPIRED: 'Token has expired',
  TOKEN_INVALID: 'Invalid token',
  TOKEN_REQUIRED: 'Authentication token is required',
  LOCATION_DEACTIVE: 'You can not Access this location.',
  PASSWORD_CHANGED: 'Password changed successfully',
  PASSWORD_RESET_SENT: 'Password reset link sent to your email',
  PASSWORD_RESET_SUCCESS: 'Password reset successful',
  ACCOUNT_LOCKED: 'Account is locked. Please contact administrator',
  ACCOUNT_INACTIVE: 'Account is inactive',
  USER_NOT_FOUND: 'User not found',
  INVALID_PARAMTER: 'Invalid paramter',
  TOKEN_MAXIMUM_LIMIT:
    'You have reached the maximum number of active token. Please contact the administrator.',
  JWT_SECRET_NOT_DEFINED: 'JWT secret key is not defined',
  TOKEN_FETCHED: 'Token details fetched successfully',
  FAILED_TO_TOKEN_FETCHED: 'Failed to fetch Token details',
  PASSWORD_CONFIRM_MISMATCH: 'Password and confirm password do not match',
  SAME_NEW_OLD_PASSWORD:
    'You cannot reuse your previous passwords. Please choose a new password.',
  REQUIRED_FIELD: 'Fields cannot be empty',
  RESET_URL_ALREADY_SENT: 'Reset Password Url Already Sent',
  RESET_LINK_EXPIRED: 'Reset Password Url is expired',
} as const;

export const AuthDynamicMessages = {
  /**
   * Generate a message for login attempts remaining
   * @param attempts - Number of attempts remaining
   * @example loginAttemptsRemaining(3) => "3 login attempts remaining"
   */
  loginAttemptsRemaining: (attempts: number) =>
    `${attempts} login attempt${attempts !== 1 ? 's' : ''} remaining`,

  /**
   * Generate a message for account locked duration
   * @param minutes - Minutes until unlock
   * @example accountLockedFor(30) => "Account locked for 30 minutes"
   */
  accountLockedFor: (minutes: number) =>
    `Account locked for ${minutes} minute${minutes !== 1 ? 's' : ''}`,
};
