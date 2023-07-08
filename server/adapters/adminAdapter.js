import administratorFileRequest from "../filesService/administratorFileRequest.js";
import adminMongoRequest from "../database/mongo/adminMongoRequest.js";
import adminMySQLRequest from "../database/mySQL/adminMySQLRequest.js";
import dotenv from "dotenv";
dotenv.config();

class administratorAdapter {
  #checkDatabase = process.env.QUERY_PARAMETERS;

  constructor(adminMongoRequest, adminMySQLRequest, administratorFileRequest) {
    if (this.#checkDatabase === "mongo") {
      this.service = adminMongoRequest;
    } else if (this.#checkDatabase === "mySQL") {
      this.service = adminMySQLRequest;
    } else {
      this.service = administratorFileRequest;
    }
  }

  // receiving all action logs
  async getAllHistory() {
    try {
      return await this.service.getAllHistory();
    } catch (error) {
      console.log(error);
    }
  }

  // adding new actions to the database
  async addAction(action, time) {
    return await this.service.addNewAction(action, time);
  }
}

export default new administratorAdapter(
  adminMongoRequest,
  adminMySQLRequest,
  administratorFileRequest
);
