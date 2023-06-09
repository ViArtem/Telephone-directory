async function createContactsTable(connection) {
  await connection.query(`
  CREATE TABLE IF NOT EXISTS contacts (
    _id INT AUTO_INCREMENT PRIMARY KEY,
    fullName VARCHAR(255) NOT NULL,
    number VARCHAR(255) NOT NULL,
    owner VARCHAR(255) NOT NULL,
    id VARCHAR(255) NOT NULL,
    avatar VARCHAR(255) NOT NULL
  )
  `);
}

export default createContactsTable;
