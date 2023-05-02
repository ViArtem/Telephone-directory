import React, { useEffect, useState, useRef } from "react";
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";
import jwt from "jwt-decode";
const SupportWindow = ({
  socketConnection,
  chatData,
  admin,
  visible,
  changeVisible,
  changeNewMessageValue,
}) => {
  const [userHasMessage, setUserHasMessage] = useState(false);
  const [userMessageList, setMessageList] = useState([]);

  useEffect(() => {
    if (jwt(localStorage.getItem("Authorization")).role !== "admin") {
      socketConnection.emit("joinRoom", {
        id: jwt(localStorage.getItem("Authorization")).id,
      });
    }
  }, []);

  useEffect(() => {
    socketConnection.on("have new message", (data) => {
      if (!visible) {
        return setUserHasMessage(true);
      }
      setUserHasMessage(false);
    });
  }, [userMessageList]);

  useEffect(() => {
    if (jwt(localStorage.getItem("Authorization")).role === "admin") {
      socketConnection.emit("joinAdminRoom", {});
    }
  }, []);

  //Users chat
  const [message, setMessage] = useState();

  async function userSendMessage(e) {
    e.preventDefault();
    if (admin) {
      // && chatData
      socketConnection.emit("joinRoom", {
        id: chatData.userId,
      });

      socketConnection.emit("admin sent a message", {
        message,
        date: Number(Date.now()),
        fullName: jwt(localStorage.getItem("Authorization")).username,
        id: chatData.userId,
        owner: "admin",
      });
      const allChatMessage = await getAllMessage();
      setMessageList([...allChatMessage.message]);
      setMessage("");

      return;
    }
    //
    socketConnection.emit("joinRoom", {
      id: jwt(localStorage.getItem("Authorization")).id,
    });
    //

    //

    socketConnection.emit("userMessage", {
      message: message,
      date: Number(Date.now()),
      fullName: jwt(localStorage.getItem("Authorization")).username,
      id: jwt(localStorage.getItem("Authorization")).id,
      avatar: jwt(localStorage.getItem("Authorization")).avatar,
    });
    setMessage("");
    const allChatMessage = await getAllMessage();
    setMessageList([...allChatMessage.message]);
  }

  const [checkMessage, setCheckMessage] = useState(0);

  // Displays a chat for the user when they click on the support button
  function renderUserChat() {
    setUserHasMessage(false);
    if (checkMessage === 0) {
      socketConnection.emit("getChat", {
        id: jwt(localStorage.getItem("Authorization")).id,
      });

      socketConnection.on("user messages", (data) => {
        setMessageList([...userMessageList, ...data.messages]);
      });

      changeVisible(true);
      setCheckMessage(1);
    } else {
      changeVisible(false);
      setMessageList([]);
      setCheckMessage(0);
    }
  }

  // Updates the chat when a new message is received
  function getAllMessage() {
    return new Promise((resolve) => {
      socketConnection.once("allMessage", (message) => {
        resolve(message);
      });
    });
  }

  (async function renderMessageForAllInRoom() {
    if (await getAllMessage()) {
      const allChatMessage = await getAllMessage();
      setMessageList([...allChatMessage.message]);
    }
  })();
  //

  //

  function getNewMessage() {
    return new Promise((resolve) => {
      socketConnection.on("adminMessage", (message) => {
        resolve(message);
      });
    });
  }

  (async function renderMessageForAdmin() {
    if (await getNewMessage()) {
      changeNewMessageValue(await getNewMessage());
    }
  })();

  useEffect(() => {
    if (admin && chatData) {
      setMessageList([...chatData.userMessage]);
    }
  }, [chatData]);

  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      const scrollContainer = scrollContainerRef.current;
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [userMessageList]);

  //
  return (
    <div className="support">
      {visible ? (
        <div className="supportChat">
          <div className="supportChatContent">
            <div
              ref={scrollContainerRef}
              className="scroll-container supportDialog"
            >
              {userMessageList.length ? (
                <div style={{ padding: "5px" }}>
                  {userMessageList.map((elm) => {
                    {
                      return (
                        <div className={elm.owner + "Wrapper"}>
                          <div className={elm.owner + " message"}>
                            <p>{elm.message}</p>
                            <p className="messageTime">
                              {new Date(elm.date).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              ) : (
                ""
              )}
            </div>

            <div className="supportInteract">
              <MyInput
                value={message}
                placeholder="Message"
                type="text"
                onChange={(e) => setMessage(e.target.value)}
              ></MyInput>
              <MyButton className="chatButton" onClick={userSendMessage}>
                send
              </MyButton>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {jwt(localStorage.getItem("Authorization")).role != "admin" ? (
        <div onClick={renderUserChat} className="supportButton">
          <p>support</p>
          {userHasMessage ? (
            <div className="hasNewMessage userNotifications">H</div>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export default SupportWindow;
