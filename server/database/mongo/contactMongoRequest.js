import Contact from "../../models/Contact.js";
import Helpers from "../../exсeptions/helpers.js";
// queries to the database with contacts

class contactMongoDatabaseRequest {
  //contact creation
  async addContact(fullName, number, owner, id, avatar) {
    return await Helpers.handleErrors(
      new Contact({
        fullName,
        number,
        owner,
        id,
        avatar,
      }).save()
    );
  }

  // Find a contact by name
  async findContact(fullName) {
    return await Helpers.handleErrors(
      Contact.findOne({
        fullName,
      })
    );
  }

  // Find a contact by id
  async findById(_id) {
    return await Helpers.handleErrors(
      Contact.findOne({
        _id,
      })
    );
  }

  // Contact update
  async updateContact(fullName, number, id, avatar) {
    return await Helpers.handleErrors(
      Contact.findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            fullName,
            number,
            avatar,
          },
        }
      )
    );
  }

  // Deleting a contact
  async deleteContact(fullName) {
    return await Helpers.handleErrors(
      Contact.deleteOne({
        fullName,
      })
    );
  }

  // Contact update
  async getAllContact(pageData) {
    let allUserList = await Helpers.handleErrors(
      Contact.find({}, null, {
        skip: pageData.pages * 5,
        limit: 5,
      })
    );

    allUserList[0].id = await Helpers.handleErrors(Contact.countDocuments());

    return allUserList;
  }
}

export default new contactMongoDatabaseRequest();
