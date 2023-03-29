import History from "../models/History.js";
import Helpers from "../exсeptions/Helpers.js";

class adminDatabaseService {
  // request to receive the entire history for the administrator
  async getAllHistory() {
    return await Helpers.handleErrors(await History.find());
  }

  // request to add history for the administrator
  async addNewAction(action, time) {
    return await Helpers.handleErrors(
      await new History({
        action,
        time,
      }).save()
    );
  }
}
export default new adminDatabaseService();
