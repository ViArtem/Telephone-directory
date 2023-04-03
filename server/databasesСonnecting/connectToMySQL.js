import mysql from "mysql2/promise";

async function getConnectionPool() {
  try {
    return mysql.createPool({
      host: "localhost",
      user: "root",
      password: "587472Aa",
      database: "telephoneDirectory",
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  } catch (error) {
    console.log(error);
    return error;
  }
}

export default getConnectionPool;
