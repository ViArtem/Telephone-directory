import Helpers from "../../exсeptions/helpers.js";
import getConnectionPool from "../../databasesСonnecting/connectToMySQL.js";

class adminMySQLRequest {
  constructor() {
    (async () => {
      this.pool = await getConnectionPool();
    })();
  }
  // request to receive the entire history for the administrator
  async getAllHistory() {
    const [rows] = await this.pool.query(`SELECT * FROM histories`);

    if (rows.lenght == 0) {
      return null;
    }

    return rows;
  }

  // request to add history for the administrator
  async addNewAction(action, time) {
    await this.pool.query(
      "INSERT INTO histories (action, time) VALUES (?, ?)",
      [action, Number(time)]
    );
  }
}
export default new adminMySQLRequest();
