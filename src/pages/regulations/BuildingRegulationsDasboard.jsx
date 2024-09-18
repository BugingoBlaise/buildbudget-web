import { useState, useEffect, useCallback } from "react";
import Button from "../../components/Button/index";
import ContainerHolder from "../../components/container/index";
import axios from "axios";
import { AddRegulation } from "./child/AddRegulation";
import { UpdateRegulation } from "./child/UpdateRegulation";
import RegulationService from "./RegulationService";
import Modal from "../../components/Modal";
import { toast } from "react-toastify";

const API_URL = "http://localhost:8080/api/regulations";

export const BuildingRegulationsDahboard = () => {
  const [regulations, setRegulations] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentRegulation, setCurrentRegulation] = useState(null);

  const fetchRegulations = useCallback(() => {
    axios.get(API_URL).then((res) => {
      setRegulations(res.data);
    });
  }, []);

  useEffect(() => {
    fetchRegulations();
  }, [fetchRegulations]);

  const handleUpdateConfirm = (regulation) => {
    setCurrentRegulation(regulation);
    setEditModal(true);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    RegulationService.deleteRegulation(currentRegulation.id)
      .then(() => {
        setRegulations(
          regulations.filter((reg) => reg.id !== currentRegulation.id)
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

  return (
    <ContainerHolder className="flex flex-col p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Building Regulations</h1>
        <Button value="Add Regulation" onClick={() => setModalOpen(true)} />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {regulations.map((regulation) => (
          <div
            key={regulation.id}
            className="bg-white rounded-lg shadow-md p-4"
          >
            <img
              src={`${API_URL}/image/${regulation.regulationImagePath}`}
              alt={regulation.regulationTitle}
              className="w-full h-48 object-cover mb-4 rounded-md"
            />
            <h3 className="text-xl font-bold">{regulation.regulationTitle}</h3>
            <p className="text-sm text-gray-600 mt-2">
              {regulation.regulationDetails}
            </p>

            <div className="mt-4 flex justify-between">
              <Button
                value="Update"
                onClick={() => handleUpdateConfirm(regulation)}
              ></Button>
              <Button
                value="Delete"
                className="bg-yellow-300 text-white"
                onClick={() => {
                  setCurrentRegulation(regulation);
                  setDeleteModalOpen(true);
                }}
              />
            </div>
          </div>
        ))}
      </div>

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
          regulation={currentRegulation}
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
