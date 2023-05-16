import * as fs from "node:fs/promises";
import path from "node:path";
import uniqid from "uniqid";
const userPath = path.resolve("files", "users", `Users.txt`);
class userFileRequest {
  async registrationUser(
    firstName,
    lastName,
    email,
    password,
    refresh,
    customId,
    avatar
  ) {
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

    let fileData = JSON.parse(await fs.readFile(userPath));
    fileData.push(newUser);

    // creates a new file with user data
    await fs.writeFile(userPath, JSON.stringify(fileData, null, 2));
    return newUser;
  }

  async findUser(email) {
    const fileData = JSON.parse(await fs.readFile(userPath)).filter(
      (user) => user.email == email
    );
    if (fileData === []) {
      return null;
    }
    return fileData[0];
  }

  async findUserById(id) {
    const fileData = JSON.parse(await fs.readFile(userPath)).filter(
      (user) => user.customId == id
    );
    if (fileData === []) {
      return null;
    }
    return fileData[0];
  }

  // Update user avatar
  async updateAvatar(userId, newAvatar) {
    try {
      const addNewAvatar = JSON.parse(await fs.readFile(userPath));
      for (let user of addNewAvatar) {
        if (user.customId === userId) {
          user.avatar = newAvatar;
          await fs.writeFile(userPath, JSON.stringify(addRefresh, null, 2));
          return;
        }
      }
    } catch (error) {
      return error;
    }
  }

  async addRefreshToken(id, refreshUser) {
    try {
      const addRefresh = JSON.parse(await fs.readFile(userPath));
      for (let user of addRefresh) {
        if (user.customId === id) {
          user.refresh = refreshUser;
          await fs.writeFile(userPath, JSON.stringify(addRefresh, null, 2));
          return refresh;
        }
      }
    } catch (error) {
      return error;
    }
  }
}
export default new userFileRequest();
