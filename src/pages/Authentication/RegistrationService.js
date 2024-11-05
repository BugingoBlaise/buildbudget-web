import axios from "axios";
const API_URL = "http://localhost:8080/api/auth";

class RegistrationService {
  RegisterUser(userData) {
    try {
      const response = axios.post(`${API_URL}/signup`, userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  }
}

export default new RegistrationService();
