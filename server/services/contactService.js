import contactAdapter from "../adapters/contactAdapter.js";
import * as fs from "node:fs/promises";
import path from "node:path";

class contactService {
  async addNewContact(name, number, owner, contactAvatar, filePath = null) {
    try {
      // checking the contact for uniqueness
      const candidate = await contactAdapter.findContact(name);

      if (candidate) {
        return { message: "Such a contact already exists" };
      }

      if (filePath) {
        await fs.writeFile(path.resolve(contactAvatar), filePath);
      }

      const newUser = await contactAdapter.addContact(
        name,
        number,
        owner,
        contactAvatar
      );

      return newUser;
    } catch (error) {
      return error;
    }
  }
  //
  async findContact(name) {
    try {
      return await contactAdapter.findContact(name);
    } catch (error) {
      return error;
    }
  }
  //
  async updateContact(
    name,
    number,
    id,
    owner,
    userRole,
    avatar,
    avatarBuffer = null
  ) {
    try {
      const validateRights = await contactAdapter.findContactById(id);

      if (validateRights.owner == owner || userRole == "admin") {
        if (avatarBuffer) {
          await fs.writeFile(path.resolve(avatar), avatarBuffer);
        }
        return await contactAdapter.updateContact(name, number, id, avatar);
      } else {
        return { success: "You don't have enough rights" };
      }
    } catch (error) {
      return error;
    }
  }
  //
  async deleteContact(name, userId, userRole, imgPath) {
    try {
      //checking for a user in the database
      const validationDeletion = await contactAdapter.findContact(name);
      if (!validationDeletion) {
        return { noFound: `Contact with name ${name} does not exist` };
      }

      //check if the user can delete the contact
      if (validationDeletion.owner == userId || userRole == "admin") {
        await contactAdapter.deleteContact(name, validationDeletion.id);
        const newLinc = imgPath.split("\\");
        await fs.unlink(path.resolve(`images/${newLinc[1]}`));

        return { success: `Contact ${name} has been deleted` };
      } else {
        return { message: "You don't have enough rights" };
      }
    } catch (error) {
      return error;
    }
  }
  //
  async getAllContact(pageData) {
    try {
      return await contactAdapter.getAllContact(pageData);
    } catch (error) {
      return error;
    }
  }
}

export default new contactService();
