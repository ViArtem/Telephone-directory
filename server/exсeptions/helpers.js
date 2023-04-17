import dotenv from "dotenv";
dotenv.config();
class Helpers {
  // validation of the contact number and name
  dataValidation(fullName, number) {
    const regularExpretionNumber =
      /^(?:\+[1-9]{1,3})?(?:[0-9]{3}[ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|044[ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|044[0-9]{7})$/gi;

    const regularExpretionName = new RegExp("^[a-z]+ [a-z]+$", "gi");

    if (!regularExpretionName.test(fullName)) {
      return { message: "Name not valid" };
    }

    if (!regularExpretionNumber.test(number.trim())) {
      return { message: "Number not valid" };
    }

    return false;
  }

  // capitalizes all first letters of words
  allFirstLettersCapitalized(Userword) {
    try {
      return Userword.split(" ")
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
        //console.log(rows);
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
}

export default new Helpers();
