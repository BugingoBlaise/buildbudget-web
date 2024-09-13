import React, { useMemo } from "react";
import MOCK_DATA from "../../assets/data/MOCK_DATA.json";
import {
  useTable,
  useGlobalFilter,
  useSortBy,
  usePagination,
} from "react-table";
import {
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/20/solid";
import COLUMNS from "../../constants/columns";

export const UsersDashboard = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    setGlobalFilter,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { pageIndex, globalFilter } = state;
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Search Filter */}
      <div className="mb-4 flex items-center">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 mr-2" />
        <input
          value={globalFilter || ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search users..."
        />
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table
          {...getTableProps()}
          className="min-w-full bg-white border border-gray-200 divide-y divide-gray-200 shadow-md"
        >
          <thead className="bg-gray-50">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                {headerGroup.headers.map((column) => {
                  const { key, ...rest } = column.getHeaderProps(
                    column.getSortByToggleProps()
                  );
                  return (
                    <th
                      key={key} // Explicitly pass the key prop
                      {...rest} // Spread the remaining props
                      className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none"
                    >
                      {column.render("Header")}
                      <span className="ml-1">
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <ChevronDownIcon className="h-4 w-4 inline" />
                          ) : (
                            <ChevronUpIcon className="h-4 w-4 inline" />
                          )
                        ) : (
                          ""
                        )}
                      </span>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody
            {...getTableBodyProps()}
            className="bg-white divide-y divide-gray-200"
          >
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  key={row.id}
                  className="hover:bg-gray-100"
                >
                  {row.cells.map((cell) => {
                    const { key, ...rest } = cell.getCellProps();
                    return (
                      <td
                        key={key} // Explicitly pass the key prop
                        {...rest} // Spread the remaining props
                        className="px-4 py-2 whitespace-nowrap text-sm text-gray-700"
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-center">
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className="px-3 py-1 text-sm font-medium text-gray-500 hover:text-gray-700 flex items-center"
        >
          <ChevronLeftIcon className="h-5 w-5" />
          Previous
        </button>
        <ul className="flex items-center space-x-2 mx-4">
          {pageOptions.map((pageNumber) => (
            <li key={pageNumber}>
              <button
                onClick={() => gotoPage(pageNumber)}
                className={`px-4 py-2 rounded-md ${
                  pageIndex === pageNumber
                    ? "bg-gray-800 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {pageNumber + 1}
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className="px-3 py-1 text-sm font-medium text-gray-500 hover:text-gray-700 flex items-center"
        >
          Next
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};
