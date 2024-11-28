import axios from "axios";
const API_URL = "http://localhost:8080/api/loans";

class LoanService {
  saveLoan(formData) {
    return axios.post(`${API_URL}/saveLoan`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  }
  deleteLoan(id) {
    return axios.delete(`${API_URL}/deleteLoan/${id}`);
  }
  updateLoan(id, formData) {
    return axios.put(`${API_URL}/updateLoan/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  }
}

export default new LoanService();
