async function createUsersTable(connection) {
  await connection.query(`
  CREATE TABLE IF NOT EXISTS users (
    _id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    refresh VARCHAR(255) NOT NULL,
    customId VARCHAR(255) NOT NULL,
    avatar VARCHAR(255) NOT NULL
  )
  `);
}

export default createUsersTable;
