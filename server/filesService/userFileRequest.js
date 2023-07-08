import * as fs from "node:fs/promises";
import path from "node:path";
import uniqid from "uniqid";

class userFileRequest {
  #userPath = path.resolve("files", "users", `Users.txt`);

  async registrationUser(
    firstName,
    lastName,
    email,
    password,
    refresh,
    customId,
    avatar
  ) {
    try {
      const newUser = {
        _id: uniqid(),
        email,
        firstName,
        lastName,
        password,
        role: "user",
        refresh,
        customId,
        avatar,
      };

      const fileData = JSON.parse(await fs.readFile(this.#userPath));
      fileData.push(newUser);

      // creates a new file with user data
      await fs.writeFile(this.#userPath, JSON.stringify(fileData, null, 2));
      return newUser;
    } catch (error) {
      console.log(error);
    }
  }

  async findUser(email) {
    try {
      const fileData = JSON.parse(await fs.readFile(this.#userPath)).filter(
        (user) => user.email == email
      );
      if (fileData === []) {
        return null;
      }
      return fileData[0];
    } catch (error) {
      console.log(error);
    }
  }

  async findUserById(id) {
    try {
      const fileData = JSON.parse(await fs.readFile(this.#userPath)).filter(
        (user) => user.customId == id
      );
      if (fileData === []) {
        return null;
      }
      return fileData[0];
    } catch (error) {
      console.log(error);
    }
  }

  // Update user avatar
  async updateAvatar(userId, newAvatar) {
    try {
      const addNewAvatar = JSON.parse(await fs.readFile(this.#userPath));
      for (let user of addNewAvatar) {
        if (user.customId === userId) {
          user.avatar = newAvatar;
          await fs.writeFile(
            this.#userPath,
            JSON.stringify(addRefresh, null, 2)
          );
          return;
        }
      }
    } catch (error) {
      return error;
    }
  }

  async addRefreshToken(id, refreshUser) {
    try {
      const addRefresh = JSON.parse(await fs.readFile(this.#userPath));
      for (let user of addRefresh) {
        if (user.customId === id) {
          user.refresh = refreshUser;
          await fs.writeFile(
            this.#userPath,
            JSON.stringify(addRefresh, null, 2)
          );
          return refresh;
        }
      }
    } catch (error) {
      return error;
    }
  }
}
export default new userFileRequest();
