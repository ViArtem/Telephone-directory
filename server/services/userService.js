import userAdapter from "../adapters/userAdapter.js";
import tokenGeneration from "../tokenFunction/tokenGeneration.js";
import bcrypt from "bcrypt";
import uniqid from "uniqid";
import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";
import * as fs from "node:fs/promises";
import path from "node:path";

class userService {
  async registrationUser(firstName, lastName, email, password, avatar) {
    try {
      // check if such a user is registered
      const candidate = await userAdapter.findUser(email);

      if (candidate || candidate === []) {
        return { success: `User already exists` };
      }

      // password hashing and id generation
      const hashPassword = await bcrypt.hashSync(password, 7);
      const customId = uniqid();

      // refresh token generation
      const userRefreshToken = await tokenGeneration.refreshToken(
        customId,
        `${firstName} ${lastName}`
      );

      // user registration
      const newUser = await userAdapter.registrationUser(
        firstName,
        lastName,
        email,
        hashPassword,
        userRefreshToken,
        customId,
        avatar
      );

      const accessToken = await tokenGeneration.accessToken(
        customId,
        `${firstName} ${lastName}`,
        newUser.role,
        avatar
      );

      return { access: accessToken, refresh: userRefreshToken };
    } catch (error) {
      return error;
    }
  }
  //
  async authenticationUser(password, email) {
    try {
      const checkingUserRegistered = await userAdapter.findUser(email);

      if (!checkingUserRegistered) {
        return { message: `Incorrect email or password` };
      }
      const validUserPassword = bcrypt.compareSync(
        password,
        checkingUserRegistered.password
      );

      if (!validUserPassword) {
        return { message: `Incorrect email or password` };
      }
      // generation of access token
      const userAccessToken = await tokenGeneration.accessToken(
        checkingUserRegistered.customId,
        `${checkingUserRegistered.firstName} ${checkingUserRegistered.lastName}`,
        checkingUserRegistered.role,
        checkingUserRegistered.avatar
      );
      // generation of Refresh token
      const userRefreshToken = await tokenGeneration.refreshToken(
        checkingUserRegistered.customId,
        `${checkingUserRegistered.firstName} ${checkingUserRegistered.lastName}`
      );
      //
      await userAdapter.addRefreshToken(
        checkingUserRegistered.customId,
        userRefreshToken
      );

      return {
        success: `User is authorized`,
        access: userAccessToken,
        refresh: userRefreshToken,
      };
    } catch (error) {
      return error;
    }
  }

  async changeAvatar(accessToken, newAvatarPath) {
    try {
      const accessData = jwt_decode(accessToken, process.env.ACCESS_KEY);

      await userAdapter.changeAvatar(accessData.id, newAvatarPath);

      // if (accessData.avatar !== "noAvatar") {
      //   await fs.unlink(path.resolve(accessData.avatar));
      // }

      return await tokenGeneration.accessToken(
        accessData.id,
        accessData.username,
        accessData.role,
        newAvatarPath
      );
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  //
  async verifyRefresh(refreshToken, accessToken) {
    try {
      const refreshData = jwt.verify(refreshToken, process.env.REFRESH_KEY);
      const accessData = jwt_decode(accessToken);

      const userDataFromDatabase = await userAdapter.findUserById(
        refreshData.id
      );

      if (refreshToken === userDataFromDatabase.refresh) {
        const newAccess = await tokenGeneration.accessToken(
          accessData.id,
          accessData.username,
          accessData.role,
          accessData.avatar
        );

        const newRefresh =
          await tokenGeneration.refreshAfterUpdatingAccessToken(
            accessData.id,
            accessData.username,
            refreshData.exp,
            refreshData.iat
          );

        await userAdapter.addRefreshToken(refreshData.id, newRefresh);
        return { newAccess, newRefresh };
      }
      return "authorization error";
    } catch (error) {
      return error;
    }
  }
}

export default new userService();
