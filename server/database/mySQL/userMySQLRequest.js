import getConnectionPool from "../../databasesСonnecting/connectToMySQL.js";

class userMySQLDatabaseRequest {
  constructor() {
    (async () => {
      this.pool = await getConnectionPool();
    })();
  }

  // function to find a user in the database by email
  async findUser(email) {
    try {
      const [rows] = await this.pool.query(
        "SELECT * FROM users WHERE email = ?",
        [email]
      );

      if (rows.length === 0) {
        return null;
      }

      return rows[0];
    } catch (error) {
      return error;
    }
  }

  // function to find a user in the database by id
  async findUserById(customId) {
    try {
      const [rows] = await this.pool.query(
        "SELECT * FROM users WHERE customId = ?",
        [customId]
      );
      if (rows.length === 0) {
        return null;
      }
      //this.pool.end();
      return rows[0];
    } catch (error) {
      return error;
    }
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
    try {
      const result = await this.pool.query(
        "INSERT INTO users (email, firstName, lastName, password, refresh, customId, avatar) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [email, firstName, lastName, password, refresh, customId, avatar]
      );

      return { role: "user" };
    } catch (error) {
      return error;
    }
  }
  // function for adding a refresh token
  async addRefreshToken(customId, refreshToken) {
    try {
      const result = await this.pool.query(
        "UPDATE users SET refreshToken = ?, WHERE customId = ?",
        [refreshToken, customId]
      );

      return result;
    } catch (error) {
      return error;
    }
  }
}

export default new userMySQLDatabaseRequest();
