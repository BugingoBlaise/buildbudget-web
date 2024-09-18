import axios from "axios";
const API_URL = "http://localhost:8080/api/regulations";

class LoanService {
  saveLoan(formData) {
    return axios.post(`${API_URL}/saveLoan`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
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
      },
    });
  }
}

export default new LoanService();
