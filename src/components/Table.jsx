import { useMemo } from "react";
import { useTable, useSortBy, useFilters, usePagination } from "react-table";
import styled from "styled-components";

const StyledTableDivContainer = styled.div`
  text-align: center;
  width: 90%;
  margin: auto;
  margin-top: 1em;
`;

const StyledTableContainer = styled.table`
  border-left: 1px solid black;
  border-top: 1px solid black;
  border-spacing: 0;
  box-shadow: 0 1px 1px rgb(0 0 0 / 25%), 0 2px 2px rgb(0 0 0 / 20%),
    0 4px 4px rgb(0 0 0 / 15%), 0 8px 8px rgb(0 0 0 / 10%),
    0 16px 16px rgb(0 0 0 / 5%);
  margin-bottom: 1em;
  width: 100%;

  th,
  td {
    padding: 0.5rem;
    border-bottom: 1px solid black;
    border-right: 1px solid #000000;
    height: 2.5em;
    width: 15em;
    border-right: 1px solid white;
  }
`;

const TableButtonsContainer = styled.div`
  & button {
    color: white;
    background-color: #264653;
    padding: 0.2em;
    cursor: pointer;
    font-weight: bold;
  }

  & button:disabled {
    color: #264653;
    background-color: #264653;
    cursor: default;
  }
`;

export default function Table({ columns, data }) {
  const defaultColumn = useMemo(
    () => ({
      Filter: TextFilter,
    }),
    []
  );

  function TextFilter({ column: { filterValue, preFilteredRows, setFilter } }) {
    const count = preFilteredRows.length;

    return (
      <input
        value={filterValue || ""}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}
        placeholder={`Search ${count} records...`}
      />
    );
  }

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    pageOptions,
    state: { pageIndex, pageSize },
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage,
    gotoPage,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: { pageSize: 7 },
    },
    useFilters,
    useSortBy,
    usePagination
  );

  return (
    <StyledTableDivContainer>
      <StyledTableContainer {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps({
                    style: { minWidth: column.minWidth, width: column.width },
                  })}
                >
                  <div {...column.getSortByToggleProps()}>
                    {column.render("Header") + " "}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? "🔽"
                          : "🔼"
                        : ""}
                    </span>
                  </div>
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </StyledTableContainer>
      <TableButtonsContainer>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"First"}
        </button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous Page
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next Page
        </button>
        <button
          onClick={() => gotoPage(pageOptions.length - 1)}
          disabled={!canNextPage}
        >
          {"Last"}
        </button>{" "}
        <div>
          Page{" "}
          <em>
            {pageIndex + 1} of {pageOptions.length}
          </em>
        </div>
      </TableButtonsContainer>
    </StyledTableDivContainer>
  );
}
