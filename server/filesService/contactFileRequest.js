import * as fs from "node:fs/promises";
import path from "node:path";
import uniqid from "uniqid";
const contactPath = path.resolve("files", "contacts", `Contact.txt`);
class contactFileRequest {
  async addContact(name, number, owner, id, avatar) {
    try {
      const newContact = {
        _id: uniqid(),
        fullName: name,
        number,
        owner,
        avatar,
      };

      let fileData = JSON.parse(await fs.readFile(contactPath));

      if (!fileData) {
        return null;
      }
      await fileData.push(newContact);

      // creates a new file with user data
      await fs.writeFile(contactPath, JSON.stringify(fileData, null, 2));
      return newContact;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async findContact(fullName) {
    try {
      const fileData = JSON.parse(await fs.readFile(contactPath)).filter(
        (contact) => contact.fullName == fullName
      );
      if (fileData === []) {
        return null;
      }
      return fileData[0];
    } catch (error) {
      return error;
    }
  }

  async getAllContact(pageData) {
    try {
      // get a list of all files in the folder
      const allContacts = JSON.parse(await fs.readFile(contactPath));

      return allContacts.slice(
        pageData.pages * 5,
        pageData.pages > 0 ? pageData.pages * 5 : 5
      );
    } catch (error) {
      return error;
    }
  }

  async deleteContact(fullName) {
    const deleteArray = JSON.parse(await fs.readFile(contactPath));

    await fs.writeFile(
      contactPath,
      JSON.stringify(
        deleteArray.filter((contact) => contact.fullName != fullName),
        null,
        2
      )
    );
    return deleteArray.filter((contact) => contact.fullName === fullName)[0];
  }
  //
  async findById(id) {
    try {
      const fileData = JSON.parse(await fs.readFile(contactPath)).filter(
        (contact) => contact._id == id
      );

      return fileData[0];
    } catch (error) {
      return error;
    }
  }
  //
  async updateContact(fullName, number, id, avatar) {
    try {
      const updateUser = JSON.parse(await fs.readFile(contactPath));

      for (const contact of updateUser) {
        if (contact._id == id) {
          contact.fullName = fullName;
          contact.number = number;
          contact.avatar = avatar;
          await fs.writeFile(contactPath, JSON.stringify(updateUser, null, 2));
          return contact;
        }
      }

      return;
    } catch (error) {
      return error;
    }
  }
}
export default new contactFileRequest();
