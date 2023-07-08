import * as fs from "node:fs/promises";
import path from "node:path";
import Helpers from "../exсeptions/helpers.js";

class messageFileRequest {
  #userMessageList;
  #hasNewMessage;

  constructor() {
    this.#hasNewMessage = path.resolve(
      "files",
      "userMessages",
      "hasNewMessage.txt"
    );
    this.#userMessageList = path.resolve(
      "files",
      "userMessages",
      "userMessagesList.txt"
    );
  }

  async addMessage(message) {
    return await Helpers.handleFileSystemErrors(
      fs.writeFile(this.#userMessageList, message)
    );
  }

  async addUnreadMessage(newMessage) {
    return await Helpers.handleFileSystemErrors(
      fs.writeFile(this.#hasNewMessage, newMessage)
    );
  }

  async getUsers() {
    return JSON.parse(
      await Helpers.handleFileSystemErrors(fs.readFile(this.#userMessageList))
    );
  }

  async getNewMessageList() {
    return JSON.parse(
      await Helpers.handleFileSystemErrors(fs.readFile(this.#hasNewMessage))
    );
  }

  //
}

export default new messageFileRequest();
