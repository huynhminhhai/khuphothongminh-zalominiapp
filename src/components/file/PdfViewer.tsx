import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { downloadFileHelper } from 'services/zalo';
import { useStoreApp } from 'store/store';
import { useCustomSnackbar } from 'utils/useCustomSnackbar';

interface PdfViewerProps {
    fileUrl: string;
    fileName?: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ fileUrl, fileName }) => {
    const { showSuccess, showWarning } = useCustomSnackbar();
    const { setIsLoadingFullScreen } = useStoreApp();

    const [numPages, setNumPages] = React.useState<number>(0);
    const [isOpen, setIsOpen] = useState(false);
    const [scale, setScale] = useState(1.0);

    const onLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
    };

    return (
        <>
            <div
                className="flex items-center justify-between mb-2 p-3 bg-gray-100 rounded-lg text-secondary-color font-medium"
                onClick={() => setIsOpen(true)}
            >
                <div className="flex items-center gap-2">
                    <div className="flex-1">
                        <Icon icon="material-icon-theme:pdf" fontSize={22} />
                    </div>
                    <span className="text-sm font-medium">{fileName}</span>
                </div>
            </div>

            {isOpen && (
                <div className="fixed left-0 top-0 flex items-center justify-center z-[9999]">
                    <div className="relative bg-white max-w-full w-[100vw] h-[calc(100vh-0px)] overflow-y-auto pt-[58px]">

                        <div className="px-4 py-3 h-[58px] flex items-center gap-3 fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-200">
                            {/* Nút Đóng */}
                            <div
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-3 text-gray-600 hover:text-black px-2 py-1 rounded"
                            >
                                <Icon icon="formkit:left" fontSize={20} />
                                <span className="text-[18px] leading-[1] font-semibold text-gray-900">Đóng</span>
                            </div>

                        </div>
                        {/* Nút chức năng */}
                        <div className="flex items-center gap-2 justify-between p-2 border-b border-gray-200 bg-gray-50">
                            <div className='flex items-center gap-1'>
                                <button
                                    onClick={() => setScale((s) => Math.max(0.5, s - 0.1))}
                                    className="w-6 h-6 text-lg font-semibold flex items-center justify-center rounded border border-gray-400"
                                    title="Thu nhỏ"
                                >
                                    <Icon icon="iconamoon:zoom-out-thin" fontSize={20} />
                                </button>
                                <span className="text-sm text-gray-600 w-[50px] text-center">
                                    {(scale * 100).toFixed(0)}%
                                </span>
                                <button
                                    onClick={() => setScale((s) => Math.min(3, s + 0.1))}
                                    className="w-6 h-6 text-lg font-semibold flex items-center justify-center rounded border border-gray-300"
                                    title="Phóng to"
                                >
                                    <Icon icon="iconamoon:zoom-in-thin" fontSize={20} />
                                </button>
                            </div>

                            <div
                                onClick={async () => {
                                    setIsLoadingFullScreen(true)
                                    try {
                                        await downloadFileHelper(fileUrl)

                                        showSuccess('Tải tập tin thành công!')
                                    } catch (error) {
                                        showWarning('Tải tập tin thất bại!')
                                    } finally {
                                        setIsLoadingFullScreen(false)
                                    }
                                }}
                                className="flex items-center gap-1 px-3 py-1 text-sm text-gray-700 rounded border border-gray-300"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-4 h-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 4v12" />
                                </svg>
                                <span>Tải xuống</span>
                            </div>

                        </div>


                        {/* PDF viewer */}
                        <Document
                            file={fileUrl}
                            onLoadSuccess={onLoadSuccess}
                            loading={<p className="text-center">Đang tải PDF...</p>}
                            error={<p className="text-red-500">Không thể tải PDF.</p>}
                        >
                            {Array.from(new Array(numPages), (_, index) => (
                                <Page
                                    key={index}
                                    pageNumber={index + 1}
                                    width={window.innerWidth}
                                    renderTextLayer={false}
                                    renderAnnotationLayer={false}
                                    scale={scale}
                                />
                            ))}
                        </Document>
                    </div>
                </div>
            )}
        </>
    );
};

export default PdfViewer;
