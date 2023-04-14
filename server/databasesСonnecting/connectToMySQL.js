import mysql from "mysql2/promise";
import dotenv from "dotenv";
import {
  createDatabase,
  createHistoryTable,
  createUsersTable,
  createContactsTable,
} from "../sqlRequests/createDatabase.js";
dotenv.config();
async function getConnectionPool() {
  try {
    const connectMySQL = mysql.createPool({
      host: "myapp-mysql", // localhost
      user: "root",
      password: process.env.MYSQL_ROOT_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
    //
    await createDatabase();
    await connectMySQL.query(`USE telephoneDirectory`);
    await createHistoryTable();
    await createUsersTable();
    await createContactsTable();
    //

    return connectMySQL;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export default getConnectionPool;
