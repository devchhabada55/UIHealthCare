// Storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  THEME: 'theme',
  LANGUAGE: 'language',
  RECENT_FILES: 'recent_files',
  FAVORITES: 'favorites',
  SETTINGS: 'settings',
  CACHE: 'cache',
  HISTORY: 'history',
  NOTIFICATIONS: 'notifications',
  PREFERENCES: 'preferences',
};

// Storage types
export type StorageType = 'local' | 'session';

// Storage interface
interface Storage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
  clear(): void;
}

// Get storage instance
const getStorage = (type: StorageType): Storage => {
  return type === 'local' ? window.localStorage : window.sessionStorage;
};

// Set item in storage
export const setStorageItem = <T>(key: string, value: T, type: StorageType = 'local'): void => {
  try {
    const storage = getStorage(type);
    const serializedValue = JSON.stringify(value);
    storage.setItem(key, serializedValue);
  } catch (error) {
    console.error('Error setting storage item:', error);
  }
};

// Get item from storage
export const getStorageItem = <T>(key: string, type: StorageType = 'local'): T | null => {
  try {
    const storage = getStorage(type);
    const serializedValue = storage.getItem(key);
    return serializedValue ? JSON.parse(serializedValue) : null;
  } catch (error) {
    console.error('Error getting storage item:', error);
    return null;
  }
};

// Remove item from storage
export const removeStorageItem = (key: string, type: StorageType = 'local'): void => {
  try {
    const storage = getStorage(type);
    storage.removeItem(key);
  } catch (error) {
    console.error('Error removing storage item:', error);
  }
};

// Clear storage
export const clearStorage = (type: StorageType = 'local'): void => {
  try {
    const storage = getStorage(type);
    storage.clear();
  } catch (error) {
    console.error('Error clearing storage:', error);
  }
};

// Set auth token
export const setAuthToken = (token: string): void => {
  setStorageItem(STORAGE_KEYS.AUTH_TOKEN, token);
};

// Get auth token
export const getAuthToken = (): string | null => {
  return getStorageItem<string>(STORAGE_KEYS.AUTH_TOKEN);
};

// Remove auth token
export const removeAuthToken = (): void => {
  removeStorageItem(STORAGE_KEYS.AUTH_TOKEN);
};

// Set user data
export const setUserData = (userData: any): void => {
  setStorageItem(STORAGE_KEYS.USER_DATA, userData);
};

// Get user data
export const getUserData = (): any | null => {
  return getStorageItem(STORAGE_KEYS.USER_DATA);
};

// Remove user data
export const removeUserData = (): void => {
  removeStorageItem(STORAGE_KEYS.USER_DATA);
};

// Set theme
export const setTheme = (theme: string): void => {
  setStorageItem(STORAGE_KEYS.THEME, theme);
};

// Get theme
export const getTheme = (): string | null => {
  return getStorageItem<string>(STORAGE_KEYS.THEME);
};

// Set language
export const setLanguage = (language: string): void => {
  setStorageItem(STORAGE_KEYS.LANGUAGE, language);
};

// Get language
export const getLanguage = (): string | null => {
  return getStorageItem<string>(STORAGE_KEYS.LANGUAGE);
};

// Add recent file
export const addRecentFile = (file: { id: string; name: string; type: string; date: string }): void => {
  const recentFiles = getStorageItem<Array<{ id: string; name: string; type: string; date: string }>>(
    STORAGE_KEYS.RECENT_FILES
  ) || [];
  const updatedFiles = [file, ...recentFiles.filter((f) => f.id !== file.id)].slice(0, 10);
  setStorageItem(STORAGE_KEYS.RECENT_FILES, updatedFiles);
};

// Get recent files
export const getRecentFiles = (): Array<{ id: string; name: string; type: string; date: string }> => {
  return getStorageItem<Array<{ id: string; name: string; type: string; date: string }>>(
    STORAGE_KEYS.RECENT_FILES
  ) || [];
};

// Add favorite
export const addFavorite = (item: { id: string; name: string; type: string }): void => {
  const favorites = getStorageItem<Array<{ id: string; name: string; type: string }>>(STORAGE_KEYS.FAVORITES) || [];
  if (!favorites.some((f) => f.id === item.id)) {
    setStorageItem(STORAGE_KEYS.FAVORITES, [...favorites, item]);
  }
};

// Remove favorite
export const removeFavorite = (id: string): void => {
  const favorites = getStorageItem<Array<{ id: string; name: string; type: string }>>(STORAGE_KEYS.FAVORITES) || [];
  setStorageItem(
    STORAGE_KEYS.FAVORITES,
    favorites.filter((f) => f.id !== id)
  );
};

// Get favorites
export const getFavorites = (): Array<{ id: string; name: string; type: string }> => {
  return getStorageItem<Array<{ id: string; name: string; type: string }>>(STORAGE_KEYS.FAVORITES) || [];
};

// Set settings
export const setSettings = (settings: any): void => {
  setStorageItem(STORAGE_KEYS.SETTINGS, settings);
};

// Get settings
export const getSettings = (): any | null => {
  return getStorageItem(STORAGE_KEYS.SETTINGS);
};

// Set cache
export const setCache = (key: string, data: any, expiryMinutes: number = 60): void => {
  const cache = getStorageItem<Record<string, { data: any; expiry: number }>>(STORAGE_KEYS.CACHE) || {};
  const expiry = new Date().getTime() + expiryMinutes * 60 * 1000;
  setStorageItem(STORAGE_KEYS.CACHE, { ...cache, [key]: { data, expiry } });
};

// Get cache
export const getCache = <T>(key: string): T | null => {
  const cache = getStorageItem<Record<string, { data: any; expiry: number }>>(STORAGE_KEYS.CACHE) || {};
  const item = cache[key];
  if (item && item.expiry > new Date().getTime()) {
    return item.data as T;
  }
  return null;
};

// Clear expired cache
export const clearExpiredCache = (): void => {
  const cache = getStorageItem<Record<string, { data: any; expiry: number }>>(STORAGE_KEYS.CACHE) || {};
  const now = new Date().getTime();
  const updatedCache = Object.entries(cache).reduce((acc, [key, value]) => {
    if (value.expiry > now) {
      acc[key] = value;
    }
    return acc;
  }, {} as Record<string, { data: any; expiry: number }>);
  setStorageItem(STORAGE_KEYS.CACHE, updatedCache);
};

// Add history item
export const addHistoryItem = (item: { id: string; name: string; type: string; date: string }): void => {
  const history = getStorageItem<Array<{ id: string; name: string; type: string; date: string }>>(
    STORAGE_KEYS.HISTORY
  ) || [];
  const updatedHistory = [item, ...history.filter((h) => h.id !== item.id)].slice(0, 50);
  setStorageItem(STORAGE_KEYS.HISTORY, updatedHistory);
};

// Get history
export const getHistory = (): Array<{ id: string; name: string; type: string; date: string }> => {
  return getStorageItem<Array<{ id: string; name: string; type: string; date: string }>>(STORAGE_KEYS.HISTORY) || [];
};

// Clear history
export const clearHistory = (): void => {
  removeStorageItem(STORAGE_KEYS.HISTORY);
};

// Add notification
export const addNotification = (notification: {
  id: string;
  title: string;
  message: string;
  type: string;
  date: string;
  read: boolean;
}): void => {
  const notifications = getStorageItem<Array<{
    id: string;
    title: string;
    message: string;
    type: string;
    date: string;
    read: boolean;
  }>>(STORAGE_KEYS.NOTIFICATIONS) || [];
  setStorageItem(STORAGE_KEYS.NOTIFICATIONS, [notification, ...notifications]);
};

// Get notifications
export const getNotifications = (): Array<{
  id: string;
  title: string;
  message: string;
  type: string;
  date: string;
  read: boolean;
}> => {
  return getStorageItem<Array<{
    id: string;
    title: string;
    message: string;
    type: string;
    date: string;
    read: boolean;
  }>>(STORAGE_KEYS.NOTIFICATIONS) || [];
};

// Mark notification as read
export const markNotificationAsRead = (id: string): void => {
  const notifications = getNotifications();
  const updatedNotifications = notifications.map((notification) =>
    notification.id === id ? { ...notification, read: true } : notification
  );
  setStorageItem(STORAGE_KEYS.NOTIFICATIONS, updatedNotifications);
};

// Clear notifications
export const clearNotifications = (): void => {
  removeStorageItem(STORAGE_KEYS.NOTIFICATIONS);
};

// Set preferences
export const setPreferences = (preferences: any): void => {
  setStorageItem(STORAGE_KEYS.PREFERENCES, preferences);
};

// Get preferences
export const getPreferences = (): any | null => {
  return getStorageItem(STORAGE_KEYS.PREFERENCES);
};

// Clear all storage
export const clearAllStorage = (): void => {
  clearStorage('local');
  clearStorage('session');
}; 