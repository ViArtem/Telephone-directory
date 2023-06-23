import administratorFileRequest from "../filesService/administratorFileRequest.js";
import adminMongoRequest from "../database/mongo/adminMongoRequest.js";
import adminMySQLRequest from "../database/mySQL/adminMySQLRequest.js";
import dotenv from "dotenv";
dotenv.config();
const checkMongo = process.env.QUERY_PARAMETERS;

class administratorAdapter {
  constructor(adminMongoRequest, adminMySQLRequest, administratorFileRequest) {
    if (checkMongo === "mongo") {
      this.service = adminMongoRequest;
    } else if (checkMongo === "mySQL") {
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
