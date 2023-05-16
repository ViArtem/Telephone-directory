import dotenv from "dotenv";
import * as fs from "node:fs/promises";
dotenv.config();
class Helpers {
  // validation of the contact number and name
  dataValidation(fullName, number) {
    const regularExpretionNumber =
      /^(?:\+[1-9]{1,3})?(?:[0-9]{3}[ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|044[ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|044[0-9]{7})$/gi;

    const regularExpretionName = new RegExp("^[a-zA-Z]+ [a-zA-Z]+$", "gi");

    if (!regularExpretionName.test(fullName)) {
      return { message: "Name not valid" };
    }

    if (!regularExpretionNumber.test(number.trim())) {
      return { message: "Number not valid" };
    }

    return false;
  }

  // capitalizes all first letters of words
  allFirstLettersCapitalized(userword) {
    try {
      return userword
        .split(" ")
        .map((word) => word[0].toUpperCase() + word.substring(1))
        .join(" ");
    } catch (error) {
      return null;
    }
  }

  // function for handling asynchronous code errors
  async handleErrors(promise) {
    try {
      if (process.env.QUERY_PARAMETERS === "mySQL") {
        const [rows] = await promise;

        return rows;
      } else {
        const result = await promise;
        return result;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async checkPresenceFolder(path) {
    try {
      await fs.access(path);
    } catch (error) {
      await fs.mkdir(path);
    }
  }
}

export default new Helpers();
