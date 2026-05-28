export const UserMessages = {
  CREATED: 'User created successfully',
  UPDATED: 'User updated successfully',
  DELETED: 'User deleted successfully',
  FETCHED: 'User fetched successfully',
  FETCHED_ALL: 'Users fetched successfully',
  NOT_FOUND: 'User not found',
  ALREADY_EXISTS: 'User with this email or username already exists',
  STATUS_UPDATED: 'User status updated successfully',
  PROFILE_UPDATED: 'Profile updated successfully',
  FAILED_TO_CREATE: 'Failed to create user',
  FAILED_TO_UPDATE: 'Failed to update user',
  FAILED_TO_FETCH: 'Failed to fetch user',
  FAILED_TO_FETCH_ALL: 'Failed to fetch users',
  REQUEST_NOT_FOUND: 'Password reset request not found',
  MAX_USERS_REACHED: 'Maximum number of users reached (U999)',
} as const;

export const UserDynamicMessages = {
  /**
   * Generate a welcome message for user
   * @param name - User's name
   * @example welcomeUser('John') => "Welcome, John!"
   */
  welcomeUser: (name: string) => `Welcome, ${name}!`,

  /**
   * Generate a message for user creation
   * @param email - User's email
   * @example userCreatedWithEmail('john@example.com') => "User created with email: john@example.com"
   */
  userCreatedWithEmail: (email: string) => `User created with email: ${email}`,
};
