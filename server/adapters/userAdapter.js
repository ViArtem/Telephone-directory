import userMongoRequest from "../database/mongo/userMongoRequest.js";
import userFileRequest from "../filesService/userFileRequest.js";
import userMySQLDatabaseRequest from "../database/mySQL/userMySQLRequest.js";
import dotenv from "dotenv";
dotenv.config();
const checkDatabase = process.env.QUERY_PARAMETERS;

class userAdapter {
  constructor(userMongoRequest, userMySQLDatabaseRequest, userFileRequest) {
    if (checkDatabase === "mongo") {
      this.service = userMongoRequest;
    } else if (checkDatabase === "mySQL") {
      this.service = userMySQLDatabaseRequest;
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

  async changeAvatar(id, avatar) {
    return await this.service.updateAvatar(id, avatar);
  }

  async addRefreshToken(id, refresh) {
    return await this.service.addRefreshToken(id, refresh);
  }
}
export default new userAdapter(
  userMongoRequest,
  userMySQLDatabaseRequest,
  userFileRequest
);
