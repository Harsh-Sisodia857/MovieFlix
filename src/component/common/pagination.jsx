import React from "react";
import _ from 'lodash';

const Pagination = (props) => {
    const { itemsCount, pageSize,currentPage, onPageChange } = props;
    const pagesCount = Math.ceil(itemsCount / pageSize);
    if (pagesCount <= 1) return null;
    const pages = _.range(1, pagesCount + 1); // return array of pages
  return (
    <nav>
      <ul className="pagination" style={{cursor : "pointer"}}>
        {pages.map((page) => (
          <li className={page === currentPage ? "page-item active" : "page-item"} key={page}>
            <a href="#" onClick={() => onPageChange(page)} className="page-link">
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
