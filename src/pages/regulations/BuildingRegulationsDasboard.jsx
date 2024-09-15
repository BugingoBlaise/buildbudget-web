import React, { useState, useEffect } from "react";
import Button from "../../components/Button/index";
import ContainerHolder from "../../components/container/index";
import { ToastContainer, toast } from "react-toastify";

import Modal from "../../components/Modal/index";
import Input from "../../components/Inputs/index";
import TextArea from "../../components/Inputs/TextArea";
import axios from "axios";
import Pagination from "../../components/pagination/pagination";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/20/solid";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AddRegulation } from "./AddRegulation";
import { UpdateRegulation } from "./UpdateRegulation";
import RegulationService from "./RegulationService";

const API_URL = "http://localhost:8080/api/regulations";

export const BuildingRegulationsDasboard = () => {
  const navigate = useNavigate();
  const {
    control,
    // handleSubmit,
    formState: { errors },
  } = useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const regulationsPerPage = 5;
  const [regulations, setRegulations] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModal, setEditModal] = useState(false);
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
    axios.get(API_URL).then((res) => {
      setRegulations(res.data);
    });
  }, []);

  // // Handle input changes
  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // };

  // // Handle file upload
  // const handleFileUpload = (e) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     regulationImage: e.target.files[0],
  //   }));
  // };

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

  const handleDeleteConfirm = (regulation) => {
    console.log("at handleDeleteMethod:", regulation.id);
    setCurrentRegulation(regulation);
    setDeleteModalOpen(true);
  };

  // Delete regulation
  const handleDelete = (e) => {
    // axios
    //   .delete(`http://localhost:8000/regulations/${currentRegulation.id}`)
    //   .then(() => {
    //     setRegulations((prev) =>
    //       prev.filter((reg) => reg.id !== currentRegulation.id)
    //     );
    //     setDeleteModalOpen(false);
    //   });
    // currentRegulation.id
    e.preventDefault();
    console.log("Id to be deleted is: ", currentRegulation.id);
    RegulationService.deleteRegulation(currentRegulation.id)
      .then((res) => {
        console.log("Regulation deleted is :" + res);
        setDeleteModalOpen(false);
        // toast.success("Deleted Successfully", {
        //   position: "top-center",
        // });
      })
      .catch((error) => {
        console.log(error);
        // toast.error("ID does not exist", {
        //   position: "top-center",
        // });
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
            <img
              src={`https://images.unsplash.com/photo-1725908475743-138ffa142cd4?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
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
                onClick={() => {
                  setEditModal(true);
                }}
              />
              <Button
                value="Delete"
                className="bg-yellow-300 text-white"
                onClick={() => {
                  handleDeleteConfirm(regulation);
                  console.log(regulation.id);
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Component */}
      <Pagination
        previousLabel={<ChevronLeftIcon className="h-5 w-5" />}
        nextLabel={<ChevronRightIcon className="h-5 w-5" />}
        pageCount={3} // Example page count
      />

      {/* Add/Edit Regulation Modal */}
      {modalOpen && (
        <AddRegulation
          onClose={() => {
            setModalOpen(false);
          }}
        />
      )}
      {editModal && (
        <UpdateRegulation
          onClose={() => {
            setEditModal(false);
          }}
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
