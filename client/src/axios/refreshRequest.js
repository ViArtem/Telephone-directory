import axios from "axios";

async function validateRefresh() {
  try {
    const isValidate = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}user/refresh`,
      {
        refresh: localStorage.getItem("Refresh"),
      }
    );
    return isValidate;
  } catch (error) {
    console.log("test");
    //return error;
  }
}

export default validateRefresh;
