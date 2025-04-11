interface PaginationProps {
  currentPage: number; // Currently selected page
  totalPages: number; // Total number of pages available
  pageSize: number; // Number of results shown per page
  onPageChange: (newPage: number) => void; // Called when user navigates to a different page
  onPageSizeChange: (newSize: number) => void; // Called when user selects a different page size
}

const Pagination = ({
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) => {
  return (
    <div className="flex item-center justify-center mt-4">
      {/* Previous Button */}
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="btn btn-secondary mt-1"
      >
        Previous
      </button>

      {/* Numbered Page Buttons */}
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index + 1}
          onClick={() => onPageChange(index + 1)}
          disabled={currentPage === index + 1}
          className="btn btn-secondary mt-1 me-1 ms-1"
        >
          {index + 1}
        </button>
      ))}

      {/* Next Button */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="btn btn-secondary mt-1"
      >
        Next
      </button>

      <br />

      {/* Page Size Selector */}
      <label>
        Results per page:
        <select
          value={pageSize}
          onChange={(e) => {
            onPageSizeChange(Number(e.target.value)); // Apply new size
            onPageChange(1); // Reset to first page
          }}
          className="form-control"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </label>
    </div>
  );
};

export default Pagination;
