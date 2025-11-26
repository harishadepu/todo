import { pool } from "../db.js";

export const createTable = async () => {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS todos (
        id INT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL
      )
    `;

    await pool.query(query);
    console.log("todos table created successfully");
  } catch (err) {
    console.error("error creating table", err);
  }
};
