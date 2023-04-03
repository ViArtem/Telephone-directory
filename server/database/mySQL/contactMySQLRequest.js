import getConnectionPool from "../../databasesСonnecting/connectToMySQL.js";

class contactMySQLDatabaseRequest {
  constructor() {
    (async () => {
      this.pool = await getConnectionPool();
    })();
  }

  async getAllContact(pageData) {
    try {
      const [rows] = await this.pool.query(
        `SELECT * FROM contacts LIMIT 5 OFFSET ${pageData.pages * 5}`
      );
      const [count] = await this.pool.query(` SELECT COUNT(*) FROM contacts`);

      if (rows.length === 0) {
        return null;
      }
      rows[0].id = count[0]["COUNT(*)"];
      //this.pool.end();
      return rows;
    } catch (error) {
      return error;
    }
  }

  // Find a contact by name
  async findContact(fullName) {
    try {
      const [rows] = await this.pool.query(
        "SELECT * FROM contacts WHERE fullName = ?",
        [fullName]
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

  // Find a contact by id
  async findById(_id) {
    try {
      const [rows] = await this.pool.query(
        "SELECT * FROM contacts WHERE _id = ?",
        [_id]
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

  async addContact(fullName, number, owner, id, avatar) {
    try {
      const rows = await this.pool.query(
        "INSERT INTO contacts (fullName, number, owner, id, avatar) VALUES (?, ?, ?, ?, ?)",
        [fullName, number, owner, id, avatar]
      );

      return this.findContact(fullName);
    } catch (error) {
      return error;
    }
  }

  async updateContact(fullName, number, id, avatar) {
    try {
      return await this.pool.query(
        "UPDATE contacts SET fullName = ?, number = ?, avatar = ? WHERE _id = ?",
        [fullName, number, avatar, id]
      );
    } catch (error) {
      return error;
    }
  }

  async deleteContact(fullName) {
    try {
      const result = await this.pool.query(
        "DELETE FROM contacts WHERE fullName = ?",
        [fullName]
      );
      //this.pool.end();
      return fullName;
    } catch (error) {
      return error;
    }
  }
}

export default new contactMySQLDatabaseRequest();
