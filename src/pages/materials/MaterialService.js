import axios from "axios";
const API_URL = "http://localhost:8080/api/materials";

class MaterialService {
  saveMaterial(formData) {
    return axios.post(`${API_URL}/saveMaterial`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
  deleteMaterial(id) {
    return axios.delete(`${API_URL}/delete/${id}`);
  }
  updateMaterial(id, formData) {
    return axios.put(`${API_URL}/updateMaterial/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}

export default new MaterialService();
