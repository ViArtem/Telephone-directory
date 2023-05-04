import React, { useEffect, useState } from "react";
import Photo from "./UI/photo/Photo";
import avatarImage from "../components/icon/avatar.svg";
import jwt from "jwt-decode";
const AdminChatWindow = ({
  socketConnection,
  userChatData,
  changeVisible,
  cangeListVisible,
  newMessageValue,
}) => {
  const [messageList, setMessageList] = useState([]);

  //
  const [messageId, setMessageId] = useState(new Set());

  function openChat(chatInfo) {
    messageId.delete(`${chatInfo.userId}`);

    socketConnection.emit("joinRoom", {
      id: chatInfo.userId,
    });
    // Deletes from the list of unread messages
    socketConnection.emit("delete unread message", {
      userId: chatInfo.userId,
    });
    userChatData(chatInfo);
    changeVisible(true);
  }

  socketConnection.on("chat data", (data) => {
    setMessageList([...data.list]);
  });

  function getNewMessage() {
    return new Promise((resolve) => {
      socketConnection.on("adminMessage", (message) => {
        resolve(message);
      });
    });
  }

  const [newMessage, setNewMessage] = useState();
  const [messageCount, setMessageCount] = useState(1);

  (async function renderMessageForAdmin() {
    const neMess = await getNewMessage();

    if (neMess) {
      messageList.forEach(async (elm) => {
        if (elm.userId === neMess.message.userId) {
          elm.userMessage = [...neMess.message.userMessage];
          setMessageList([...messageList]);

          messageId.add(neMess.message.userId);

          return setNewMessage("hasNewMessage");
        }
      });
    }
  })();

  // Сhecks whether the administrator has unread messages, if there are any, displays a notification

  const [hasNewMessage, setHasNewMessage] = useState("");
  socketConnection.on("admin has new message", (message) => {
    setHasNewMessage(message);
  });

  useEffect(() => {
    if (hasNewMessage.message) {
      messageList.forEach((elm) => {
        hasNewMessage.message.forEach((newMessage) => {
          if (newMessage.userId === elm.userId) {
            messageId.add(newMessage.userId);

            setMessageCount(1);
            setNewMessage("hasNewMessage");
          }
        });
      });
    }
  }, [hasNewMessage]);
  //

  //
  return (
    <div className="supportAdmin">
      <p
        onClick={() => {
          changeVisible(false);
          cangeListVisible(false);
        }}
      >
        Close
      </p>
      <div className="supportAdminContent">
        {messageList.map((elm) => {
          return (
            <div
              key={Math.random()}
              onClick={() => {
                openChat(elm);
              }}
              className="userChatMessage"
            >
              <Photo>
                <img
                  src={
                    elm.avatar !== "noAvatar"
                      ? `${process.env.REACT_APP_SERVER_URL}${elm.avatar}`
                      : avatarImage
                  }
                  alt="Logo"
                />
              </Photo>
              <p className="n">{elm.userName}</p>

              {messageId.has(elm.userId) ? (
                <div key={Math.random()} className={newMessage}>
                  {messageCount}
                </div>
              ) : (
                ""
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default AdminChatWindow;
