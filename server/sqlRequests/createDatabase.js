async function createDatabase(connection) {
  await connection.query(`CREATE DATABASE IF NOT EXISTS telephoneDirectory`);
}

export default createDatabase;
