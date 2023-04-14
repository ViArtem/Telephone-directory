import getConnectionPool from "../databasesСonnecting/connectToMySQL";

async function createDatabase() {
  await getConnectionPool().query(
    `CREATE DATABASE IF NOT EXISTS telephoneDirectory`
  );
}

export { createDatabase };
