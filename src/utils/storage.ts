// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  THEME: 'theme',
  LANGUAGE: 'language',
  RECENT_FILES: 'recent_files',
  SETTINGS: 'settings',
  CACHE: 'cache',
};

// Local Storage
export const setLocalStorage = <T>(key: string, value: T): void => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const getLocalStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const serializedValue = localStorage.getItem(key);
    if (serializedValue === null) {
      return defaultValue;
    }
    return JSON.parse(serializedValue) as T;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return defaultValue;
  }
};

export const removeLocalStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
};

export const clearLocalStorage = (): void => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
};

// Session Storage
export const setSessionStorage = <T>(key: string, value: T): void => {
  try {
    const serializedValue = JSON.stringify(value);
    sessionStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error('Error saving to sessionStorage:', error);
  }
};

export const getSessionStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const serializedValue = sessionStorage.getItem(key);
    if (serializedValue === null) {
      return defaultValue;
    }
    return JSON.parse(serializedValue) as T;
  } catch (error) {
    console.error('Error reading from sessionStorage:', error);
    return defaultValue;
  }
};

export const removeSessionStorage = (key: string): void => {
  try {
    sessionStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from sessionStorage:', error);
  }
};

export const clearSessionStorage = (): void => {
  try {
    sessionStorage.clear();
  } catch (error) {
    console.error('Error clearing sessionStorage:', error);
  }
};

// Cache Management
interface CacheItem<T> {
  value: T;
  timestamp: number;
  expiry: number;
}

export const setCache = <T>(key: string, value: T, expiryInMinutes: number = 60): void => {
  try {
    const cacheItem: CacheItem<T> = {
      value,
      timestamp: Date.now(),
      expiry: expiryInMinutes * 60 * 1000,
    };
    setLocalStorage(key, cacheItem);
  } catch (error) {
    console.error('Error setting cache:', error);
  }
};

export const getCache = <T>(key: string, defaultValue: T): T => {
  try {
    const cacheItem = getLocalStorage<CacheItem<T>>(key, {
      value: defaultValue,
      timestamp: 0,
      expiry: 0,
    });

    if (Date.now() - cacheItem.timestamp > cacheItem.expiry) {
      removeLocalStorage(key);
      return defaultValue;
    }

    return cacheItem.value;
  } catch (error) {
    console.error('Error getting cache:', error);
    return defaultValue;
  }
};

export const clearCache = (): void => {
  try {
    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      if (key.startsWith(STORAGE_KEYS.CACHE)) {
        removeLocalStorage(key);
      }
    });
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
};

// Recent Files Management
interface RecentFile {
  id: string;
  name: string;
  type: string;
  timestamp: number;
}

export const addRecentFile = (file: Omit<RecentFile, 'timestamp'>): void => {
  try {
    const recentFiles = getLocalStorage<RecentFile[]>(STORAGE_KEYS.RECENT_FILES, []);
    const newFile: RecentFile = {
      ...file,
      timestamp: Date.now(),
    };

    // Remove if file already exists
    const filteredFiles = recentFiles.filter((f) => f.id !== file.id);
    // Add new file to the beginning
    filteredFiles.unshift(newFile);
    // Keep only the last 10 files
    const updatedFiles = filteredFiles.slice(0, 10);

    setLocalStorage(STORAGE_KEYS.RECENT_FILES, updatedFiles);
  } catch (error) {
    console.error('Error adding recent file:', error);
  }
};

export const getRecentFiles = (): RecentFile[] => {
  return getLocalStorage<RecentFile[]>(STORAGE_KEYS.RECENT_FILES, []);
};

export const clearRecentFiles = (): void => {
  removeLocalStorage(STORAGE_KEYS.RECENT_FILES);
};

// Settings Management
interface Settings {
  theme: 'light' | 'dark';
  language: string;
  notifications: boolean;
  autoSave: boolean;
}

export const defaultSettings: Settings = {
  theme: 'light',
  language: 'en',
  notifications: true,
  autoSave: true,
};

export const getSettings = (): Settings => {
  return getLocalStorage<Settings>(STORAGE_KEYS.SETTINGS, defaultSettings);
};

export const updateSettings = (settings: Partial<Settings>): void => {
  const currentSettings = getSettings();
  setLocalStorage(STORAGE_KEYS.SETTINGS, {
    ...currentSettings,
    ...settings,
  });
};

export const resetSettings = (): void => {
  setLocalStorage(STORAGE_KEYS.SETTINGS, defaultSettings);
};

// Auth Token Management
export const setAuthToken = (token: string): void => {
  setLocalStorage(STORAGE_KEYS.AUTH_TOKEN, token);
};

export const getAuthToken = (): string | null => {
  return getLocalStorage<string | null>(STORAGE_KEYS.AUTH_TOKEN, null);
};

export const removeAuthToken = (): void => {
  removeLocalStorage(STORAGE_KEYS.AUTH_TOKEN);
};

// User Data Management
interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
}

export const setUserData = (userData: UserData): void => {
  setLocalStorage(STORAGE_KEYS.USER_DATA, userData);
};

export const getUserData = (): UserData | null => {
  return getLocalStorage<UserData | null>(STORAGE_KEYS.USER_DATA, null);
};

export const removeUserData = (): void => {
  removeLocalStorage(STORAGE_KEYS.USER_DATA);
};

// Clear all user-related data
export const clearUserData = (): void => {
  removeAuthToken();
  removeUserData();
  clearRecentFiles();
  clearCache();
}; 