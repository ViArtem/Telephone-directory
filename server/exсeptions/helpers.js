import dotenv from "dotenv";
import * as fs from "node:fs/promises";
dotenv.config();
class Helpers {
  // validation of the contact number and name
  dataValidation(fullName, number) {
    if (
      fullName === null ||
      fullName === undefined ||
      number === null ||
      number === undefined
    ) {
      return { message: "Value not valid" };
    }

    if (fullName.trim() === "" || number.trim() === "") {
      return { message: "The value cannot be empty" };
    }

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

  //
  userDataValidation(firstName, password, lastName, email) {
    //checking for null and undefined
    if (
      [firstName, password, lastName, email].some(
        (val) => val === null || val === undefined
      )
    ) {
      return { message: "The value cannot be null or undefined" };
    }

    // check for empty values
    if (
      firstName.trim() == "" ||
      password.trim() == "" ||
      lastName.trim() == "" ||
      email.trim() == ""
    ) {
      return { message: "Fields cannot be empty" };
    }

    // checking for regular expressions
    const regularForPassword = new RegExp(
      "(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}",
      "g"
    );

    const regularForEmail = new RegExp(
      "^[a-zA-Z0-9_]+@[a-zA-Z_]+?.[a-zA-Z]{2,3}$",
      "g"
    );

    const validateUserPassword = regularForPassword.test(password.trim());
    const validateUserEmail = regularForEmail.test(email.trim());

    if (validateUserPassword === false) {
      return {
        message:
          "The password does not meet the requirements. It must contain the following characters: 'A-Z', 'a-z', '0-9', '!,@, #' and be at least 6 characters long",
      };
    }

    if (validateUserEmail === false) {
      return {
        message: "The email does not meet the requirements",
      };
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
