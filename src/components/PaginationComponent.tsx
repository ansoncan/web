// src/components/PaginationComponent.tsx
import React from 'react';
import { Pagination } from 'react-bootstrap';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationComponent: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];

  // Add "First" button
  if (currentPage > 1) {
    pages.push(
      <Pagination.First
        key="first"
        onClick={() => onPageChange(1)}
      />
    );
  }

  // Add "Previous" button
  if (currentPage > 1) {
    pages.push(
      <Pagination.Prev
        key="previous"
        onClick={() => onPageChange(currentPage - 1)}
      />
    );
  }

  // Add page numbers
  const startPage = Math.max(1, currentPage - 4);
  const endPage = Math.min(totalPages, currentPage + 5);
  for (let i = startPage; i <= endPage; i++) {
    pages.push(
      <Pagination.Item
        key={i}
        active={currentPage === i}
        onClick={() => onPageChange(i)}
      >
        {i}
      </Pagination.Item>
    );
  }

  // Add "Next" button
  if (currentPage < totalPages) {
    pages.push(
      <Pagination.Next
        key="next"
        onClick={() => onPageChange(currentPage + 1)}
      />
    );
  }

  // Add "Last" button
  if (currentPage < totalPages) {
    pages.push(
      <Pagination.Last
        key="last"
        onClick={() => onPageChange(totalPages)}
      />
    );
  }

  return (
    <>
      <style>{`
        /* Override pagination colors to black */
        .pagination {
          justify-content: center;
        }
        .pagination .page-link {
          color: black !important;
          border-color: black !important;
        }
        .pagination .page-link:hover {
          color: #000000 !important;
          background-color: #e6e6e6 !important;
          border-color: black !important;
        }
        .pagination .page-item.active .page-link {
          background-color: black !important;
          border-color: black !important;
          color: white !important;
          font-weight: bold !important;
        }
        .pagination .page-link:focus {
          box-shadow: 0 0 0 0.25rem rgba(0,0,0,.25) !important;
        }
      `}</style>
      <Pagination>
        {pages}
      </Pagination>
    </>
  );
};

export default PaginationComponent;