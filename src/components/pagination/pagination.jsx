import React from "react";

const Pagination = ({
  previousLabel,
  nextLabel,
  pageCount,
  currentPage,
  onPageChange,
}) => {
  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= pageCount; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`px-4 py-2 mx-1 rounded-md ${
            currentPage === i
              ? "bg-gray-900 text-white"
              : "bg-gray-200 text-gray-600 hover:bg-gray-300"
          }`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="flex justify-center items-center mt-6">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-2 mr-2 rounded-md ${
          currentPage === 1
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
      >
        {previousLabel}
      </button>

      {/* Page Numbers */}
      <div className="flex">{renderPageNumbers()}</div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === pageCount}
        className={`px-3 py-2 ml-2 rounded-md ${
          currentPage === pageCount
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
      >
        {nextLabel}
      </button>
    </div>
  );
};

export default Pagination;
