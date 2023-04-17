import getConnectionPool from "../../databasesСonnecting/connectToMySQL.js";
import Helpers from "../../exсeptions/helpers.js";
import dotenv from "dotenv";
dotenv.config();
class userMySQLDatabaseRequest {
  constructor() {
    (async () => {
      if (process.env.QUERY_PARAMETERS === "mySQL") {
        this.pool = await getConnectionPool();
      }
    })();
  }

  // function to find a user in the database by email
  async findUser(email) {
    const rows = await Helpers.handleErrors(
      this.pool.query("SELECT * FROM users WHERE email = ?", [email])
    );

    if (rows.length === 0) {
      return null;
    }

    return rows[0];
  }

  // function to find a user in the database by id
  async findUserById(customId) {
    const rows = await Helpers.handleErrors(
      this.pool.query("SELECT * FROM users WHERE customId = ?", [customId])
    );
    if (rows.length === 0) {
      return null;
    }
    //this.pool.end();
    return rows[0];
  }

  // function for user registration
  async registrationUser(
    firstName,
    lastName,
    email,
    password,
    refresh,
    customId,
    avatar
  ) {
    await Helpers.handleErrors(
      this.pool.query(
        "INSERT INTO users (email, firstName, lastName, password, refresh, customId, avatar) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [email, firstName, lastName, password, refresh, customId, avatar]
      )
    );

    return { role: "user", refresh };
  }
  // function for adding a refresh token
  async addRefreshToken(customId, refreshToken) {
    await Helpers.handleErrors(
      this.pool.query("UPDATE users SET refresh = ? WHERE customId = ?", [
        refreshToken,
        customId,
      ])
    );

    return refreshToken;
  }
}

export default new userMySQLDatabaseRequest();
