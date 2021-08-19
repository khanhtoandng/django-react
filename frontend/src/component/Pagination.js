import React from 'react';
import PropTypes from 'prop-types';

const Pagination = (props) => {
  const {
    onPageChange, totalPages, page,
  } = props;

  function handleAddPage(index) {
    if (index === page) {
      return (
        <li className="page-item active" key={index}>
          <button type="button" className="page-link" onClick={() => onPageChange(page)}>
            {page}
          </button>
        </li>
      );
    }

    return (
      <li className="page-item" key={index}>
        <button type="button" className="page-link" onClick={() => onPageChange(index)}>
          {index}
        </button>
      </li>
    );
  }

  function handleGeneratePage() {
    const pageArray = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i += 1) {
        pageArray.push(handleAddPage(i));
      }
      return pageArray;
    }

    if (totalPages > 5) {
      if (page <= 3) {
        for (let i = 1; i <= 5; i += 1) {
          pageArray.push(handleAddPage(i));
        }
        return pageArray;
      }

      if (page >= (totalPages - 2)) {
        for (let i = totalPages - 4; i <= totalPages; i += 1) {
          pageArray.push(handleAddPage(i));
        }
        return pageArray;
      }

      if (page > 3 && page < (totalPages - 2)) {
        for (let i = page - 2; i <= page + 2; i += 1) {
          pageArray.push(handleAddPage(i));
        }
        return pageArray;
      }
    }

    return null;
  }

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination pagination-lg">
        <li className="page-item">
          <button type="button" className="page-link" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
            Prev
          </button>
        </li>
        {handleGeneratePage()}
        <li className="page-item">
          <button type="button" className="page-link" disabled={page >= totalPages} onClick={() => onPageChange(page + 1)}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  onPageChange: PropTypes.func,
  totalPages: PropTypes.number,
  page: PropTypes.number,
};

Pagination.default = {
  onPageChange: null,
};

export default Pagination;
