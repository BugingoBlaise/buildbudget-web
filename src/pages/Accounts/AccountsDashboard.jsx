import React, { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  useTable,
  useGlobalFilter,
  useSortBy,
  usePagination,
} from "react-table";
import { userColumns } from "./Column"; // Import the columns as a function
import AccountService from "./AccountService";
import { toast } from "react-toastify";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
const API_URL = "http://localhost:8080/api/users";

export const AccountsDashboard = () => {
  const [accounts, setAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false); // Control modal visibility

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL);
      setAccounts(response.data);
    } catch (e) {
      console.error(e);
      setError("Failed to fetch users. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Memoize the columns to prevent re-renders and infinite loops
  const memoizedColumns = useMemo(
    () => userColumns(setCurrentAccount, setDeleteModalOpen),
    [setCurrentAccount, setDeleteModalOpen]
  );

  // Memoized data for react-table
  const data = useMemo(() => accounts, [accounts]);

  // Use the react-table hooks including global filter (search)
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    nextPage,
  } = useTable(
    { columns: memoizedColumns, data }, // Use the memoized columns here
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { pageIndex, globalFilter } = state;

  const handleDelete = async () => {
    try {
      await AccountService.deleteAccount(currentAccount.id);
      setAccounts(accounts.filter((acc) => acc.id !== currentAccount.id));
      setDeleteModalOpen(false);
      toast.success("Account deleted successfully!");
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error("Failed to delete account. Please try again.");
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <div className="mb-4 flex items-center">
              <input
                value={globalFilter || ""}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search users..."
              />
            </div>
          </div>
          <button className="px-4 py-2 text-white rounded-md bg-whiteTheme-primaryColor transition-colors">
            Add user
          </button>
        </div>
        <table {...getTableProps()} className="min-w-full">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr
                {...headerGroup.getHeaderGroupProps()}
                className="border-b border-gray-200"
              >
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className="py-3 text-left text-sm font-semibold text-gray-900"
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className="border-b border-gray-100">
                  {row.cells.map((cell) => (
                    <td
                      key={cell.getCellProps().key}
                      className="py-4 text-sm text-gray-500"
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
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

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <Modal toggleFunction={() => setDeleteModalOpen(false)}>
          <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
          <p>Are you sure you want to delete {currentAccount?.username}?</p>
          <div className="mt-4 flex justify-end">
            <Button
              value="Cancel"
              className="mr-4"
              onClick={() => setDeleteModalOpen(false)}
            />
            <Button
              value="Delete"
              className="bg-red-500"
              onClick={handleDelete} // Trigger the delete action
            />
          </div>
        </Modal>
      )}
    </div>
  );
};
