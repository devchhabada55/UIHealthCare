// File type constants
export const FILE_TYPES = {
  PDF: 'application/pdf',
  IMAGE: {
    JPEG: 'image/jpeg',
    PNG: 'image/png',
    GIF: 'image/gif',
    WEBP: 'image/webp',
  },
  DOCUMENT: {
    DOC: 'application/msword',
    DOCX: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    XLS: 'application/vnd.ms-excel',
    XLSX: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  },
  TEXT: {
    PLAIN: 'text/plain',
    CSV: 'text/csv',
    HTML: 'text/html',
  },
};

// File size constants (in bytes)
export const FILE_SIZES = {
  KB: 1024,
  MB: 1024 * 1024,
  GB: 1024 * 1024 * 1024,
};

// Maximum file sizes
export const MAX_FILE_SIZES = {
  PDF: 10 * FILE_SIZES.MB,
  IMAGE: 5 * FILE_SIZES.MB,
  DOCUMENT: 10 * FILE_SIZES.MB,
  TEXT: 1 * FILE_SIZES.MB,
};

// File validation
export const isValidFileType = (file: File, allowedTypes: string[]): boolean => {
  return allowedTypes.includes(file.type);
};

export const isValidFileSize = (file: File, maxSize: number): boolean => {
  return file.size <= maxSize;
};

export const getFileExtension = (filename: string): string => {
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
};

export const getFileType = (file: File): string => {
  return file.type.split('/')[0];
};

export const getFileSizeString = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// File reading
export const readFileAsText = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
};

export const readFileAsDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
};

export const readFileAsArrayBuffer = (file: File): Promise<ArrayBuffer> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as ArrayBuffer);
    reader.onerror = () => reject(reader.error);
    reader.readAsArrayBuffer(file);
  });
};

// File downloading
export const downloadFile = (data: Blob | string, filename: string): void => {
  const link = document.createElement('a');
  link.href = typeof data === 'string' ? data : URL.createObjectURL(data);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const downloadTextFile = (content: string, filename: string): void => {
  const blob = new Blob([content], { type: 'text/plain' });
  downloadFile(blob, filename);
};

export const downloadJsonFile = (data: any, filename: string): void => {
  const content = JSON.stringify(data, null, 2);
  const blob = new Blob([content], { type: 'application/json' });
  downloadFile(blob, filename);
};

// File conversion
export const convertFileToBase64 = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      resolve(base64String.split(',')[1]);
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
};

export const convertBase64ToBlob = (
  base64: string,
  type: string = 'application/octet-stream'
): Blob => {
  const byteString = atob(base64);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type });
};

// File compression
export const compressImage = async (
  file: File,
  options: {
    maxWidth?: number;
    maxHeight?: number;
    quality?: number;
  } = {}
): Promise<Blob> => {
  const { maxWidth = 1920, maxHeight = 1080, quality = 0.8 } = options;

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }

      if (height > maxHeight) {
        width = (width * maxHeight) / height;
        height = maxHeight;
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Could not compress image'));
          }
        },
        file.type,
        quality
      );
    };
    img.onerror = () => reject(new Error('Could not load image'));
  });
};

// File validation helpers
export const validateFile = (
  file: File,
  options: {
    allowedTypes?: string[];
    maxSize?: number;
  } = {}
): { isValid: boolean; error?: string } => {
  const { allowedTypes, maxSize } = options;

  if (allowedTypes && !isValidFileType(file, allowedTypes)) {
    return {
      isValid: false,
      error: `Invalid file type. Allowed types: ${allowedTypes.join(', ')}`,
    };
  }

  if (maxSize && !isValidFileSize(file, maxSize)) {
    return {
      isValid: false,
      error: `File size exceeds the limit of ${getFileSizeString(maxSize)}`,
    };
  }

  return { isValid: true };
};

// File upload helpers
export const createFormData = (file: File, additionalData?: Record<string, any>): FormData => {
  const formData = new FormData();
  formData.append('file', file);

  if (additionalData) {
    Object.entries(additionalData).forEach(([key, value]) => {
      formData.append(key, value);
    });
  }

  return formData;
};

// File drag and drop helpers
export const isFileDragEvent = (event: DragEvent): boolean => {
  return event.dataTransfer?.types.includes('Files') ?? false;
};

export const getDroppedFiles = (event: DragEvent): File[] => {
  if (!event.dataTransfer?.files) return [];
  return Array.from(event.dataTransfer.files);
};

// File input helpers
export const createFileInput = (
  options: {
    accept?: string;
    multiple?: boolean;
    onChange?: (files: File[]) => void;
  } = {}
): HTMLInputElement => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = options.accept || '*/*';
  input.multiple = options.multiple || false;

  if (options.onChange) {
    input.addEventListener('change', (event) => {
      const files = Array.from((event.target as HTMLInputElement).files || []);
      options.onChange?.(files);
    });
  }

  return input;
}; 