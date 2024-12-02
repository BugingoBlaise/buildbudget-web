import axios from "axios";
const API_URL = "http://localhost:8080/api/users";

class AccountService {
  saveAccount(formData) {
    return axios.post(`${API_URL}/saveAccount`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  }
  deleteAccount(id) {
    return axios.delete(`${API_URL}/deleteAccount/${id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  }
  updateRAccount(id, formData) {
    return axios.put(`${API_URL}/updateAccount/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  }
}

export default new AccountService();
