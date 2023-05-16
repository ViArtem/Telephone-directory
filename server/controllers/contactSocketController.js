import { io } from "../startServers/socketServer.js";
import contactService from "../services/contactService.js";
import Helpers from "../exсeptions/helpers.js";
import administratorAdapter from "../adapters/adminAdapter.js";
import uniqid from "uniqid";
import siofu from "socketio-file-upload";
let connections = [];

//handles socket requests
async function socketData() {
  io.sockets.on("connection", (socket) => {
    let uploader = new siofu();
    uploader.dir = "/path/to/save/uploads";
    uploader.listen(socket);
    console.log("connected");
    connections.push(socket);

    socket.on("disconnect", () => {
      connections.splice(connections.indexOf(socket), 1);
      console.log("Disconnect");
    });

    //Creates a new contact
    //Accepts name, phone number, contact owner id, and contact avatar (optional).
    //Returns the object of the created contact
    socket.on("send user value", async (data) => {
      //validation

      const avatar = data.avatar;

      let avatarPath = avatar;
      let buffer;

      if (avatar !== "noAvatar") {
        buffer = Buffer.from(avatar, "base64");
        avatarPath = `images/${uniqid()}-contact.jpg`;
      }

      if (data.fullName.trim() === "" || data.number.trim() === "") {
        return io.sockets.emit("add user", {
          userErrorName: "The value cannot be empty",
        });
      }

      if (Helpers.dataValidation(data.fullName, data.number)) {
        return io.sockets.emit("add user", {
          userErrorName: Helpers.dataValidation(
            data.fullName.trim(),
            data.number.trim()
          ).message,
        });
      }

      //request to create a contact
      const newSocketUser = await contactService.addNewContact(
        Helpers.allFirstLettersCapitalized(data.fullName),
        data.number,
        data.ownerId,
        avatarPath,
        buffer
      );

      if (newSocketUser.success === "Such a contact already exists") {
        return io.sockets.emit("add user", {
          userErrorName: newSocketUser.success,
        });
      }

      //
      io.sockets.emit("add user", {
        newUserData: newSocketUser,
      });

      // add an action to the story
      await administratorAdapter.addAction(
        `Socket request to create a contact ${data.fullName}`,
        Date.now()
      );
      //
    });

    //controller for receiving data to find a contact
    socket.on("find user value", async (data) => {
      if (data.fullName.trim() === "") {
        io.sockets.emit("find user", {
          userFirstName: "The value cannot be empty",
        });
        return socket.emit("findOne user", {
          userFirstName: "The value cannot be empty",
        });
      }

      //request to find a contact
      const foundData = await contactService.findContact(
        Helpers.allFirstLettersCapitalized(data.fullName.trim())
      );

      if (foundData === null) {
        io.sockets.emit("find user", {
          userFirstName: "User not found",
        });
        socket.emit("findOne user", {
          userFirstName: "User not found",
        });
      } else {
        io.sockets.emit("find user", {
          foundData: foundData,
        });
        socket.emit("findOne user", {
          foundData: foundData,
        });

        // add an action to the story
        await administratorAdapter.addAction(
          `Socket request to find a contact ${data.fullName}`,
          Date.now()
        );
      }
    });

    // controller to receive data to delete a contact
    socket.on("delete user value", async (data) => {
      // request to delete a contact

      const deletedUser = await contactService.deleteContact(
        data.fullName,
        data.ownerId,
        data.userRole,
        data.imagePath
      );

      io.sockets.emit("delete user", {
        userFirstName: deletedUser,
      });

      // add an action to the story
      await administratorAdapter.addAction(
        `Socket request to delete a contact ${data.fullName}`,
        Date.now()
      );
    });

    // controller to receive data to update the contact
    socket.on("edit user value", async (data) => {
      //validation

      const buffer = Buffer.from(data.avatar, "base64");
      const avatarPath = `images/${uniqid()}-contact.jpg`;
      if (data.newFullName.trim() === "" || data.newNumber.trim() === "") {
        return io.sockets.emit("edit user", {
          userErrorName: "The value cannot be empty",
        });
      }

      if (
        Helpers.dataValidation(data.newFullName.trim(), data.newNumber.trim())
      ) {
        return io.sockets.emit("edit user", {
          userErrorName: Helpers.dataValidation(
            data.newFullName.trim(),
            data.newNumber.trim()
          ).success,
        });
      }

      // request to update a contact
      const updatingUser = await contactService.updateContact(
        Helpers.allFirstLettersCapitalized(data.newFullName),
        data.newNumber.trim(),
        data.idForUpdate,
        data.owner,
        data.userRole,
        avatarPath,
        buffer
      );

      if (updatingUser.fullName) {
        io.sockets.emit("edit user", {
          userFirstName: updatingUser,
        });

        // add an action to the story
        await administratorAdapter.addAction(
          `Socket request to update a contact ${data.fullName}`,
          Date.now()
        );
      } else {
        io.sockets.emit("edit user", {
          userFirstName: "User don't update",
        });
      }
    });

    socket.on("filter", async (filterData) => {
      if (filterData.fullName.trim() === "") {
        return;
      }
      const filterUserList = await contactService.getContactByPartData(
        Helpers.allFirstLettersCapitalized(filterData.fullName.trim())
      );
      io.sockets.emit("filter data", {
        filterUserList,
      });
    });
  });
}
export { socketData };
