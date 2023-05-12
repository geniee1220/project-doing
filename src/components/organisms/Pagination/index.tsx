import React from "react";
import ReactPaginate from "react-paginate";
import StyledComponent from "./Pagination.style";

const { PaginationContainer } = StyledComponent;

interface PagenationProps {
  pageCount: number;
  handlePageClick: (data: { selected: number }) => void;
}

function Pagenation({ pageCount, handlePageClick }: PagenationProps) {
  return (
    <PaginationContainer>
      <ReactPaginate
        previousLabel={"이전"}
        nextLabel={"다음"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
        previousClassName={"pageLabelBtn"}
        nextClassName={"pageLabelBtn"}
      />
    </PaginationContainer>
  );
}

export default Pagenation;
