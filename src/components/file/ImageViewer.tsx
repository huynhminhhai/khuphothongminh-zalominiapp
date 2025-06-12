import { Icon } from '@iconify/react';
import React from 'react'
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { downloadFileHelper } from 'services/zalo';
import { useStoreApp } from 'store/store';
import { getFullImageUrl, isImage, isVideo } from 'utils/file';
import { useCustomSnackbar } from 'utils/useCustomSnackbar';
import { Box, Button, Swiper } from 'zmp-ui';

interface ImageViewerProps {
    files: any[];
}

const ImageViewer: React.FC<ImageViewerProps> = ({ files }) => {

    const { showSuccess, showWarning } = useCustomSnackbar();
    const { setIsLoadingFullScreen } = useStoreApp();

    return (
        <Box pb={4}>
            <PhotoProvider>
                <Swiper style={{ borderRadius: 8 }} loop>
                    {files.map((item, index) => {
                        const url = getFullImageUrl(item?.tapTin);
                        const alt = item?.tenTapTin || `media-${index}`;

                        const handleDownload = async () => {
                            setIsLoadingFullScreen(true);
                            try {
                                await downloadFileHelper(url);
                                showSuccess('Tải tập tin thành công!');
                            } catch (error) {
                                showWarning('Tải tập tin thất bại!');
                            } finally {
                                setIsLoadingFullScreen(false);
                            }
                        };

                        return (
                            <Swiper.Slide key={item?.tapTin}>
                                <div style={{ position: 'relative' }}>
                                    {isImage(item?.tapTin) ? (
                                        <PhotoView src={url}>
                                            <img
                                                src={url}
                                                alt={alt}
                                                style={{
                                                    width: '100%',
                                                    height: '200px',
                                                    objectFit: 'cover',
                                                    borderRadius: 8,
                                                    cursor: 'pointer',
                                                }}
                                            />
                                        </PhotoView>
                                    ) : isVideo(item?.tapTin) ? (
                                        <video
                                            src={url}
                                            controls
                                            style={{
                                                width: '100%',
                                                height: '200px',
                                                objectFit: 'cover',
                                                borderRadius: 8,
                                                backgroundColor: '#000',
                                            }}
                                        />
                                    ) : null}

                                    {/* Nút tải */}
                                    <div
                                        onClick={handleDownload}
                                        className='absolute top-2 right-2 flex items-center justify-center w-8 h-8 bg-white rounded-full shadow-md'
                                    >
                                        <Icon icon="material-symbols:download-rounded" fontSize={20} />
                                    </div>
                                </div>
                            </Swiper.Slide>
                        );
                    })}
                </Swiper>
            </PhotoProvider>
        </Box>
    )
}

export default ImageViewer