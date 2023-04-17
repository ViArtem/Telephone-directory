import mysql from "mysql2/promise";
import dotenv from "dotenv";
import createDatabase from "../sqlRequests/createDatabase.js";
import createUsersTable from "../sqlRequests/createUserTabel.js";
import createContactsTable from "../sqlRequests/createContactTable.js";
import createHistoryTable from "../sqlRequests/createHistoryTable.js";

dotenv.config();
async function getConnectionPool() {
  try {
    if (process.env.QUERY_PARAMETERS === "mySQL") {
      const connectMySQL = mysql.createPool({
        host: "localhost", // myapp-mysql
        user: "root",
        password: process.env.MYSQL_ROOT_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
      });
      await createDatabase(connectMySQL);

      await connectMySQL.query(`USE telephoneDirectory`);
      await createHistoryTable(connectMySQL);
      await createUsersTable(connectMySQL);
      await createContactsTable(connectMySQL);
      return connectMySQL;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
}

export default getConnectionPool;
