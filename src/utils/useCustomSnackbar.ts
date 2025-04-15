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

  const showError = (text: string) =>
    showSnackbar({
      text,
      type: 'error',
    });

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
