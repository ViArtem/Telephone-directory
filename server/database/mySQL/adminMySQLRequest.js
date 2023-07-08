import Helpers from "../../exсeptions/helpers.js";
import getConnectionPool from "../../databasesСonnecting/connectToMySQL.js";
import dotenv from "dotenv";
dotenv.config();

class adminMySQLRequest {
  constructor() {
    (async () => {
      if (process.env.QUERY_PARAMETERS === "mySQL") {
        this.pool = await getConnectionPool();
      }
    })();
  }
  // request to receive the entire history for the administrator
  async getAllHistory() {
    const rows = await Helpers.handleErrors(
      this.pool.query(`SELECT * FROM histories`)
    );

    if (rows.lenght == 0) {
      return null;
    }

    return rows;
  }

  // request to add history for the administrator
  async addNewAction(action, time) {
    await Helpers.handleErrors(
      this.pool.query("INSERT INTO histories (action, time) VALUES (?, ?)", [
        action,
        Number(time),
      ])
    );
  }
}
export default new adminMySQLRequest();
