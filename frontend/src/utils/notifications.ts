import { toast, ToastOptions } from 'react-toastify';

// Notification types
export type NotificationType = 'success' | 'error' | 'info' | 'warning';

// Default toast options
const defaultToastOptions: ToastOptions = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

// Success notification
export const showSuccess = (message: string, options?: ToastOptions): void => {
  toast.success(message, {
    ...defaultToastOptions,
    ...options,
  });
};

// Error notification
export const showError = (message: string, options?: ToastOptions): void => {
  toast.error(message, {
    ...defaultToastOptions,
    ...options,
  });
};

// Info notification
export const showInfo = (message: string, options?: ToastOptions): void => {
  toast.info(message, {
    ...defaultToastOptions,
    ...options,
  });
};

// Warning notification
export const showWarning = (message: string, options?: ToastOptions): void => {
  toast.warning(message, {
    ...defaultToastOptions,
    ...options,
  });
};

// Custom notification
export const showNotification = (
  type: NotificationType,
  message: string,
  options?: ToastOptions
): void => {
  toast[type](message, {
    ...defaultToastOptions,
    ...options,
  });
};

// Promise notification
export const showPromise = <T>(
  promise: Promise<T>,
  {
    pending = 'Loading...',
    success = 'Success!',
    error = 'Error!',
  }: {
    pending?: string;
    success?: string;
    error?: string;
  } = {}
): Promise<T> => {
  return toast.promise(promise, {
    pending,
    success,
    error,
  });
};

// Dismiss all notifications
export const dismissAll = (): void => {
  toast.dismiss();
};

// Dismiss specific notification
export const dismiss = (toastId: string | number): void => {
  toast.dismiss(toastId);
};

// Update existing notification
export const update = (
  toastId: string | number,
  {
    render,
    type,
    ...options
  }: {
    render: string | React.ReactNode;
    type?: NotificationType;
  } & ToastOptions
): void => {
  toast.update(toastId, {
    render,
    type,
    ...options,
  });
};

// Notification with action
export const showActionNotification = (
  message: string,
  action: {
    label: string;
    onClick: () => void;
  },
  options?: ToastOptions
): void => {
  toast(
    <div>
      <div>{message}</div>
      <button
        onClick={() => {
          action.onClick();
          dismissAll();
        }}
        style={{
          marginTop: '8px',
          padding: '4px 8px',
          backgroundColor: '#2196f3',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        {action.label}
      </button>
    </div>,
    {
      ...defaultToastOptions,
      ...options,
    }
  );
};

// Notification with custom content
export const showCustomNotification = (
  content: React.ReactNode,
  options?: ToastOptions
): void => {
  toast(content, {
    ...defaultToastOptions,
    ...options,
  });
};

// Notification with progress
export const showProgressNotification = (
  message: string,
  progress: number,
  options?: ToastOptions
): void => {
  toast(
    <div>
      <div>{message}</div>
      <div
        style={{
          width: '100%',
          height: '4px',
          backgroundColor: '#e2e8f0',
          borderRadius: '2px',
          marginTop: '8px',
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: '100%',
            backgroundColor: '#2196f3',
            borderRadius: '2px',
            transition: 'width 0.3s ease-in-out',
          }}
        />
      </div>
    </div>,
    {
      ...defaultToastOptions,
      ...options,
    }
  );
};

// Notification with countdown
export const showCountdownNotification = (
  message: string,
  duration: number,
  options?: ToastOptions
): void => {
  let timeLeft = duration;
  const toastId = toast(
    <div>
      <div>{message}</div>
      <div style={{ marginTop: '8px' }}>
        Time remaining: {timeLeft}s
      </div>
    </div>,
    {
      ...defaultToastOptions,
      ...options,
      autoClose: duration * 1000,
    }
  );

  const interval = setInterval(() => {
    timeLeft -= 1;
    if (timeLeft <= 0) {
      clearInterval(interval);
      return;
    }

    update(toastId, {
      render: (
        <div>
          <div>{message}</div>
          <div style={{ marginTop: '8px' }}>
            Time remaining: {timeLeft}s
          </div>
        </div>
      ),
    });
  }, 1000);
};

// Notification with confirmation
export const showConfirmationNotification = (
  message: string,
  onConfirm: () => void,
  onCancel: () => void,
  options?: ToastOptions
): void => {
  toast(
    <div>
      <div>{message}</div>
      <div style={{ marginTop: '8px', display: 'flex', gap: '8px' }}>
        <button
          onClick={() => {
            onConfirm();
            dismissAll();
          }}
          style={{
            padding: '4px 8px',
            backgroundColor: '#2196f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Confirm
        </button>
        <button
          onClick={() => {
            onCancel();
            dismissAll();
          }}
          style={{
            padding: '4px 8px',
            backgroundColor: '#e2e8f0',
            color: '#1e293b',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Cancel
        </button>
      </div>
    </div>,
    {
      ...defaultToastOptions,
      ...options,
      autoClose: false,
    }
  );
}; 