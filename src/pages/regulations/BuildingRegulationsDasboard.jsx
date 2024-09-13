import React, { useState, useEffect } from "react";
import Button from "../../components/Button/index";
import ContainerHolder from "../../components/container/index";
import Modal from "../../components/Modal/index";
import Input from "../../components/Inputs/index";
import TextArea from "../../components/Inputs/TextArea";
import axios from "axios";
import ReactPaginate from "react-paginate";
import Pagination from "../../components/pagination/pagination";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/20/solid";

const API_URL = "http://localhost:8000/regulations";

export const BuildingRegulationsDasboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const regulationsPerPage = 5;
  const [regulations, setRegulations] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    regulationTitle: "",
    regulationDetails: "",
    regulationImage: null,
  });
  const [currentRegulation, setCurrentRegulation] = useState(null);

  // Fetch regulations from JSON server
  useEffect(() => {
    axios.get("http://localhost:8000/regulations").then((res) => {
      setRegulations(res.data);
    });
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    setFormData((prev) => ({
      ...prev,
      regulationImage: e.target.files[0],
    }));
  };

  // Open modal for adding or editing regulation
  const handleAddOrEdit = (regulation = null) => {
    setEditMode(!!regulation);
    if (regulation) {
      setFormData(regulation);
    } else {
      setFormData({
        id: "",
        regulationTitle: "",
        regulationDetails: "",
        regulationImage: null,
      });
    }
    setModalOpen(true);
  };

  // Save new or updated regulation
  const handleSave = () => {
    if (editMode) {
      // Update regulation
      axios
        .put(`http://localhost:8000/regulations/${formData.id}`, formData)
        .then(() => {
          const updatedRegs = regulations.map((reg) =>
            reg.id === formData.id ? formData : reg
          );
          setRegulations(updatedRegs);
          setModalOpen(false);
        });
    } else {
      // Add new regulation
      const newReg = { ...formData, id: Date.now() };
      axios.post("http://localhost:8000/regulations", newReg).then(() => {
        setRegulations((prev) => [...prev, newReg]);
        setModalOpen(false);
      });
    }
  };

  // Confirm deletion modal
  const handleDeleteConfirm = (regulation) => {
    setCurrentRegulation(regulation);
    setDeleteModalOpen(true);
  };

  // Delete regulation
  const handleDelete = () => {
    axios
      .delete(`http://localhost:8000/regulations/${currentRegulation.id}`)
      .then(() => {
        setRegulations((prev) =>
          prev.filter((reg) => reg.id !== currentRegulation.id)
        );
        setDeleteModalOpen(false);
      });
  };

  return (
    <ContainerHolder className="flex flex-col p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Building Regulations</h1>
        <Button value="Add Regulation" onClick={() => handleAddOrEdit()} />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {regulations.map((regulation) => (
          <div
            key={regulation.id}
            className="bg-white rounded-lg shadow-md p-4"
          >
            {/* <img
              src={URL.createObjectURL(regulation.regulationImage)}
              alt={regulation.regulationTitle}
              className="w-full h-48 object-cover mb-4 rounded-md"
            /> */}
            <h3 className="text-xl font-bold">{regulation.regulationTitle}</h3>
            <p className="text-sm text-gray-600 mt-2">
              {regulation.regulationDetails}
            </p>
            <div className="mt-4 flex justify-between">
              <Button
                value="Update"
                onClick={() => handleAddOrEdit(regulation)}
              />
              <Button
                value="Delete"
                className="bg-red-300 text-white"
                onClick={() => handleDeleteConfirm(regulation)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Component */}
      <Pagination
        previousLabel={<ChevronLeftIcon className="h-5 w-5" />}
        nextLabel={<ChevronRightIcon className="h-5 w-5" />}
        pageCount={5} // Example page count
      />

      {/* Add/Edit Regulation Modal */}
      {modalOpen && (
        <Modal toggleFunction={() => setModalOpen(false)}>
          <h2 className="text-lg font-bold mb-4">
            {editMode ? "Update Regulation" : "Add Regulation"}
          </h2>
          <Input
            name="regulationTitle"
            placeholder="Regulation Title"
            value={formData.regulationTitle}
            onChange={handleInputChange}
          />
          <TextArea
            name="regulationDetails"
            placeholder="Regulation Details"
            value={formData.regulationDetails}
            onChange={handleInputChange}
          />
          <input type="file" onChange={handleFileUpload} />

          <Button
            value={editMode ? "Update" : "Save"}
            onClick={handleSave}
            className="mt-4"
          />
        </Modal>
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
