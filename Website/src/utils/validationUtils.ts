// Email validation regex
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Password validation regex (at least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character)
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Phone number validation regex (international format)
const PHONE_REGEX = /^\+?[1-9]\d{1,14}$/;

// URL validation regex
const URL_REGEX = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

// Date validation regex (YYYY-MM-DD)
const DATE_REGEX = /^\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01])$/;

// Time validation regex (HH:MM:SS)
const TIME_REGEX = /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/;

// Validation error messages
export const VALIDATION_MESSAGES = {
  REQUIRED: 'This field is required',
  EMAIL: 'Please enter a valid email address',
  PASSWORD: 'Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character',
  PHONE: 'Please enter a valid phone number',
  URL: 'Please enter a valid URL',
  DATE: 'Please enter a valid date (YYYY-MM-DD)',
  TIME: 'Please enter a valid time (HH:MM:SS)',
  MIN_LENGTH: (min: number) => `Must be at least ${min} characters long`,
  MAX_LENGTH: (max: number) => `Must not exceed ${max} characters`,
  MIN_VALUE: (min: number) => `Must be at least ${min}`,
  MAX_VALUE: (max: number) => `Must not exceed ${max}`,
  MATCH: 'Fields do not match',
  INVALID_FORMAT: 'Invalid format',
};

// Validate email address
export const validateEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email);
};

// Validate password strength
export const validatePassword = (password: string): boolean => {
  return PASSWORD_REGEX.test(password);
};

// Validate phone number
export const validatePhone = (phone: string): boolean => {
  return PHONE_REGEX.test(phone);
};

// Validate URL
export const validateUrl = (url: string): boolean => {
  return URL_REGEX.test(url);
};

// Validate date format
export const validateDate = (date: string): boolean => {
  return DATE_REGEX.test(date);
};

// Validate time format
export const validateTime = (time: string): boolean => {
  return TIME_REGEX.test(time);
};

// Validate required field
export const validateRequired = (value: any): boolean => {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
};

// Validate minimum length
export const validateMinLength = (value: string | any[], min: number): boolean => {
  return value.length >= min;
};

// Validate maximum length
export const validateMaxLength = (value: string | any[], max: number): boolean => {
  return value.length <= max;
};

// Validate minimum value
export const validateMinValue = (value: number, min: number): boolean => {
  return value >= min;
};

// Validate maximum value
export const validateMaxValue = (value: number, max: number): boolean => {
  return value <= max;
};

// Validate field matches another field
export const validateMatch = (value: any, matchValue: any): boolean => {
  return value === matchValue;
};

// Validate numeric value
export const validateNumeric = (value: string | number): boolean => {
  return !isNaN(Number(value));
};

// Validate integer value
export const validateInteger = (value: string | number): boolean => {
  return Number.isInteger(Number(value));
};

// Validate decimal value
export const validateDecimal = (value: string | number, decimals: number = 2): boolean => {
  const regex = new RegExp(`^-?\\d*\\.?\\d{0,${decimals}}$`);
  return regex.test(value.toString());
};

// Validate value is within range
export const validateRange = (value: number, min: number, max: number): boolean => {
  return value >= min && value <= max;
};

// Validate value is one of the allowed values
export const validateEnum = (value: any, allowedValues: any[]): boolean => {
  return allowedValues.includes(value);
};

// Validate object has required properties
export const validateObject = (obj: object, requiredProps: string[]): boolean => {
  return requiredProps.every((prop) => prop in obj);
};

// Validate array contains only allowed values
export const validateArray = (arr: any[], allowedValues: any[]): boolean => {
  return arr.every((item) => allowedValues.includes(item));
};

// Validate file type
export const validateFileType = (file: File, allowedTypes: string[]): boolean => {
  return allowedTypes.includes(file.type);
};

// Validate file size
export const validateFileSize = (file: File, maxSize: number): boolean => {
  return file.size <= maxSize;
};

// Validate form data
export const validateForm = (
  data: Record<string, any>,
  rules: Record<string, { required?: boolean; type?: string; min?: number; max?: number; pattern?: RegExp; match?: string }>
): Record<string, string> => {
  const errors: Record<string, string> = {};

  Object.entries(rules).forEach(([field, rule]) => {
    const value = data[field];

    if (rule.required && !validateRequired(value)) {
      errors[field] = VALIDATION_MESSAGES.REQUIRED;
      return;
    }

    if (value === null || value === undefined) return;

    switch (rule.type) {
      case 'email':
        if (!validateEmail(value)) errors[field] = VALIDATION_MESSAGES.EMAIL;
        break;
      case 'password':
        if (!validatePassword(value)) errors[field] = VALIDATION_MESSAGES.PASSWORD;
        break;
      case 'phone':
        if (!validatePhone(value)) errors[field] = VALIDATION_MESSAGES.PHONE;
        break;
      case 'url':
        if (!validateUrl(value)) errors[field] = VALIDATION_MESSAGES.URL;
        break;
      case 'date':
        if (!validateDate(value)) errors[field] = VALIDATION_MESSAGES.DATE;
        break;
      case 'time':
        if (!validateTime(value)) errors[field] = VALIDATION_MESSAGES.TIME;
        break;
    }

    if (rule.min !== undefined) {
      if (typeof value === 'string' || Array.isArray(value)) {
        if (!validateMinLength(value, rule.min)) errors[field] = VALIDATION_MESSAGES.MIN_LENGTH(rule.min);
      } else if (typeof value === 'number') {
        if (!validateMinValue(value, rule.min)) errors[field] = VALIDATION_MESSAGES.MIN_VALUE(rule.min);
      }
    }

    if (rule.max !== undefined) {
      if (typeof value === 'string' || Array.isArray(value)) {
        if (!validateMaxLength(value, rule.max)) errors[field] = VALIDATION_MESSAGES.MAX_LENGTH(rule.max);
      } else if (typeof value === 'number') {
        if (!validateMaxValue(value, rule.max)) errors[field] = VALIDATION_MESSAGES.MAX_VALUE(rule.max);
      }
    }

    if (rule.pattern && !rule.pattern.test(value)) {
      errors[field] = VALIDATION_MESSAGES.INVALID_FORMAT;
    }

    if (rule.match && !validateMatch(value, data[rule.match])) {
      errors[field] = VALIDATION_MESSAGES.MATCH;
    }
  });

  return errors;
};

// Validate health data
export const validateHealthData = (data: any): Record<string, string> => {
  const errors: Record<string, string> = {};

  // Validate required fields
  if (!data.patientId) errors.patientId = VALIDATION_MESSAGES.REQUIRED;
  if (!data.date) errors.date = VALIDATION_MESSAGES.REQUIRED;
  if (!data.type) errors.type = VALIDATION_MESSAGES.REQUIRED;

  // Validate date format
  if (data.date && !validateDate(data.date)) {
    errors.date = VALIDATION_MESSAGES.DATE;
  }

  // Validate numeric values
  if (data.age && !validateInteger(data.age)) {
    errors.age = 'Age must be a whole number';
  }

  if (data.weight && !validateDecimal(data.weight)) {
    errors.weight = 'Weight must be a valid decimal number';
  }

  if (data.height && !validateDecimal(data.height)) {
    errors.height = 'Height must be a valid decimal number';
  }

  // Validate ranges
  if (data.age && !validateRange(data.age, 0, 150)) {
    errors.age = 'Age must be between 0 and 150';
  }

  if (data.weight && !validateRange(data.weight, 0, 1000)) {
    errors.weight = 'Weight must be between 0 and 1000 kg';
  }

  if (data.height && !validateRange(data.height, 0, 300)) {
    errors.height = 'Height must be between 0 and 300 cm';
  }

  return errors;
};

// Validate medical record
export const validateMedicalRecord = (record: any): Record<string, string> => {
  const errors: Record<string, string> = {};

  // Validate required fields
  if (!record.patientId) errors.patientId = VALIDATION_MESSAGES.REQUIRED;
  if (!record.date) errors.date = VALIDATION_MESSAGES.REQUIRED;
  if (!record.doctorId) errors.doctorId = VALIDATION_MESSAGES.REQUIRED;
  if (!record.diagnosis) errors.diagnosis = VALIDATION_MESSAGES.REQUIRED;

  // Validate date format
  if (record.date && !validateDate(record.date)) {
    errors.date = VALIDATION_MESSAGES.DATE;
  }

  // Validate diagnosis is not empty
  if (record.diagnosis && typeof record.diagnosis === 'string' && !validateRequired(record.diagnosis)) {
    errors.diagnosis = 'Diagnosis cannot be empty';
  }

  // Validate medications array
  if (record.medications && !Array.isArray(record.medications)) {
    errors.medications = 'Medications must be an array';
  }

  // Validate test results
  if (record.testResults) {
    if (!Array.isArray(record.testResults)) {
      errors.testResults = 'Test results must be an array';
    } else {
      record.testResults.forEach((result: any, index: number) => {
        if (!result.testName || !result.value || !result.unit) {
          errors[`testResults[${index}]`] = 'Test result must include test name, value, and unit';
        }
      });
    }
  }

  return errors;
};

// Validate appointment
export const validateAppointment = (appointment: any): Record<string, string> => {
  const errors: Record<string, string> = {};

  // Validate required fields
  if (!appointment.patientId) errors.patientId = VALIDATION_MESSAGES.REQUIRED;
  if (!appointment.doctorId) errors.doctorId = VALIDATION_MESSAGES.REQUIRED;
  if (!appointment.date) errors.date = VALIDATION_MESSAGES.REQUIRED;
  if (!appointment.time) errors.time = VALIDATION_MESSAGES.REQUIRED;

  // Validate date format
  if (appointment.date && !validateDate(appointment.date)) {
    errors.date = VALIDATION_MESSAGES.DATE;
  }

  // Validate time format
  if (appointment.time && !validateTime(appointment.time)) {
    errors.time = VALIDATION_MESSAGES.TIME;
  }

  // Validate date is not in the past
  if (appointment.date) {
    const appointmentDate = new Date(`${appointment.date}T${appointment.time}`);
    if (appointmentDate < new Date()) {
      errors.date = 'Appointment date cannot be in the past';
    }
  }

  return errors;
}; 