import contactMongoDatabaseRequest from "../database/mongo/contactMongoRequest.js";
import contactFileRequest from "../filesService/contactFileRequest.js";
import contactMySQLDatabaseRequest from "../database/mySQL/contactMySQLRequest.js";
import uniqid from "uniqid";
import dotenv from "dotenv";
dotenv.config();

class contactAdapter {
  #checkDatabase = process.env.QUERY_PARAMETERS;

  constructor(
    contactMongoDatabaseRequest,
    contactMySQLDatabaseRequest,
    contactFileRequest
  ) {
    if (this.#checkDatabase === "mongo") {
      this.service = contactMongoDatabaseRequest;
    } else if (this.#checkDatabase === "mySQL") {
      this.service = contactMySQLDatabaseRequest;
    } else {
      this.service = contactFileRequest;
    }
  }

  async addContact(name, number, owner, avatar) {
    const newId = uniqid();
    return await this.service.addContact(name, number, owner, newId, avatar);
  }

  async findContact(fullName) {
    return await this.service.findContact(fullName);
  }

  async findContactByNumber(number) {
    return await this.service.findContactByNumber(number);
  }

  async getContactByPartName(name) {
    return await this.service.findContactByPartName(name);
  }

  async findContactByPartNumber(number) {
    return await this.service.findContactByPartNumber(number);
  }

  async getAllContact(pageData) {
    return await this.service.getAllContact(pageData);
  }

  async deleteContact(name) {
    return await this.service.deleteContact(name);
  }

  async findContactById(id) {
    return await this.service.findById(id);
  }

  async updateContact(name, number, id, avatar) {
    return await this.service.updateContact(name, number, id, avatar);
  }
}

export default new contactAdapter(
  contactMongoDatabaseRequest,
  contactMySQLDatabaseRequest,
  contactFileRequest
);
