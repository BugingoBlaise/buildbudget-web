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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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
  if (isLoading)
    return (
      <div>
        <div
          className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
        <div
          className="inline-block h-12 w-12 animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-current align-[-0.125em] opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  if (error) return <div>Error: {error}</div>;
  return (
    <ContainerHolder className="flex flex-col p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Building Regulations</h1>
        <Button value="Add Regulation" onClick={() => setModalOpen(true)} />
      </div>

      {/* <div className="grid grid-cols-3 gap-4">
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
      </div> */}

      <div className="bg-white py-10 sm:py-15">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              From the RHA Blogs
            </h2>
            <p className="mt-2 text-lg/8 text-gray-600">
              Learn how to build nicely according to Rwanda Housing Authority.
            </p>
          </div>
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {regulations.map((post) => (
              <article
                key={post.id}
                className="flex max-w-xl flex-col items-start justify-between"
              >
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime={post.datetime} className="text-gray-500">
                    {/* {post.date} */}
                    Mar 16, 2020
                  </time>
                  <a
                    href="#"
                    // {post.category.href}
                    className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                  >
                    {post.regulationTitle}
                  </a>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                    <a href={post.href}>
                      <span className="absolute inset-0" />
                      {post.regulationTitle}
                    </a>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">
                    {post.regulationDetails}
                  </p>
                </div>
                <div className="relative mt-8 flex items-center gap-x-4">
                  <img
                    alt=""
                    src={`${API_URL}/image/${post.regulationImagePath}`}
                    className="h-10 w-10 rounded-full bg-gray-50"
                  />
                  <div className="text-sm/6">
                    <p className="font-semibold text-gray-900">
                      <a
                        href="#"
                        // {post.author.href}
                      >
                        <span className="absolute inset-0" />
                        {/* {post.author.name} */}
                        Blaise Mugisha
                      </a>
                    </p>
                    <p className="text-gray-600">
                      {/* {post.author.role} */}
                      ADMIN
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
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
