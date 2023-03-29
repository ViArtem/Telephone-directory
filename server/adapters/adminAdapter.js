import administratorFileRequest from "../filesService/administratorFileRequest.js";
import adminDatabaseService from "../database/adminDatabaseService.js";
import dotenv from "dotenv";
dotenv.config();
const checkMongo = process.env.QUERY_PARAMETERS === "mongo";

class administratorAdapter {
  constructor(adminDatabaseService, administratorFileRequest) {
    if (checkMongo) {
      this.service = adminDatabaseService;
    } else {
      this.service = administratorFileRequest;
    }
  }
  async getAllHistory() {
    try {
      return await this.service.getAllHistory();
    } catch (error) {
      console.log(error);
    }
  }
  async addAction(action, time) {
    return await this.service.addNewAction(action, time);
  }
}

export default new administratorAdapter(
  adminDatabaseService,
  administratorFileRequest
);
