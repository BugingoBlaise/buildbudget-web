import axios from "axios";

const API_URL = "http://localhost:8080/api/materials";

class MaterialService {
  // Get all public materials
  getPublicMaterials() {
    const token = localStorage.getItem("token");
    return axios.get(`${API_URL}/public`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // Get supplier's own materials
  getSupplierMaterials() {
    const token = localStorage.getItem("token");
    return axios.get(`${API_URL}/my-materials`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  saveMaterial(formData) {
    const token = localStorage.getItem("token");
    return axios.post(`${API_URL}/saveMaterial`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
  }

  deleteMaterial(id) {
    const token = localStorage.getItem("token");
    return axios.delete(`${API_URL}/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  updateMaterial(id, formData) {
    const token = localStorage.getItem("token");
    return axios.put(`${API_URL}/updateMaterial/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default new MaterialService();
