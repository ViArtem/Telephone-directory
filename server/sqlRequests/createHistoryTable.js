async function createHistoryTable(connection) {
  await connection.query(`
    CREATE TABLE IF NOT EXISTS histories (
      _id INT AUTO_INCREMENT PRIMARY KEY,
      action VARCHAR(255) NOT NULL,
      time VARCHAR(255) NOT NULL
    )
    `);
}

export default createHistoryTable;
