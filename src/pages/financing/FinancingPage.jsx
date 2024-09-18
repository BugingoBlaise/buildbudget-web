import { useState, useEffect, useCallback } from "react";
import Button from "../../components/Button/index";
import ContainerHolder from "../../components/container/index";
import axios from "axios";
import { AddLoan } from "../financing/child/AddLoan";
import { UpdateLoan } from "../financing/child/UpdateLoan";
import LoanService from "./LoanService";
import Modal from "../../components/Modal";
import { toast } from "react-toastify";

const API_URL = "http://localhost:8080/api/loans";

export const FinancingPage = () => {
  const [loans, setLoans] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentLoan, setCurrentLoan] = useState(null);

  const fetchLoans = useCallback(() => {
    axios.get(API_URL).then((res) => {
      setLoans(res.data);
    });
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

  return (
    <ContainerHolder className="flex flex-col p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Financing Options </h1>
        <Button value="Add Loan" onClick={() => setModalOpen(true)} />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {loans.map((loan) => (
          <div key={loan.id} className="bg-white rounded-lg shadow-md p-4">
            <img
              src={`${API_URL}/image/${loan.imagePath}`}
              alt={loan.loanName}
              className="w-full h-48 object-cover mb-4 rounded-md"
            />
            <h3 className="text-xl font-bold">{loan.loanName}</h3>
            <p className="text-sm text-gray-600 mt-2">{loan.description}</p>

            <div className="mt-4 flex justify-between">
              <Button
                value="Update"
                onClick={() => handleUpdateConfirm(loan)}
              ></Button>
              <Button
                value="Delete"
                className="bg-yellow-300 text-white"
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
