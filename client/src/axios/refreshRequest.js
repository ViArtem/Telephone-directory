import axios from "axios";

async function validateRefresh() {
  return await axios.post("http://localhost:4000/user/refresh", {
    refresh: localStorage.getItem("Refresh"),
  });
}

export default validateRefresh;
