import React from 'react';
import ImageViewer from './ImageViewer';
import PdfViewer from './PdfViewer';
import FilePreviewCard from './FilePreviewCard';
import { getFullImageUrl, isImage, isPDF, isVideo } from 'utils/file';
import { Box } from 'zmp-ui';

type FileItem = {
  tapTin: string;
  tenTapTin: string;
};

type Props = {
  files?: FileItem[];
};

const FileViewerList: React.FC<Props> = ({ files = [] }) => {
  const imageFiles = files.filter(item => isImage(item.tapTin) || isVideo(item.tapTin));
  const otherFiles = files.filter(item => !isImage(item.tapTin) && !isVideo(item.tapTin));

  return (
    <>
      {
        files.length > 0 && (
          <h4 className="font-medium mb-2">Tập tin đính kèm:</h4>
        )
      }
      {imageFiles.length > 0 && <ImageViewer files={imageFiles} />}

      {otherFiles.length > 0 && (
        <Box className="text-secondary-color">
          {otherFiles.map((item) => (
            <div key={item.tapTin}>
              {isPDF(item.tapTin) ? (
                <PdfViewer
                  fileUrl={getFullImageUrl(item.tapTin)}
                  fileName={item.tenTapTin}
                />
              ) : (
                <FilePreviewCard
                  fileName={item.tenTapTin}
                  fileUrl={getFullImageUrl(item.tapTin)}
                />
              )}
            </div>
          ))}
        </Box>
      )}
    </>
  );
};

export default FileViewerList;
