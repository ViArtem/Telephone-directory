import History from "../../models/History.js";
import Helpers from "../../exсeptions/helpers.js";

class adminMongoRequest {
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
export default new adminMongoRequest();
