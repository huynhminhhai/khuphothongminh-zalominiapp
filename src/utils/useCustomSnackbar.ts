import { useSnackbar } from 'zmp-ui';

export const useCustomSnackbar = () => {
  const { openSnackbar } = useSnackbar();
  const showSnackbar = options => {
    openSnackbar({
      icon: true,
      action: { text: 'Đóng', close: true },
      duration: 3000,
      ...options,
    });
  };

  const showError = (error: unknown) => {
    const message =
      typeof error === 'string'
        ? error
        : error instanceof Error
          ? error.message
          : 'Đã xảy ra lỗi không xác định';

    showSnackbar({
      text: message,
      type: 'error',
    });
  };

  const showSuccess = (text: string) =>
    showSnackbar({
      text,
      type: 'success',
    });
  const showWarning = (text: string) =>
    showSnackbar({
      text,
      type: 'warning',
    });
  return {
    showSnackbar,
    showError,
    showSuccess,
    showWarning,
  };
};
