import contactService from "../services/contactService.js";
import Helpers from "../exсeptions/helpers.js";
import ApiError from "../exсeptions/apiError.js";

class contactHttpController {
  //Creates a new contact
  //Accepts name, phone number, contact owner id, and contact avatar (optional).
  //Returns the object of the created contact
  async addContact(req, res, next) {
    try {
      const { fullName, number, owner } = req.body;

      let contactAvatar = req.file;

      if (!contactAvatar) {
        contactAvatar = { path: "noAvatar" };
      }

      // number and name validation
      const validatedData = Helpers.dataValidation(fullName, number);
      if (validatedData) {
        throw ApiError.BadRequest(validatedData.message);
      }

      //request to create a contact
      const newContact = await contactService.addNewContact(
        Helpers.allFirstLettersCapitalized(fullName),
        number,
        owner,
        contactAvatar.path
      );

      if (newContact.message === "Such a contact already exists") {
        throw ApiError.BadRequest(newContact.message);
      }

      return res.status(200).json(newContact);
    } catch (error) {
      next(error);
    }
  }

  // Finds a contact by parameter
  // Аccepts full name or phone number
  // Returns the object of the found contact
  async findContact(req, res, next) {
    try {
      const numberOrFullName = req.body.fullName.trim();

      if (numberOrFullName === "") {
        throw ApiError.BadRequest("The value cannot be empty");
      }

      // request to find a contact
      const foundContactData = await contactService.findContact(
        Helpers.allFirstLettersCapitalized(numberOrFullName)
      );

      if (foundContactData === null) {
        throw ApiError.BadRequest("Contact no found");
      }

      return res.status(200).json(foundContactData);
    } catch (error) {
      next(error);
    }
  }

  // controller to receive data to delete a contact
  // returns an object with the deletion status
  async deleteContact(req, res, next) {
    try {
      const { fullName, userId, userRole, imgPath } = req.body;

      // request to delete a contact
      const deleteSuccess = await contactService.deleteContact(
        fullName,
        userId,
        userRole,
        imgPath
      );

      if (
        deleteSuccess.success === "You don't have enough rights" ||
        deleteSuccess.noFound
      ) {
        throw ApiError.RefreshError(deleteSuccess.success);
      }

      return res.status(200).json(deleteSuccess);
    } catch (error) {
      next(error);
    }
  }

  // controller for editing contacts
  // returns the contact with the data before the update
  async updateContact(req, res, next) {
    try {
      const { fullName, number, id, owner, userRole } = req.body;
      let avatar = req.file;

      if (!avatar) {
        avatar = { path: "noAvatar" };
      }

      if (fullName === "" || number === "") {
        throw ApiError.BadRequest("The value cannot be empty");
      }

      if (Helpers.dataValidation(fullName, number)) {
        throw ApiError.BadRequest(Helpers.dataValidation(fullName, number));
      }

      // request to update a contact
      const updatedUser = await contactService.updateContact(
        Helpers.allFirstLettersCapitalized(fullName.trim()),
        number.trim(),
        id,
        owner,
        userRole,
        avatar.path
      );

      return res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  }

  // data retrieval controller to find all available contacts (returns an array of all contacts )
  async findAllContact(req, res, next) {
    try {
      return res.status(200).json(await contactService.getAllContact(req.body));
    } catch (error) {
      next(error);
    }
  }

  // returns an array of contacts that match the filter parameters
  async findContactByPartData(req, res, next) {
    try {
      return res
        .status(200)
        .json(
          await contactService.getContactByPartData(
            Helpers.allFirstLettersCapitalized(req.body.fullName.trim())
          )
        );
    } catch (error) {
      next(error);
    }
  }
}

export default new contactHttpController();
