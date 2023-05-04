import contactService from "../services/contactService.js";
import Helpers from "../exсeptions/helpers.js";
import ApiError from "../exсeptions/apiError.js";

class contactHttpController {
  // controller to receive data to create a new contact
  async addContact(req, res, next) {
    try {
      const contactName = req.body.fullName.trim();
      const contactNumber = req.body.number.trim();
      const contactOwner = req.body.owner;

      let contactAvatar = req.file;

      if (!contactAvatar) {
        contactAvatar = { path: "noAvatar" };
      }
      // number and name validation
      if (contactName == "" || contactNumber == "") {
        throw ApiError.BadRequest("The value cannot be empty");
      }
      if (Helpers.dataValidation(contactName, contactNumber)) {
        throw ApiError.BadRequest(
          Helpers.dataValidation(contactName, contactNumber).message
        );
      }

      //request to create a contact
      const newContact = await contactService.addNewContact(
        Helpers.allFirstLettersCapitalized(contactName),
        contactNumber,
        contactOwner,
        contactAvatar.path
      );

      if (newContact.message == "Such a contact already exists") {
        throw ApiError.BadRequest(newContact.message);
      }

      return res.status(200).json(newContact);
    } catch (error) {
      next(error);
    }
  }
  // controller for receiving data to find a contact
  async findContact(req, res, next) {
    try {
      const fullName = req.body.fullName.trim();

      if (fullName == "") {
        throw ApiError.BadRequest("The value cannot be empty");
      }

      // request to find a contact
      const foundContactData = await contactService.findContact(
        Helpers.allFirstLettersCapitalized(fullName)
      );

      if (foundContactData == null) {
        throw ApiError.BadRequest("Contact no found");
      }

      return res.status(200).json(foundContactData);
    } catch (error) {
      next(error);
    }
  }
  // controller to receive data to delete a contact
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
        deleteSuccess.success == "You don't have enough rights" ||
        deleteSuccess.noFound
      ) {
        throw ApiError.RefreshError(deleteSuccess.success);
      }
      return res.status(200).json(deleteSuccess);
    } catch (error) {
      next(error);
    }
  }
  // controller to receive data to update the contact
  async updateContact(req, res, next) {
    try {
      const { fullName, number, id, owner, userRole } = req.body;
      let avatar = req.file;
      if (!avatar) {
        avatar = { path: "noAvatar" };
      }
      if (fullName == "" || number == "") {
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
  // data retrieval controller to find all available contacts
  async findAllContact(req, res, next) {
    try {
      return res.status(200).json(await contactService.getAllContact(req.body));
    } catch (error) {
      next(error);
    }
  }
}

export default new contactHttpController();
