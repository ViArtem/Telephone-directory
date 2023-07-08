import * as fs from "node:fs/promises";
import path from "node:path";
import uniqid from "uniqid";
import Helpers from "../exсeptions/helpers.js";

class administratorFileRequest {
  constructor() {
    this.filePath = path.resolve(
      "files",
      "administratorHistory",
      `History.txt`
    );
  }

  async getAllHistory() {
    return JSON.parse(
      await Helpers.handleFileSystemErrors(fs.readFile(this.filePath))
    );
  }
  //
  async addNewAction(action, time) {
    try {
      const newActions = {
        id: uniqid(),
        action: action,
        time: Number(time),
      };

      const allDataBuffer = await Helpers.handleFileSystemErrors(
        fs.readFile(this.filePath)
      );
      const allDataJson = JSON.parse(allDataBuffer.toString());

      allDataJson.push(newActions);

      return await Helpers.handleFileSystemErrors(
        fs.writeFile(this.filePath, JSON.stringify(allDataJson, null, 2))
      );
    } catch (error) {
      return error;
    }
  }
}
export default new administratorFileRequest();
