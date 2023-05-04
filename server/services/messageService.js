import messageFileRequest from "../filesService/messageFileRequest.js";

class messageService {
  async addNewUserMessage(data) {
    const userList = await messageFileRequest.getUsers();

    let checkUser = false;
    const chatValue = {};

    for (const elm of userList) {
      if (elm.userId === data.id) {
        elm.userMessage.push({
          message: data.message,
          date: data.date,
        });

        checkUser = true;

        //
        const newMessageData = {
          userId: elm.userId, //
          message: data.message,
          date: data.date,
        };

        this.addUnreadMessage(newMessageData);
        //

        chatValue["messageForEmitAdminMessage"] = { message: elm };
        chatValue["messageForEmitAllMessage"] = { message: elm.userMessage };
        break;
      }
    }

    if (checkUser) {
      await messageFileRequest.addMessage(JSON.stringify(userList, null, 2));
      return chatValue;
    }

    if (!checkUser) {
      userList.unshift({
        userId: data.id,
        avatar: data.avatar,
        userName: data.fullName,
        userMessage: [{ message: data.message, date: data.date }],
      });
      checkUser = false;

      await messageFileRequest.addMessage(JSON.stringify(userList, null, 2));

      return {
        messageForEmitAdminMessage: {
          message: {
            userId: data.id,
            userName: data.fullName,
            userMessage: [{ message: data.message, date: data.date }],
          },
        },
        messageForEmitAllMessage: {
          message: [
            {
              message: data.message,
              date: {
                userId: data.id,
                userName: data.fullName,
                userMessage: [{ message: data.message, date: data.date }],
              },
            },
          ],
        },
      };
    }
  }

  // adds a new message to the list of unread messages
  async addUnreadMessage(data) {
    const messageList = await messageFileRequest.getNewMessageList();

    messageList.push({
      userId: data.userId, //elm
      message: {
        message: data.message,
        date: data.date,
      },
    });

    //
    await messageFileRequest.addUnreadMessage(
      JSON.stringify(messageList, null, 2)
    );
  }

  //
  async addNewAdminMessage(data) {
    const userList = await messageFileRequest.getUsers();
    userList.forEach((elm) => {
      if (elm.userId === data.id) {
        elm.userMessage.push({
          message: data.message,
          date: data.date,
          owner: data.owner,
        });

        return;
      }
    });

    await messageFileRequest.addMessage(JSON.stringify(userList, null, 2));

    const mes = userList
      .filter((elm) => elm.userId === data.id)
      .map((elm) => {
        return { message: elm.userMessage };
      });

    return mes[0];
  }

  // Returns a list of all users who have written to the admin

  async getChatList() {
    return messageFileRequest.getUsers();
  }

  async addEmptyUserList(data) {
    const userList = await messageFileRequest.getUsers();

    userList.unshift({
      userId: data.id,
      avatar: data.avatar,
      userName: data.fullName,
      userMessage: [
        {
          message: "Good afternoon, how can I help you?",
          date: Number(Date.now()),
          owner: "admin",
        },
      ],
    });
    await this.addUnreadMessage({
      userId: data.id, //
      message: "new user send mess",
      date: Number(Date.now()),
    });
    await messageFileRequest.addMessage(JSON.stringify(userList, null, 2));
  }

  // Returns the user's chat

  getChat = async (data) => {
    const userList = await messageFileRequest.getUsers();

    const userchat = userList.find((elm) => {
      if (elm.userId === data.id) {
        return elm;
      }
    });

    if (userchat) {
      return userchat;
    }

    await this.addEmptyUserList(data);
    return await this.getChat(data);
    //;
  };

  //

  async checkMessage() {
    const messages = await messageFileRequest.getNewMessageList();
    if (messages.length) {
      return messages;
    }
  }

  //

  async deleteFromUnreadMessage(id) {
    const message = await messageFileRequest.getNewMessageList();
    const newMessageList = message.filter((elm) => elm.userId !== id.userId);
    await messageFileRequest.addUnreadMessage(
      JSON.stringify(newMessageList, null, 2)
    );
  }
}

export default new messageService();
