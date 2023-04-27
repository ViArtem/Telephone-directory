import * as fs from "node:fs/promises";
import path from "node:path";

class messageFileRequest {
  async addMessage(message) {
    return await fs.writeFile(
      path.resolve("files", "userMessages", "userMessagesList.txt"),
      message
    );
  }

  async addUnreadMessage(newMessage) {
    return await fs.writeFile(
      path.resolve("files", "userMessages", "hasNewMessage.txt"),
      newMessage
    );
  }

  async getUsers() {
    return JSON.parse(
      await fs.readFile(
        path.resolve("files", "userMessages", "userMessagesList.txt")
      )
    );
  }

  async getNewMessageList() {
    return JSON.parse(
      await fs.readFile(
        path.resolve("files", "userMessages", "hasNewMessage.txt")
      )
    );
  }

  //
}

export default new messageFileRequest();
