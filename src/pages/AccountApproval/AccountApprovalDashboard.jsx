import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8080/api/users";

export const AccountApprovalDashboard = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL);
      setUsers(response.data);
      console.log(response.data);
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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Users</h1>
            <p className="text-sm text-gray-500 mt-1">
              A list of all the users in your account including their name,
              title, email and role.
            </p>
          </div>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
            Add user
          </button>
        </div>
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 text-left text-sm font-semibold text-gray-900">
                Name
              </th>
              <th className="py-3 text-left text-sm font-semibold text-gray-900">
                Email
              </th>
              <th className="py-3 text-left text-sm font-semibold text-gray-900">
                Role
              </th>
              <th className="py-3"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-gray-100">
                <td className="py-4 text-sm text-gray-900">{user.username}</td>
                <td className="py-4 text-sm text-gray-500">
                  {user.userDetails.email}
                </td>
                <td className="py-4 text-sm text-gray-500">
                  {user.roles.join(", ")}
                </td>
                <td className="py-4 text-right">
                  <button className="text-indigo-600 hover:text-indigo-900">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
