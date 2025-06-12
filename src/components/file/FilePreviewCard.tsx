import { Icon } from '@iconify/react'; // hoặc bất kỳ icon lib nào bạn dùng
import React from 'react';
import { downloadFileHelper } from 'services/zalo';
import { useStoreApp } from 'store/store';
import { useCustomSnackbar } from 'utils/useCustomSnackbar';

type FilePreviewCardProps = {
  fileName: string;
  fileUrl: string;
  onClick?: () => void;
};

const FilePreviewCard: React.FC<FilePreviewCardProps> = ({ fileName, fileUrl, onClick }) => {

  const { showSuccess, showWarning } = useCustomSnackbar();
  const { setIsLoadingFullScreen } = useStoreApp();

  const handleClick = async () => {
    if (onClick) {
      return onClick();
    }

    setIsLoadingFullScreen(true);

    try {
      await downloadFileHelper(fileUrl);
      showSuccess('Tải tập tin thành công!');
    } catch (error) {
      showWarning('Tải tập tin thất bại!');
    } finally {
      setIsLoadingFullScreen(false);
    }
  };

  return (
    <div
      className="flex items-center justify-between mb-2 p-3 bg-gray-100 rounded-lg text-secondary-color font-medium cursor-pointer hover:bg-gray-200 transition"
      onClick={handleClick}
    >
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-6">
          <Icon icon="flat-color-icons:file" fontSize={22} />
        </div>
        <span className="text-sm font-medium truncate max-w-[200px]">{fileName}</span>
      </div>
      <div>
        <Icon icon="material-symbols:download-rounded" fontSize={22} />
      </div>
    </div>
  );
};

export default FilePreviewCard;
