import axios from "axios";
//import dotenv from "dotenv";
//dotenv.config();
async function validateRefresh() {
  return await axios.post(`http://localhost:4000/user/refresh`, {
    refresh: localStorage.getItem("Refresh"),
  });
}

export default validateRefresh;
