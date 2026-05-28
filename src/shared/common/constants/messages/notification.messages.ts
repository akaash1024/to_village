export const NotificationMessages = {
  SENT: 'Notification sent successfully',
  FETCHED: 'Notification fetched successfully',
  FETCHED_ALL: 'Notifications fetched successfully',
  MARKED_AS_READ: 'Notification marked as read',
  DELETED: 'Notification deleted successfully',
  FAILED_TO_SEND: 'Failed to send notification',
  FAILED_TO_FETCH: 'Failed to fetch notifications',
} as const;

export const NotificationDynamicMessages = {
  /**
   * Generate a message for unread notification count
   * @param count - Number of unread notifications
   * @example unreadNotifications(5) => "You have 5 unread notifications"
   */
  unreadNotifications: (count: number) =>
    `You have ${count} unread notification${count !== 1 ? 's' : ''}`,
};
