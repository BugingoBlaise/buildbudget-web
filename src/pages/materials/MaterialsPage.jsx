// import axios from "axios";
// import { useCallback, useEffect, useState } from "react";
// import MaterialService from "./MaterialService";
// import { toast } from "react-toastify";
// import Button from "../../components/Button";
// import Modal from "../../components/Modal";
// import ContainerHolder from "../../components/container";
// import { AddMaterial } from "./child/AddMaterial";
// import { UpdateMaterial } from "./child/UpdateMaterial";
// import MaterialCard from "../../components/card/MaterialCard";

// const API_URL = "http://localhost:8080/api/materials";
// export const MaterialsPage = () => {
//   const [materials, setMaterials] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [editModal, setEditModal] = useState(false);
//   const [deleteModalOpen, setDeleteModalOpen] = useState(false);
//   const [currentMaterial, setCurrentMaterial] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchMaterials = useCallback(async () => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const response = await axios.get(API_URL);
//       setMaterials(response.data);
//       console.log(response.data);
//     } catch (e) {
//       console.error(e);
//       setError("Failed to load materials please try again later");
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchMaterials();
//   }, [fetchMaterials]);

//   const handleUpdateConfirm = (mat) => {
//     setCurrentMaterial(mat);
//     setEditModal(true);
//   };

//   const handleDelete = (e) => {
//     e.preventDefault();
//     MaterialService.deleteMaterial(currentMaterial.id)
//       .then(() => {
//         setMaterials(materials.filter((reg) => reg.id !== currentMaterial.id));
//         setDeleteModalOpen(false);
//         toast.success("Material deleted successfully!");
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   const handleUpdateSuccess = (updatedMaterial) => {
//     setMaterials(
//       materials.map((mat) =>
//         mat.id === updatedMaterial.id ? updatedMaterial : mat
//       )
//     );
//     setEditModal(false);
//     toast.success("Materials updated successfully!");
//   };
//   if (isLoading)
//     return (
//       <div className="flex justify-center items-center p-8">
//         <div
//           className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-whiteTheme-primaryColor border-r-transparent align-[-0.125em]"
//           role="status"
//         >
//           <span className="sr-only">Loading...</span>
//         </div>
//       </div>
//     );
//   if (error) {
//     return (
//       <div className="p-4">
//         <div className="bg-red-50 border-l-4 border-red-500 p-4">
//           <div className="flex">
//             <div className="ml-3">
//               <p className="text-sm text-red-700">{error}</p>
//             </div>
//           </div>
//         </div>
//         <button
//           onClick={"#"}
//           className="mt-4 text-rose-500 hover:text-rose-600 font-medium"
//         >
//           ← Go Back
//         </button>
//       </div>
//     );
//   }

//   return (
//     <ContainerHolder className="flex flex-col p-6 bg-gray-100 min-h-screen">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Materials Page</h1>
//         <Button
//           value="Add Material
//         "
//           onClick={() => setModalOpen(true)}
//         />
//       </div>
//       <MaterialCard />
//       <div className="grid grid-cols-3 gap-4">
//         {materials.map((material) => (
//           <div key={material.id} className="bg-white rounded-lg shadow-md p-4">
//             <img
//               src={`${API_URL}/image/${material.imagePath}`}
//               alt={material.materialName}
//               className="w-full h-48 object-cover mb-4 rounded-md"
//             />
//             <h3 className="text-xl font-bold">{material.materialName}</h3>
//             <p className="text-sm text-gray-600 mt-2">
//               {material.materialDetails}
//             </p>

//             <div className="mt-4 flex justify-between">
//               <Button
//                 value="Update"
//                 onClick={() => handleUpdateConfirm(material)}
//               ></Button>
//               <Button
//                 value="Delete"
//                 className="bg-yellow-300 text-white"
//                 onClick={() => {
//                   setCurrentMaterial(material);
//                   setDeleteModalOpen(true);
//                 }}
//               />
//             </div>
//           </div>
//         ))}
//       </div>
//       {modalOpen && (
//         <AddMaterial
//           onClose={() => setModalOpen(false)}
//           onAddSuccess={(newMaterial) => {
//             setMaterials([...materials, newMaterial]);
//             setModalOpen(false);
//           }}
//         />
//       )}
//       {editModal && (
//         <UpdateMaterial
//           material={currentMaterial}
//           onClose={() => setEditModal(false)}
//           onUpdateSuccess={handleUpdateSuccess}
//         />
//       )}
//       {/* Delete Confirmation Modal */}
//       {deleteModalOpen && (
//         <Modal toggleFunction={() => setDeleteModalOpen(false)}>
//           <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
//           <p>Are you sure you want to delete this Material?</p>
//           <div className="mt-4 flex justify-end">
//             <Button
//               value="Cancel"
//               className="mr-4"
//               onClick={() => setDeleteModalOpen(false)}
//             />
//             <Button
//               value="Delete"
//               className="bg-red-500"
//               onClick={handleDelete}
//             />
//           </div>
//         </Modal>
//       )}
//     </ContainerHolder>
//   );
// };

import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// MUI Joy UI Imports
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";

// MUI Icons
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
// import MoreVertIcon from "@mui/icons-material/MoreVert";

import MaterialService from "./MaterialService";
import ContainerHolder from "../../components/container";
import { AddMaterial } from "./child/AddMaterial";
import { UpdateMaterial } from "./child/UpdateMaterial";
import Modal from "../../components/Modal";

const API_URL = "http://localhost:8080/api/materials";
const API = "http://localhost:8080/api/users/me";
export const MaterialsPage = () => {
  const [materials, setMaterials] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentMaterial, setCurrentMaterial] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [currentUser, setCurrentUser] = useState(null);

  // Get JWT token from local storage
  const token = localStorage.getItem("token"); // Assumes token is stored on login

  const fetchCurrentUser = useCallback(async () => {
    try {
      const response = await axios.get("/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCurrentUser(response.data);
    } catch (error) {
      console.error("Failed to fetch current user", error);
    }
  }, [token]);

  const fetchMaterials = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMaterials(response.data);
      console.log(response.data);
    } catch (e) {
      console.error(e);
      setError("Failed to load materials please try again later");
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchCurrentUser();
      fetchMaterials();
    }
  }, [fetchCurrentUser, fetchMaterials, token]);

  // Helper function to check if current user can edit material
  const canEditMaterial = (material) => {
    // Check if the current user is the supplier of this material
    return (
      currentUser &&
      material.supplier &&
      material.supplier.id === currentUser.supplierId
    );
  };

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
          onClick={() => {}}
          className="mt-4 text-rose-500 hover:text-rose-600 font-medium"
        >
          ← Go Back
        </button>
      </div>
    );
  }

  return (
    <ContainerHolder className="flex flex-col p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Materials Page</h1>
        <Button
          variant="solid"
          color="primary"
          onClick={() => setModalOpen(true)}
        >
          Add Material
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {materials.map((material) => (
          <Card key={material.id} sx={{ width: "100%" }}>
            <div className="relative flex justify-between items-center p-3">
              <div>
                <Typography level="title-lg">
                  {material.materialName}
                </Typography>
                <Typography level="body-sm">Material Details</Typography>
              </div>
              {canEditMaterial(material) && (
                <div className="flex items-center space-x-2">
                  <IconButton
                    variant="soft"
                    color="primary"
                    size="sm"
                    onClick={() => handleUpdateConfirm(material)}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    variant="soft"
                    color="danger"
                    size="sm"
                    onClick={() => {
                      setCurrentMaterial(material);
                      setDeleteModalOpen(true);
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </div>
              )}
            </div>
            <AspectRatio minHeight="120px" maxHeight="200px">
              <img
                src={`${API_URL}/image/${material.imagePath}`}
                alt={material.materialName}
                loading="lazy"
                className="object-cover"
              />
            </AspectRatio>
            <CardContent>
              <Typography level="body-xs" sx={{ mb: 1 }}>
                More about product
              </Typography>
              <Typography
                sx={{ fontSize: "lg", fontWeight: "lg", mb: 2 }}
                className="truncate"
              ></Typography>

              <Typography
                level="body-xs"
                sx={{ fontSize: "lg", fontWeight: "lg" }}
              >
                Price: RWF {material.price}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Existing Modals */}
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
              variant="outlined"
              color="neutral"
              onClick={() => setDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="solid"
              color="danger"
              onClick={handleDelete}
              sx={{ ml: 2 }}
            >
              Delete
            </Button>
          </div>
        </Modal>
      )}
    </ContainerHolder>
  );
};
