import { Icon } from '@iconify/react';
import React from 'react';
import { Box } from 'zmp-ui';

interface PaginationProps {
  pageIndex: number; // Trang hiện tại (1-based index)
  pageSize: number; // Số mục trên mỗi trang
  totalItems: number; // Tổng số mục
  onPageChange: (params: { pageIndex: number; pageSize: number }) => void; // Hàm xử lý thay đổi trang
  onRowChange: (pageSize: number) => void; // Hàm xử lý thay đổi số mục trên mỗi trang
}

const TablePagination: React.FC<PaginationProps> = ({ pageIndex, pageSize, totalItems, onPageChange, onRowChange }) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  // Tạo danh sách nút trang với rút gọn
  const generatePages = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      // Hiển thị tất cả các trang nếu tổng số trang <= 5
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (pageIndex <= 2) {
        // Nếu trang hiện tại là 1 hoặc 2
        pages.push(1, 2, 3, '...', totalPages);
      } else if (pageIndex >= totalPages - 1) {
        // Nếu trang hiện tại là trang cuối hoặc áp chót
        pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        // Nếu trang hiện tại ở giữa
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
      <div className='flex items-center justify-end'>
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
