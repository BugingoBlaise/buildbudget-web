import axios from "axios";
import { useCallback } from "react";
const API_URL = "http://localhost:8080/api/regulations";

class RegulationService {
  fetchRegulations() {
    try {
      const response = axios.get(API_URL);
      return response;
    } catch (e) {
      console.error(e);
    } finally {
      console.log("----END FETCHING--");
    }
  }

  saveRegulation(formData) {
    return axios.post(`${API_URL}/saveReg`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
  deleteRegulation(id) {
    return axios.delete(`${API_URL}/deleteReg/${id}`);
  }
  updateRegulation(id, formData) {
    return axios.put(`${API_URL}/updateReg/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}

export default new RegulationService();
