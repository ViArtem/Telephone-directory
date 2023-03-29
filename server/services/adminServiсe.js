import administratorAdapter from "../adapters/adminAdapter.js";

class adminService {
  async getHistory() {
    try {
      return await administratorAdapter.getAllHistory();
    } catch (error) {
      return error;
    }
  }
}

export default new adminService();
