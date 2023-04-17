import axios from "axios";
//import dotenv from "dotenv";
//dotenv.config();
async function validateRefresh() {
  return await axios.post(`${process.env.REACT_APP_SERVER_URL}user/refresh`, {
    refresh: localStorage.getItem("Refresh"),
  });
}

export default validateRefresh;
