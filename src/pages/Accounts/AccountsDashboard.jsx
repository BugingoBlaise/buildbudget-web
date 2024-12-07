import React, { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  useTable,
  useGlobalFilter,
  useSortBy,
  usePagination,
} from "react-table";
import { userColumns } from "./Column";
import AccountService from "./AccountService";
import { toast } from "react-toastify";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:8080/api/users";

export const AccountsDashboard = () => {
  const [accounts, setAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      const transformedData = response.data.map((user) => ({
        ...user,
        userDetails: user.userDetails || {}, // Ensure userDetails exists
        roles: user.roles || [], // Ensure roles exists
      }));
      setAccounts(transformedData);
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

  const memoizedColumns = useMemo(
    () => userColumns(setCurrentAccount, setDeleteModalOpen),
    [setCurrentAccount, setDeleteModalOpen]
  );

  const data = useMemo(() => accounts, [accounts]);

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
    { columns: memoizedColumns, data },
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

  if (isLoading)
    return (
      <div className="flex justify-center items-center p-8">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-whiteTheme-primaryColor border-r-transparent align-[-0.125em]"
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  if (error)
    return (
      <div className="p-4">
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
        <Link
          to={"#"}
          className="mt-4 text-rose-500 hover:text-rose-600 font-medium"
        >
          ← Go Back
        </Link>
      </div>
    );

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
            {headerGroups.map((headerGroup, i) => (
              <tr
                {...headerGroup.getHeaderGroupProps()}
                key={`header-group-${i}`}
                className="border-b border-gray-200"
              >
                {headerGroup.headers.map((column, j) => {
                  const headerProps = column.getHeaderProps();
                  // Remove the key from headerProps
                  const { key, ...restHeaderProps } = headerProps;
                  return (
                    <th
                      key={`header-${i}-${j}`}
                      {...restHeaderProps}
                      className="py-3 text-left text-sm font-semibold text-gray-900"
                    >
                      {column.render("Header")}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr
                  key={`row-${i}`}
                  {...row.getRowProps()}
                  className="border-b border-gray-100"
                >
                  {row.cells.map((cell, j) => {
                    const cellProps = cell.getCellProps();
                    // Remove the key from cellProps
                    const { key, ...restCellProps } = cellProps;
                    return (
                      <td
                        key={`cell-${i}-${j}`}
                        {...restCellProps}
                        className="py-4 text-sm text-gray-500"
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
              <li key={`page-${pageNumber}`}>
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

      {deleteModalOpen && (
        <Modal toggleFunction={() => setDeleteModalOpen(false)}>
          <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
          <p>
            Are you sure you want to delete this account of{" "}
            {currentAccount?.username}?
          </p>
          <div className="mt-4 flex justify-end">
            <Button
              value="Cancel"
              className="mr-4"
              onClick={() => setDeleteModalOpen(false)}
            />
            <Button
              value="Delete"
              className="bg-red-500"
              onClick={handleDelete}
            />
          </div>
        </Modal>
      )}
    </div>
  );
};
