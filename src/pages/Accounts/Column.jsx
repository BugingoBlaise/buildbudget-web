import { FaPencilAlt, FaTrash } from "react-icons/fa";

export const userColumns = (setCurrentAccount, setDeleteModalOpen) => [
  {
    Header: "Username",
    accessor: "username",
  },
  {
    Header: "Email",
    accessor: (user) => {
      // Safe access to nested email property with null checks
      return user?.userDetails?.email || "N/A";
    },
  },
  {
    // Header: "Roles",
    // accessor: (user) => user.roles.join(", "),

    Header: "Roles",
    accessor: (user) => {
      // Safe access to roles array with null check
      return Array.isArray(user?.roles) ? user.roles.join(", ") : "N/A";
    },
  },
  {
    Header: "Actions",
    accessor: "actions",
    Cell: ({ row }) => (
      <div className="flex space-x-4">
        {/* Flexbox to align buttons horizontally */}
        <button
          className="text-indigo-600 hover:text-indigo-900"
          // onClick={() => handleEdit(row.original)} // Add your edit handler
        >
          <FaPencilAlt />
        </button>
        <button
          onClick={() => {
            setCurrentAccount(row.original); // Set current user
            setDeleteModalOpen(true); // Open delete confirmation modal
          }}
          className="text-red-600 hover:text-red-900"
        >
          <FaTrash />
        </button>
      </div>
    ),
  },
];
