import axios from "axios";
const API_URL = "http://localhost:8080/api/contractors";

class ReviewsService {
  saveReview(formData) {
    return axios.post(`${API_URL}/saveReg`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
  deleteRegulation(id) {
    return axios.delete(`${API_URL}/deleteReg/${id}`);
  }
  updateReview(id, formData) {
    return axios.put(`${API_URL}/updateReg/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}

export default new ReviewsService();
