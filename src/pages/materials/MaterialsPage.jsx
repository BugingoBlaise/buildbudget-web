import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import MaterialService from "./MaterialService";
import { toast } from "react-toastify";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import ContainerHolder from "../../components/container";
import { AddMaterial } from "./child/AddMaterial";
import { UpdateMaterial } from "./child/UpdateMaterial";

const API_URL = "http://localhost:8080/api/materials";
export const MaterialsPage = () => {
  const [materials, setMaterials] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentMaterial, setCurrentMaterial] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMaterials = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL);
      setMaterials(response.data);
      console.log(response.data);
    } catch (e) {
      console.error(e);
      setError("Failed to load materials please try again later");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMaterials();
  }, [fetchMaterials]);

  const handleUpdateConfirm = (mat) => {
    setCurrentMaterial(mat);
    setEditModal(true);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    MaterialService.deleteMaterial(currentMaterial.id)
      .then(() => {
        setMaterials(materials.filter((reg) => reg.id !== currentMaterial.id));
        setDeleteModalOpen(false);
        toast.success("Material deleted successfully!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdateSuccess = (updatedMaterial) => {
    setMaterials(
      materials.map((mat) =>
        mat.id === updatedMaterial.id ? updatedMaterial : mat
      )
    );
    setEditModal(false);
    toast.success("Materials updated successfully!");
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
        <h1 className="text-2xl font-bold">Materials Page</h1>
        <Button
          value="Add Material
        "
          onClick={() => setModalOpen(true)}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {materials.map((material) => (
          <div key={material.id} className="bg-white rounded-lg shadow-md p-4">
            <img
              src={`${API_URL}/image/${material.imagePath}`}
              alt={material.materialName}
              className="w-full h-48 object-cover mb-4 rounded-md"
            />
            <h3 className="text-xl font-bold">{material.materialName}</h3>
            <p className="text-sm text-gray-600 mt-2">
              {material.materialDetails}
            </p>

            <div className="mt-4 flex justify-between">
              <Button
                value="Update"
                onClick={() => handleUpdateConfirm(material)}
              ></Button>
              <Button
                value="Delete"
                className="bg-yellow-300 text-white"
                onClick={() => {
                  setCurrentMaterial(material);
                  setDeleteModalOpen(true);
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <AddMaterial
          onClose={() => setModalOpen(false)}
          onAddSuccess={(newMaterial) => {
            setMaterials([...materials, newMaterial]);
            setModalOpen(false);
          }}
        />
      )}

      {editModal && (
        <UpdateMaterial
          material={currentMaterial}
          onClose={() => setEditModal(false)}
          onUpdateSuccess={handleUpdateSuccess}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <Modal toggleFunction={() => setDeleteModalOpen(false)}>
          <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
          <p>Are you sure you want to delete this Material?</p>
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
