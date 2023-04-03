import Users from "../../models/Users.js";
import Helpers from "../../exсeptions/helpers.js";

// database queries with users
class userMongoRequest {
  // function to find a user in the database by email
  async findUser(email) {
    return await Helpers.handleErrors(Users.findOne({ email }));
  }

  // function to find a user in the database by id
  async findUserById(customId) {
    return await Helpers.handleErrors(Users.findOne({ customId }));
  }

  // function for user registration
  async registrationUser(
    firstName,
    lastName,
    email,
    password,
    refresh,
    customId,
    avatar
  ) {
    return await Helpers.handleErrors(
      new Users({
        email,
        firstName,
        lastName,
        password,
        refresh,
        customId,
        avatar,
      }).save()
    );
  }
  // function for adding a refresh token
  async addRefreshToken(id, refreshToken) {
    return await Helpers.handleErrors(
      Users.updateOne(
        { customId: id },
        {
          $set: {
            refresh: refreshToken,
          },
        }
      )
    );
  }
}

export default new userMongoRequest();
