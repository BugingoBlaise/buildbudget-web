import React, { useState, useEffect } from "react";
import Button from "../../components/Button/index";
import ContainerHolder from "../../components/container/index";
import Modal from "../../components/Modal/index";
import Input from "../../components/Inputs/index";
import TextArea from "../../components/Inputs/TextArea";
import axios from "axios";

const API_URL = "http://localhost:8000/regulations";

export const BuildingRegulationsDasboard = () => {
  const [regulations, setRegulations] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentRegulation, setCurrentRegulation] = useState(null);
  const [newRegulation, setNewRegulation] = useState({
    id: null,
    regulationTitle: "",
    regulationDetails: "",
    regulationImage: null,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  // Fetch regulations from JSON server
  const fetchRegulations = async () => {
    const res = await axios.get(API_URL);
    setRegulations(res.data);
  };

  useEffect(() => {
    fetchRegulations();
  }, []);

  // Add or update regulation
  const handleSaveRegulation = async () => {
    if (newRegulation.id) {
      // Update existing regulation
      await axios.put(`${API_URL}/${newRegulation.id}`, newRegulation);
    } else {
      // Add new regulation
      await axios.post(API_URL, newRegulation);
    }
    fetchRegulations();
    setModalOpen(false);
    resetForm();
  };

  // Open modal for editing regulation
  const handleEditRegulation = (regulation) => {
    setNewRegulation(regulation);
    setModalOpen(true);
  };

  // Delete regulation
  const handleDeleteRegulation = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchRegulations();
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRegulations = regulations.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const resetForm = () => {
    setNewRegulation({
      id: null,
      regulationTitle: "",
      regulationDetails: "",
      regulationImage: null,
    });
  };

  const openModal = () => {
    setModalOpen(true);
    resetForm();
  };

  const handleChange = (e) => {
    setNewRegulation({
      ...newRegulation,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <ContainerHolder>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Building Regulations</h1>
        <Button value="Add Regulation" onClick={openModal} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4">
        {currentRegulations.map((regulation) => (
          <div
            key={regulation.id}
            className="border rounded-lg p-4 shadow-lg flex justify-between items-center"
          >
            <div>
              <h2 className="text-xl font-bold">
                {regulation.regulationTitle}
              </h2>
              <p>{regulation.regulationDetails}</p>
            </div>
            <div className="flex space-x-2">
              <Button
                value="Update"
                className="bg-blue-500"
                onClick={() => handleEditRegulation(regulation)}
              />
              <Button
                value="Delete"
                className="bg-red-500"
                onClick={() => handleDeleteRegulation(regulation.id)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <Button value="Prev" onClick={() => setCurrentPage(currentPage - 1)} />
        <span className="mx-2">{currentPage}</span>
        <Button value="Next" onClick={() => setCurrentPage(currentPage + 1)} />
      </div>

      {/* Modal for adding/updating regulation */}
      {modalOpen && (
        <Modal toggleFunction={() => setModalOpen(false)}>
          <h2 className="text-xl font-bold mb-4">
            {newRegulation.id ? "Update Regulation" : "Add Regulation"}
          </h2>
          <Input
            placeholder="Regulation Title"
            name="regulationTitle"
            value={newRegulation.regulationTitle}
            onChange={handleChange}
            required
          />
          <TextArea
            placeholder="Regulation Details"
            name="regulationDetails"
            value={newRegulation.regulationDetails}
            onChange={handleChange}
            required
          />
          <Button value="Save" onClick={handleSaveRegulation} />
        </Modal>
      )}
    </ContainerHolder>
  );
};
