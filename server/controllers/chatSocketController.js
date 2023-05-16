import { io } from "../startServers/socketServer.js";
import messageService from "../services/messageService.js";

async function socketChat() {
  io.sockets.on("connection", (socket) => {
    //
    function validateMessage(data) {
      if (
        (data.hasOwnProperty("message") && data.message.trim() === "") ||
        data.message == undefined
      ) {
        io.to(data.id).emit("validation error", {
          message: "The message cannot be empty",
        });
        return false;
      }

      return true;
    }
    //
    socket.on("joinAdminRoom", (roomName) => {
      socket.join("admin");
    });

    //

    socket.on("joinRoom", (roomName) => {
      socket.join(roomName.id);
    });

    // processes messages sent by the user

    socket.on("userMessage", async (data) => {
      //validation
      if (!validateMessage(data)) {
        return;
      }
      data.message = data.message.substr(0, 256);
      const message = await messageService.addNewUserMessage(data);

      io.to(data.id).emit("allMessage", {
        message: message.messageForEmitAllMessage.message,
      });

      io.to("admin").emit("adminMessage", {
        message: message.messageForEmitAdminMessage.message,
      });
    });

    // processes messages sent by the administrator

    socket.on("admin sent a message", async (data) => {
      //  validation
      if (!validateMessage(data)) {
        return;
      }

      const message = await messageService.addNewAdminMessage(data);

      io.to(data.id).emit("allMessage", { message: message.message });

      io.to(data.id).emit("have new message", {
        message: true,
      });
    });

    //

    socket.on("get chat list", async (data) => {
      const chatList = await messageService.getChatList(data);

      socket.emit("chat data", {
        list: chatList,
      });
    });

    //

    socket.on("getChat", async (data) => {
      const userChat = await messageService.getChat(data);

      socket.emit("user messages", {
        messages: userChat.userMessage,
      });
    });

    // Checks for new messages from users and sends them to the administrator

    socket.on("checking for new messages", async (role) => {
      if (role.role === "admin") {
        const newMessage = await messageService.checkMessage();

        socket.emit("admin has new message", { message: newMessage });
      }
    });

    //

    socket.on("delete unread message", (usertId) => {
      messageService.deleteFromUnreadMessage(usertId);
    });
  });
}

export { socketChat };
