import { useState, useEffect, useCallback } from "react";
import Button from "../../components/Button/index";
import ContainerHolder from "../../components/container/index";
import axios from "axios";
import { AddRegulation } from "./child/AddRegulation";
import { UpdateRegulation } from "./child/UpdateRegulation";
import RegulationService from "./RegulationService";
import Modal from "../../components/Modal";
import { toast } from "react-toastify";
import RegulationsList from "./child/RegulationList";
import RegulationDetail from "./child/RegulationDetail";

const API_URL = "http://localhost:8080/api/regulations";

export const BuildingRegulationsDahboard = () => {
  const [regulations, setRegulations] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentRegulation, setCurrentRegulation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [selectedRegulation, setSelectedRegulation] = useState(null);

  const fetchRegulations = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL);
      setRegulations(response.data);
    } catch (e) {
      console.error(e);
      setError("Failed to load regulations please try again later");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRegulations();
  }, [fetchRegulations]);

  const handleUpdateConfirm = (regulation) => {
    setCurrentRegulation(regulation);
    setEditModal(true);
  };

  const handleDelete = () => {
    RegulationService.deleteRegulation(selectedRegulation.id)
      .then(() => {
        setRegulations(
          regulations.filter((reg) => reg.id !== selectedRegulation.id)
        );
        setDeleteModalOpen(false);
        toast.success("Regulation deleted successfully!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdateSuccess = (updatedRegulation) => {
    setRegulations(
      regulations.map((reg) =>
        reg.id === updatedRegulation.id ? updatedRegulation : reg
      )
    );
    setEditModal(false);
    toast.success("Regulation updated successfully!");
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
          onClick={"#"}
          className="mt-4 text-rose-500 hover:text-rose-600 font-medium"
        >
          ← Go Back
        </button>
      </div>
    );
  }
  return (
    <ContainerHolder className="flex flex-col p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-end items-center mb-6">
        {/* <h1 className="text-2xl font-bold">Building Regulations</h1> */}
        <Button value="Add Regulation" onClick={() => setModalOpen(true)} />
      </div>

      {/* // In your render method: */}
      {!selectedRegulation ? (
        <RegulationsList
          regulations={regulations}
          onRegulationSelect={(regulation) => setSelectedRegulation(regulation)}
        />
      ) : (
        <RegulationDetail
          id={selectedRegulation.id}
          regulation={selectedRegulation} // Pass the full regulation object
          onBack={() => setSelectedRegulation(null)}
          onDelete={handleDelete}
          onUpdate={handleUpdateConfirm}
        />
      )}
      {modalOpen && (
        <AddRegulation
          onClose={() => setModalOpen(false)}
          onAddSuccess={(newRegulation) => {
            setRegulations([...regulations, newRegulation]);
            setModalOpen(false);
          }}
        />
      )}
      {editModal && (
        <UpdateRegulation
          regulation={selectedRegulation}
          onClose={() => setEditModal(false)}
          onUpdateSuccess={handleUpdateSuccess}
        />
      )}
      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <Modal toggleFunction={() => setDeleteModalOpen(false)}>
          <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
          <p>Are you sure you want to delete this regulation?</p>
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
    </ContainerHolder>
  );
};
