import { addNotification, getNotifications, markNotificationAsRead, clearNotifications } from './storageUtils';

// Notification types
export type NotificationType = 'info' | 'success' | 'warning' | 'error';

// Notification interface
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  date: string;
  read: boolean;
}

// Notification options
export interface NotificationOptions {
  duration?: number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  autoClose?: boolean;
  showProgress?: boolean;
  pauseOnHover?: boolean;
  closeOnClick?: boolean;
}

// Default notification options
export const DEFAULT_NOTIFICATION_OPTIONS: NotificationOptions = {
  duration: 5000,
  position: 'top-right',
  autoClose: true,
  showProgress: true,
  pauseOnHover: true,
  closeOnClick: true,
};

// Generate unique ID
const generateId = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

// Format date
const formatDate = (date: Date): string => {
  return date.toISOString();
};

// Create notification
export const createNotification = (
  title: string,
  message: string,
  type: NotificationType = 'info'
): Notification => {
  const notification: Notification = {
    id: generateId(),
    title,
    message,
    type,
    date: formatDate(new Date()),
    read: false,
  };

  addNotification(notification);
  return notification;
};

// Create info notification
export const createInfoNotification = (
  title: string,
  message: string
): Notification => {
  return createNotification(title, message, 'info');
};

// Create success notification
export const createSuccessNotification = (
  title: string,
  message: string
): Notification => {
  return createNotification(title, message, 'success');
};

// Create warning notification
export const createWarningNotification = (
  title: string,
  message: string
): Notification => {
  return createNotification(title, message, 'warning');
};

// Create error notification
export const createErrorNotification = (
  title: string,
  message: string
): Notification => {
  return createNotification(title, message, 'error');
};

// Get all notifications
export const getAllNotifications = (): Notification[] => {
  // Cast and ensure type safety
  return (getNotifications() as any[]).map((n) => ({
    ...n,
    type: n.type as NotificationType,
  }));
};

// Get unread notifications
export const getUnreadNotifications = (): Notification[] => {
  return getAllNotifications().filter((notification) => !notification.read);
};

// Get notifications by type
export const getNotificationsByType = (type: NotificationType): Notification[] => {
  const notifications = getNotifications() as Notification[];
  return notifications.filter((notification) => notification.type === type);
};

// Mark notification as read
export const markAsRead = (id: string): void => {
  markNotificationAsRead(id);
};

// Mark all notifications as read
export const markAllAsRead = (): void => {
  const notifications = getNotifications();
  notifications.forEach((notification) => {
    if (!notification.read) {
      markNotificationAsRead(notification.id);
    }
  });
};

// Delete notification
export const deleteNotification = (id: string): void => {
  const notifications = getNotifications();
  const updatedNotifications = notifications.filter((notification) => notification.id !== id);
  clearNotifications();
  updatedNotifications.forEach((notification) => addNotification(notification));
};

// Delete all notifications
export const deleteAllNotifications = (): void => {
  clearNotifications();
};

// Delete notifications by type
export const deleteNotificationsByType = (type: NotificationType): void => {
  const notifications = getNotifications();
  const updatedNotifications = notifications.filter((notification) => notification.type !== type);
  clearNotifications();
  updatedNotifications.forEach((notification) => addNotification(notification));
};

// Get notification count
export const getNotificationCount = (): number => {
  return getNotifications().length;
};

// Get unread notification count
export const getUnreadNotificationCount = (): number => {
  return getUnreadNotifications().length;
};

// Get notification count by type
export const getNotificationCountByType = (type: NotificationType): number => {
  return getNotificationsByType(type).length;
};

// Check if notification exists
export const hasNotification = (id: string): boolean => {
  return getNotifications().some((notification) => notification.id === id);
};

// Check if notification is unread
export const isNotificationUnread = (id: string): boolean => {
  const notification = getNotifications().find((n) => n.id === id);
  return notification ? !notification.read : false;
};

// Get notification by ID
export const getNotificationById = (id: string): Notification | undefined => {
  const notifications = getNotifications() as Notification[];
  return notifications.find((notification) => notification.id === id);
};

// Update notification
export const updateNotification = (
  id: string,
  updates: Partial<Omit<Notification, 'id' | 'date'>>
): void => {
  const notifications = getNotifications();
  const updatedNotifications = notifications.map((notification) =>
    notification.id === id
      ? { ...notification, ...updates, date: formatDate(new Date()) } as Notification
      : notification
  );
  clearNotifications();
  updatedNotifications.forEach((notification) => addNotification(notification));
};

// Sort notifications
export const sortNotifications = (
  notifications: Notification[],
  sortBy: 'date' | 'type' | 'read' = 'date',
  order: 'asc' | 'desc' = 'desc'
): Notification[] => {
  return [...notifications].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return order === 'asc'
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'type':
        return order === 'asc'
          ? a.type.localeCompare(b.type)
          : b.type.localeCompare(a.type);
      case 'read':
        return order === 'asc'
          ? Number(a.read) - Number(b.read)
          : Number(b.read) - Number(a.read);
      default:
        return 0;
    }
  });
};

// Filter notifications
export const filterNotifications = (
  notifications: Notification[],
  filters: {
    type?: NotificationType;
    read?: boolean;
    search?: string;
    startDate?: Date;
    endDate?: Date;
  }
): Notification[] => {
  return notifications.filter((notification) => {
    if (filters.type && notification.type !== filters.type) return false;
    if (filters.read !== undefined && notification.read !== filters.read) return false;
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      if (
        !notification.title.toLowerCase().includes(searchLower) &&
        !notification.message.toLowerCase().includes(searchLower)
      )
        return false;
    }
    if (filters.startDate && new Date(notification.date) < filters.startDate) return false;
    if (filters.endDate && new Date(notification.date) > filters.endDate) return false;
    return true;
  });
};

// Group notifications
export const groupNotifications = (
  notifications: Notification[],
  groupBy: 'type' | 'date' | 'read' = 'type'
): Record<string, Notification[]> => {
  return notifications.reduce((groups, notification) => {
    let key: string;
    switch (groupBy) {
      case 'type':
        key = notification.type;
        break;
      case 'date':
        key = new Date(notification.date).toLocaleDateString();
        break;
      case 'read':
        key = notification.read ? 'read' : 'unread';
        break;
      default:
        key = 'other';
    }
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(notification);
    return groups;
  }, {} as Record<string, Notification[]>);
};

// Export notifications
export const exportNotifications = (format: 'json' | 'csv' = 'json'): string => {
  const notifications = getNotifications();
  if (format === 'json') {
    return JSON.stringify(notifications, null, 2);
  } else {
    const headers = ['ID', 'Title', 'Message', 'Type', 'Date', 'Read'];
    const rows = notifications.map((n) => [
      n.id,
      n.title,
      n.message,
      n.type,
      n.date,
      n.read.toString(),
    ]);
    return [headers, ...rows].map((row) => row.join(',')).join('\n');
  }
};

// Import notifications
export const importNotifications = (data: string, format: 'json' | 'csv' = 'json'): void => {
  let notifications: Notification[];
  if (format === 'json') {
    const parsedData = JSON.parse(data);
    notifications = parsedData.map((item: any) => ({
      ...item,
      type: item.type as NotificationType,
    }));
  } else {
    const rows = data.split('\n').map((row) => row.split(','));
    notifications = rows.slice(1).map((row) => {
      const type = row[3] as NotificationType;
      if (!['info', 'success', 'warning', 'error'].includes(type)) {
        throw new Error(`Invalid notification type: ${type}`);
      }
      return {
        id: row[0],
        title: row[1],
        message: row[2],
        type,
        date: row[4],
        read: row[5] === 'true',
      };
    });
  }
  clearNotifications();
  notifications.forEach((notification) => addNotification(notification));
}; 