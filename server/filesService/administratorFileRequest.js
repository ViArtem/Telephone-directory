import * as fs from "node:fs/promises";
import path from "node:path";
import uniqid from "uniqid";
import Helpers from "../exсeptions/helpers.js";
const filePath = path.resolve("files", "administratorHistory", `History.txt`);
class administratorFileRequest {
  async getAllHistory() {
    return JSON.parse(await Helpers.handleErrors(fs.readFile(filePath)));
    try {
      return JSON.parse(await fs.readFile(filePath));
    } catch (error) {
      return error;
    }
  }
  //
  async addNewAction(action, time) {
    try {
      const newActions = {
        id: uniqid(),
        action: action,
        time: Number(time),
      };

      const allDataBuffer = await Helpers.handleErrors(fs.readFile(filePath));
      let allBataJson = JSON.parse(allDataBuffer.toString());

      allBataJson.push(newActions);

      return await Helpers.handleErrors(
        fs.writeFile(filePath, JSON.stringify(allBataJson, null, 2))
      );
    } catch (error) {
      return error;
    }
  }
}
export default new administratorFileRequest();
