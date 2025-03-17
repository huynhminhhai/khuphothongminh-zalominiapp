import { Icon } from '@iconify/react';
import React from 'react';
import { Box } from 'zmp-ui';

interface PaginationProps {
  pageIndex: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (params: { pageIndex: number; pageSize: number }) => void;
  onRowChange: (pageSize: number) => void;
}

const TablePagination: React.FC<PaginationProps> = ({ pageIndex, pageSize, totalItems, onPageChange, onRowChange }) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  const generatePages = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (pageIndex <= 2) {
        pages.push(1, 2, 3, '...', totalPages);
      } else if (pageIndex >= totalPages - 1) {
        pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', pageIndex, '...', totalPages);
      }
    }

    return pages;
  };

  const handlePageChange = (newPageIndex: number | string) => {
    if (typeof newPageIndex === 'number' && newPageIndex !== pageIndex) {
      onPageChange({ pageIndex: newPageIndex, pageSize });
    }
  };

  const handleRowChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newPageSize = parseInt(event.target.value, 10);
    onRowChange(newPageSize); // Cập nhật pageSize
  };

  return (
    <Box mt={4}>
      <div className='flex items-center justify-center'>
        {/* Dropdown để thay đổi số mục trên mỗi trang */}
      <select
        value={pageSize}
        onChange={handleRowChange}
        className="ml-4 px-3 py-1 bg-gray-200 rounded"
      >
        {[10, 20, 50].map((size) => (
          <option key={size} value={size}>
            Hiển thị {size}
          </option>
        ))}
      </select>
      </div>
      <div className='mt-3 flex gap-2 items-center justify-center'>
        {/* Nút Prev */}
        <button
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          onClick={() => handlePageChange(pageIndex - 1)}
          disabled={pageIndex === 1}
        >
          <Icon icon='mingcute:left-line' fontSize={20} />
        </button>

        {/* Nút trang */}
        {generatePages().map((page, index) => (
          <button
            key={index}
            className={`px-3 py-1 rounded ${page === pageIndex ? 'bg-[#000] text-white' : 'bg-gray-200'
              }`}
            onClick={() => typeof page === 'number' && handlePageChange(page)}
            disabled={page === '...'}
          >
            {page}
          </button>
        ))}

        {/* Nút Next */}
        <button
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          onClick={() => handlePageChange(pageIndex + 1)}
          disabled={pageIndex === totalPages}
        >
          <Icon icon='mingcute:right-line' fontSize={20} />
        </button>
      </div>
    </Box>
  );
};

export default TablePagination;
