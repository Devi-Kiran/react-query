import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";

const colorsFetcher = (pageNumber) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageNumber}`);
};
function PaginatedQueriesPage() {
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading, isError, error, isFetching } = useQuery(
    ["colors", pageNumber],
    () => colorsFetcher(pageNumber),{
      keepPreviousData: true
    }
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>{error.message}</p>;
  }

  return (
    <div>
      <h1>Paginated Queries Page</h1>

      {data?.data.map((color) => {
        return <p key={color.id}>{color.label}</p>;
      })}

      <button
        onClick={() => setPageNumber((prev) => prev - 1)}
        disabled={pageNumber === 1}
      >
        prev
      </button>
      <button
        onClick={() => setPageNumber((prev) => prev + 1)}
        disabled={pageNumber === 4}
      >
        next
      </button><br/>
    </div>
  );
}

export default PaginatedQueriesPage;
