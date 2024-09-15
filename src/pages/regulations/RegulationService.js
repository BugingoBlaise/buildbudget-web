import axios from "axios";
const API_URL = "http://localhost:8080/api/regulations";

class RegulationService {
  saveRegulation(regulation) {
    return axios.post(API_URL + "/saveReg", regulation);
  }
  deleteRegulation(id) {
    return axios.delete(`${API_URL}/deleteReg/${id}`);
  }
}

export default new RegulationService();
