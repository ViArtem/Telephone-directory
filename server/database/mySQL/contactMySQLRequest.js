import getConnectionPool from "../../databasesСonnecting/connectToMySQL.js";
import Helpers from "../../exсeptions/helpers.js";
import dotenv from "dotenv";
dotenv.config();
class contactMySQLDatabaseRequest {
  constructor() {
    (async () => {
      if (process.env.QUERY_PARAMETERS === "mySQL") {
        this.pool = await getConnectionPool();
      }
    })();
  }

  async getAllContact(pageData) {
    const rows = await Helpers.handleErrors(
      await this.pool.query(
        `SELECT * FROM contacts LIMIT 5 OFFSET ${pageData.pages * 5}`
      )
    );
    const [count] = await this.pool.query(` SELECT COUNT(*) FROM contacts`);
    if (rows.length === 0) {
      return null;
    }
    rows[0].id = count[0]["COUNT(*)"];

    return rows;
  }

  // Find a contact by name
  async findContact(fullName) {
    const rows = await Helpers.handleErrors(
      this.pool.query("SELECT * FROM contacts WHERE fullName = ?", [fullName])
    );

    if (rows.length === 0) {
      return null;
    }

    return rows[0];
  }

  // Find a contact by number
  async findContactByNumber(number) {
    const contacts = await Helpers.handleErrors(
      this.pool.query(
        "SELECT * FROM contacts WHERE number LIKE CONCAT('%', ?, '%')",
        [number]
      )
    );

    if (contacts.length === 0) {
      return null;
    }
    return contacts[0];
  }

  // Find a contact by id
  async findById(_id) {
    const rows = await Helpers.handleErrors(
      this.pool.query("SELECT * FROM contacts WHERE _id = ?", [_id])
    );

    if (rows.length === 0) {
      return null;
    }

    return rows[0];
  }

  // Find a contact by name part
  async findContactByPartName(name) {
    return await Helpers.handleErrors(
      this.pool.query(`SELECT * FROM contacts WHERE fullName LIKE '%${name}%'`)
    );
    console.log(rows);
  }

  // Find a contact by part number
  async findContactByPartNumber(number) {
    return await Helpers.handleErrors(
      this.pool.query(`SELECT * FROM contacts WHERE number LIKE '%${number}%'`)
    );
  }

  async addContact(fullName, number, owner, id, avatar) {
    await Helpers.handleErrors(
      this.pool.query(
        "INSERT INTO contacts (fullName, number, owner, id, avatar) VALUES (?, ?, ?, ?, ?)",
        [fullName, number, owner, id, avatar]
      )
    );

    return this.findContact(fullName);
  }

  async updateContact(fullName, number, id, avatar) {
    return await Helpers.handleErrors(
      this.pool.query(
        "UPDATE contacts SET fullName = ?, number = ?, avatar = ? WHERE _id = ?",
        [fullName, number, avatar, id]
      )
    );
  }

  async deleteContact(fullName) {
    await Helpers.handleErrors(
      this.pool.query("DELETE FROM contacts WHERE fullName = ?", [fullName])
    );

    return fullName;
  }
}

export default new contactMySQLDatabaseRequest();
