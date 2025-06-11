// Email validation
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password validation
export const isValidPassword = (password: string): boolean => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

// Name validation
export const isValidName = (name: string): boolean => {
  // Only letters, spaces, and hyphens, 2-50 characters
  const nameRegex = /^[a-zA-Z\s-]{2,50}$/;
  return nameRegex.test(name);
};

// Phone number validation
export const isValidPhoneNumber = (phone: string): boolean => {
  // Basic phone number format validation
  const phoneRegex = /^\+?[\d\s-]{10,}$/;
  return phoneRegex.test(phone);
};

// Date validation
export const isValidDate = (date: string): boolean => {
  const dateObj = new Date(date);
  return dateObj instanceof Date && !isNaN(dateObj.getTime());
};

// File validation
export const isValidFileType = (file: File, allowedTypes: string[]): boolean => {
  return allowedTypes.includes(file.type);
};

export const isValidFileSize = (file: File, maxSizeInMB: number): boolean => {
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  return file.size <= maxSizeInBytes;
};

// Number validation
export const isValidNumber = (value: string | number): boolean => {
  if (typeof value === 'number') return !isNaN(value);
  return !isNaN(Number(value));
};

export const isInRange = (value: number, min: number, max: number): boolean => {
  return value >= min && value <= max;
};

// URL validation
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Form validation
export const validateForm = (
  values: Record<string, any>,
  rules: Record<string, (value: any) => boolean>
): Record<string, string> => {
  const errors: Record<string, string> = {};

  Object.keys(rules).forEach((field) => {
    const value = values[field];
    const isValid = rules[field](value);

    if (!isValid) {
      errors[field] = `Invalid ${field}`;
    }
  });

  return errors;
};

// Required field validation
export const isRequired = (value: any): boolean => {
  if (value === undefined || value === null) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
};

// Length validation
export const hasMinLength = (value: string, minLength: number): boolean => {
  return value.length >= minLength;
};

export const hasMaxLength = (value: string, maxLength: number): boolean => {
  return value.length <= maxLength;
};

// Pattern validation
export const matchesPattern = (value: string, pattern: RegExp): boolean => {
  return pattern.test(value);
};

// Custom validation
export const createCustomValidator = (
  validateFn: (value: any) => boolean,
  errorMessage: string
) => {
  return (value: any): string | null => {
    return validateFn(value) ? null : errorMessage;
  };
};

// Form field validation
export const validateField = (
  value: any,
  validators: Array<(value: any) => string | null>
): string | null => {
  for (const validator of validators) {
    const error = validator(value);
    if (error) return error;
  }
  return null;
};

// Form validation with async support
export const validateFormAsync = async (
  values: Record<string, any>,
  rules: Record<string, (value: any) => Promise<boolean>>
): Promise<Record<string, string>> => {
  const errors: Record<string, string> = {};

  await Promise.all(
    Object.keys(rules).map(async (field) => {
      const value = values[field];
      const isValid = await rules[field](value);

      if (!isValid) {
        errors[field] = `Invalid ${field}`;
      }
    })
  );

  return errors;
};

// Validation error messages
export const validationMessages = {
  required: 'This field is required',
  email: 'Please enter a valid email address',
  password: 'Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character',
  name: 'Please enter a valid name (2-50 characters, letters only)',
  phone: 'Please enter a valid phone number',
  date: 'Please enter a valid date',
  fileType: 'Invalid file type',
  fileSize: 'File size exceeds the limit',
  number: 'Please enter a valid number',
  url: 'Please enter a valid URL',
  minLength: (min: number) => `Minimum length is ${min} characters`,
  maxLength: (max: number) => `Maximum length is ${max} characters`,
  range: (min: number, max: number) => `Value must be between ${min} and ${max}`,
}; 