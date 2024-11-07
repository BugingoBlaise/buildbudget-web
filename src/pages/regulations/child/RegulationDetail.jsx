import { useState, useEffect } from "react";
import Modal from "../../../components/Modal";
import Button from "../../../components/Button";
import { FaEdit, FaTimesCircle, FaTrash } from "react-icons/fa";

const API_URL = "http://localhost:8080/api/regulations";

const RegulationDetail = ({
  id,
  onBack,
  regulation: initialRegulation,
  onDelete,
  onUpdate,
}) => {
  const [regulation, setRegulation] = useState(initialRegulation || null);
  const [isLoading, setIsLoading] = useState(!initialRegulation);
  const [error, setError] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  useEffect(() => {
    // If we already have the regulation data, don't fetch
    if (initialRegulation) {
      return;
    }

    const fetchRegulation = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_URL}/${id}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (!data) {
          throw new Error("No data received");
        }

        setRegulation(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load regulation details. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchRegulation();
    }
  }, [id, initialRegulation]);

  const formatDate = (dateString) => {
    if (!dateString) return "Date not available";
    try {
      return new Date(dateString).toLocaleDateString();
    } catch (e) {
      return "Invalid date";
    }
  };

  const handleDelete = () => {
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    onDelete?.(regulation.id);
    setRegulation(null);
    setDeleteModalOpen(false);
  };

  const handleUpdate = () => {
    setUpdateModalOpen(true);
  };

  const handleUpdateCancel = () => {
    setUpdateModalOpen(false);
  };

  const handleUpdateSubmit = (updatedRegulation) => {
    onUpdate?.(updatedRegulation);
    setRegulation(updatedRegulation);
    setUpdateModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-rose-500 border-r-transparent align-[-0.125em]"
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
        <button
          onClick={onBack}
          className="mt-4 text-rose-500 hover:text-rose-600 font-medium"
        >
          ← Go Back
        </button>
      </div>
    );
  }

  if (!regulation) {
    return (
      <div className="p-4">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900">
            Regulation Not Found
          </h2>
          <p className="mt-2 text-gray-600">
            The regulation you're looking for doesn't exist.
          </p>
          <button
            onClick={onBack}
            className="mt-4 text-rose-500 hover:text-rose-600 font-medium"
          >
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <button
        onClick={onBack}
        className="mb-6 text-rose-500 hover:text-rose-600 font-medium flex items-center gap-2"
      >
        <span>←</span> Back to Regulations
      </button>

      <article className="bg-white rounded-lg shadow-lg overflow-hidden">
        {regulation.regulationImagePath && (
          <div className="relative h-64 w-full">
            <img
              src={`${API_URL}/image/${regulation.regulationImagePath}`}
              alt={regulation.regulationTitle}
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "/api/placeholder/800/400";
                e.target.alt = "Placeholder image";
              }}
            />
          </div>
        )}

        <div className="p-6">
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <span>{formatDate(regulation.date)}</span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {regulation.regulationTitle}
          </h1>

          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {regulation.regulationDetails}
            </p>
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <Button
              value={
                <span className="flex items-center gap-3">
                  <FaTrash size={20} />
                  <p>Delete</p>
                </span>
              }
              onClick={handleDelete}
            />
            <Button
              value={
                <span className="flex items-center gap-3">
                  <FaEdit size={20} />
                  <p>Update</p>
                </span>
              }
              className=""
              onClick={handleUpdate}
            />
          </div>
        </div>
      </article>

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <Modal toggleFunction={() => setDeleteModalOpen(false)}>
          <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
          <p>Are you sure you want to delete this regulation?</p>
          <div className="mt-4 flex justify-end">
            <Button
              value={
                <span className="flex items-center gap-3">
                  <FaTimesCircle size={20} />
                  <p>Cancel</p>
                </span>
              }
              className="mr-4"
              onClick={() => setDeleteModalOpen(false)}
            />
            <Button
              value={
                <span className="flex items-center gap-3">
                  <FaTrash size={20} />
                  <p>Delete</p>
                </span>
              }
              onClick={handleDeleteConfirm}
            />
          </div>
        </Modal>
      )}

      {/* Update Modal */}
      {updateModalOpen && (
        <Modal toggleFunction={() => setUpdateModalOpen(false)}>
          <h2 className="text-lg font-bold mb-4">Update Regulation</h2>
          {/* Add the update form here */}
          <div className="mt-4 flex justify-end">
            <Button
              value={
                <span className="flex items-center gap-3">
                  <FaTimesCircle size={20} />
                  <p>Cancel</p>
                </span>
              }
              className="mr-4"
              onClick={handleUpdateCancel}
            />
            <Button
              value={
                <span className="flex items-center gap-3">
                  <FaEdit size={20} />
                  <p>Update</p>
                </span>
              }
              className=""
              onClick={handleUpdateSubmit}
            ></Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default RegulationDetail;
