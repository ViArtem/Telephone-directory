import userDatabaseService from "../database/userDatabaseService.js";
import userFileRequest from "../filesService/userFileRequest.js";
import dotenv from "dotenv";
dotenv.config();
const checkMongo = process.env.QUERY_PARAMETERS === "mongo";

class userAdapter {
  constructor(userDatabaseService, userFileRequest) {
    if (checkMongo) {
      this.service = userDatabaseService;
    } else {
      this.service = userFileRequest;
    }
  }

  async registrationUser(
    firstName,
    lastName,
    email,
    hashPassword,
    userRefreshToken,
    customId,
    avatar
  ) {
    return await this.service.registrationUser(
      firstName,
      lastName,
      email,
      hashPassword,
      userRefreshToken,
      customId,
      avatar
    );
  }

  async findUser(email) {
    return await this.service.findUser(email);
  }

  async findUserById(id) {
    return await this.service.findUserById(id);
  }

  async addRefreshToken(id, refresh) {
    return await this.service.addRefreshToken(id, refresh);
  }
}
export default new userAdapter(userDatabaseService, userFileRequest);
