import contactDatabaseService from "../database/contactDatabaseService.js";
import contactFileRequest from "../filesService/contactFileRequest.js";
import uniqid from "uniqid";
import dotenv from "dotenv";
dotenv.config();
const checkMongo = process.env.QUERY_PARAMETERS === "mongo";

class contactAdapter {
  constructor(contactDatabaseService, contactFileRequest) {
    if (checkMongo) {
      this.service = contactDatabaseService;
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
  contactDatabaseService,

  contactFileRequest
);
