import db from "mongoose";
import dotev from "dotenv";
dotev.config();
const url = process.env.URL;
db.set("strictQuery", false);

//Database connection
async function connectToDatabase() {
  try {
    await db.connect(url);
    console.log("Connect to database");
  } catch (e) {
    console.log(e);
    return JSON.stringify({ DatabaseConnectError: e });
  }
}
export { connectToDatabase, db };
