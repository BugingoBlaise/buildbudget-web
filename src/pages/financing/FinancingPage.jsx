import { useState, useEffect, useCallback } from "react";
import Button from "../../components/Button/index";
import ContainerHolder from "../../components/container/index";
import axios from "axios";
import { AddLoan } from "../financing/child/AddLoan";
import { UpdateLoan } from "../financing/child/UpdateLoan";
import LoanService from "./LoanService";
import Modal from "../../components/Modal";
import { toast } from "react-toastify";
// import { data } from "autoprefixer";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";

const API_URL = "http://localhost:8080/api/loans";

export const FinancingPage = () => {
  const [loans, setLoans] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentLoan, setCurrentLoan] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLoans = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL);
      setLoans(response.data);
      // if (response.data) {
      //   console.log(response.data);
      // }
    } catch (e) {
      console.log(e);
      setError("Failed to load financing options");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLoans();
  }, [fetchLoans]);

  const handleUpdateConfirm = (loan) => {
    setCurrentLoan(loan);
    setEditModal(true);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    LoanService.deleteLoan(currentLoan.id)
      .then(() => {
        setLoans(loans.filter((loan) => loan.id !== currentLoan.id));
        setDeleteModalOpen(false);
        toast.success("Loan deleted successfully!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdateSuccess = (updatedLoan) => {
    setLoans(
      loans.map((loan) => (loan.id === updatedLoan.id ? updatedLoan : loan))
    );
    setEditModal(false);
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
  if (error) return <div>Error: {}</div>;
  return (
    <ContainerHolder className="flex flex-col p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Financing Options </h1>
        <Button value="Add Loan" onClick={() => setModalOpen(true)} />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {loans.map((loan, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-4 relative"
          >
            <img
              src={`${API_URL}/image/${loan.imagePath}`}
              alt={loan.loanName}
              className="w-full h-48 object-cover mb-4 rounded-md"
            />
            <h3 className="text-xl font-bold">{loan.loanName}</h3>
            <p className="text-sm text-gray-600 mt-2">{loan.description}</p>

            <div className="flex justify bottom-0">
              <Button
                className={""}
                value={
                  <span className="flex items-center gap-3">
                    <CiEdit size={20} />
                    <p>Update</p>
                  </span>
                }
                onClick={() => handleUpdateConfirm(loan)}
              ></Button>
              <Button
                value={
                  <span className="flex items-center gap-3">
                    <MdDeleteForever size={20} />
                    <p>Delete</p>
                  </span>
                }
                className="bg-red-600 text-white"
                onClick={() => {
                  setCurrentLoan(loan);
                  setDeleteModalOpen(true);
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <AddLoan
          onClose={() => setModalOpen(false)}
          onAddSuccess={(newLoan) => {
            setLoans([...loans, newLoan]);
            setModalOpen(false);
          }}
        />
      )}

      {editModal && (
        <UpdateLoan
          loan={currentLoan}
          onClose={() => setEditModal(false)}
          onUpdateSuccess={handleUpdateSuccess}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <Modal toggleFunction={() => setDeleteModalOpen(false)}>
          <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
          <p>Are you sure you want to delete this loan?</p>
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
