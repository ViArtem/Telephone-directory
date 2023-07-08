import React, { useState, useEffect } from "react";
import FindBlock from "../components/FindBlock";
import AddContactBlock from "../components/AddBlock";
import FoundBlock from "../components/FoundBlock";
import OperationsBlock from "../components/OperationsBlock.jsx";
import UserList from "../components/UserList";
import NavBar from "../components/NavBar";
import EditForm from "../components/EditForm";
import Footer from "../components/Footer";
import SupportWindow from "../components/SupportWindow";

import "../styles/App.css";

//socket
import io from "socket.io-client";
import jwt from "jwt-decode";
import MyModal from "../components/UI/MyModal/MyModal";
import HistoryBlock from "../components/HistoryBlock";
import AdminChatWindow from "../components/AdminChatWindow";
import About from "../components/About";
import ChangeAvatar from "../components/ChangeAvatar";

const socket = io.connect(`${process.env.REACT_APP_SERVER_URL}`, {
  transports: ["websocket", "polling"],
});

//
function Home() {
  //adds the found contact to the list of operations
  const [foundRequest, setFoundRequest] = useState();
  const [foundContactHttp, setFoundContactHttp] = useState();
  function setNewFoundContactHttp(newContact) {
    setFoundContactHttp(newContact);
    setFoundRequest(newContact);
  }
  //

  //Adds the created contract to the list of operations
  const [addRequest, setAddRequest] = useState();
  function setNewAddContactHttp(newContact) {
    setAddRequest(newContact);
  }
  //

  //Adds the edited content to the list of operations
  const [editRequest, setEditRequest] = useState();
  function setNewEditContactHttp(newContact) {
    setEditRequest(newContact);
  }
  //

  //Adds deleted content to the list of operations
  const [deleteRequest, setDeleteRequest] = useState();
  function setNewDeleteContactHttp(newContact) {
    setDeleteRequest(newContact);
  }
  //

  //modal window of the values that we will pass when the button is pressed
  const [modal, setModal] = useState();
  const [userValue, setUserValue] = useState({
    firstName: "",
    lastName: "",
    number: "",
    id: "",
  });
  function editModal(check) {
    setModal(check);
  }
  function editModalValue(value) {
    setUserValue(value);
  }

  //a mod for stories
  const [modalHistory, setModalHistory] = useState();

  const [historyList, sethistoryList] = useState();
  function historyModal(value) {
    setModalHistory(value);
  }
  function historyModalValue(value) {
    sethistoryList([...value]);
  }

  //
  const [modalAbout, setModalAbout] = useState(false);
  function aboutModal(value) {
    setModalAbout(value);
  }

  // a function that transfers filtered contacts from the Find block to the UserList block
  const [filteredContacts, setFilteredContacts] = useState([]);
  function sendFilteredUsers(contacts) {
    setFilteredContacts(contacts);
  }

  // socket
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("pong", () => {
      setLastPong(new Date().toISOString());
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pong");
    };
  }, []);
  //

  let [updatingList, setupdatingList] = useState(1);
  function setUpdateList(list) {
    setupdatingList(list);
  }

  // data about the user with whom the admin opens the chat
  const [chatData, setchatData] = useState();
  function userChatData(data) {
    setchatData(data);
  }

  //
  const [visibleUserChat, setVisibleUserChat] = useState(false);
  function changeVisibleUserChat(data) {
    setVisibleUserChat(data);
  }

  const [adminVisibleUserChat, setAdminVisibleUserChat] = useState(false);
  function changeAdminVisibleUserChat(data) {
    setAdminVisibleUserChat(data);
  }

  const [chatListVisible, setChatListVisible] = useState(false);
  function changeChatListVisible(data) {
    setChatListVisible(data);
  }

  //

  const [newMessageValue, setNewMessageValue] = useState(false);
  function changeNewMessageValue(data) {
    setNewMessageValue(data);
  }

  const [changeAvatar, setChangeAvatar] = useState();
  function changeAvatarFunc(data) {
    setChangeAvatar(data);
  }
  const [changeAvatarVisible, setChangeAvatarVisible] = useState(false);
  function changeAvatarVisibleFunc(data) {
    setChangeAvatarVisible(data);
  }
  return (
    <div className="App">
      {/* First page */}
      <div className="page firstPage">
        <NavBar
          newMessageValue={newMessageValue}
          changeListVisible={changeChatListVisible}
          cangeAboutVisible={aboutModal}
          history={historyModal}
          historyList={historyModalValue}
          socketConnection={socket}
          avatarChange={changeAvatar}
          changeAvatarVisibleFunc={changeAvatarVisibleFunc}
          changeAvatarVisible={changeAvatarVisible}
        />
        {changeAvatarVisible ? (
          <ChangeAvatar
            avatarChange={changeAvatarFunc}
            changeAvatarVisibleFunc={changeAvatarVisibleFunc}
          />
        ) : (
          ""
        )}

        {jwt(localStorage.getItem("Authorization")).role == "admin" &&
        chatListVisible ? (
          <AdminChatWindow
            newMessageValue={newMessageValue}
            socketConnection={socket}
            userChatData={userChatData}
            changeVisible={changeAdminVisibleUserChat}
            cangeListVisible={changeChatListVisible}
          />
        ) : (
          ""
        )}

        <div className="firsPageContent">
          {/* */}
          <div className="findOperationBlock">
            <FindBlock find={setNewFoundContactHttp} />
            <AddContactBlock
              add={setNewAddContactHttp}
              setupdatingList={setUpdateList}
            />
          </div>
          <div>
            <FoundBlock
              foundContactHttp={foundContactHttp}
              editModal={editModal}
              editModalValue={editModalValue}
              deletes={setNewDeleteContactHttp}
              isHttp={true}
              setupdatingList={setUpdateList}
            />
            <OperationsBlock
              foundRequest={foundRequest}
              addRequest={addRequest}
              deleteRequest={deleteRequest}
              editRequest={editRequest}
            />
          </div>
          <UserList
            deletes={setNewDeleteContactHttp}
            editModalValue={editModalValue}
            editModal={editModal}
            updatingList={updatingList}
            setupdatingList={setUpdateList}
            socketConnection={socket}
          />
        </div>
        {jwt(localStorage.getItem("Authorization")).role == "admin" ? (
          <SupportWindow
            changeNewMessageValue={changeNewMessageValue}
            visible={adminVisibleUserChat}
            changeVisible={changeAdminVisibleUserChat}
            socketConnection={socket}
            chatData={chatData}
            admin={true}
          />
        ) : (
          <SupportWindow
            visible={visibleUserChat}
            changeVisible={changeVisibleUserChat}
            socketConnection={socket}
          />
        )}
        <hr className="line" />
      </div>
      {/* Second page */}

      <div className="page secondPage">
        <h1
          style={{
            fontSize: "30px",
            fontWeight: "700",
            marginBottom: "10px",
          }}
        >
          Websocket
        </h1>
        <div className="secondPageContent">
          <div className="findOperationBlock">
            <FindBlock
              sendFilteredUsers={sendFilteredUsers}
              socket={socket}
              setUpdatingList={setUpdateList}
            />
            <AddContactBlock socket={socket} setupdatingList={setUpdateList} />
          </div>
          <div>
            <FoundBlock
              socket={socket}
              editModal={editModal}
              editModalValue={editModalValue}
              setupdatingList={setUpdateList}
            />
            <OperationsBlock socket={socket} setupdatingList={setUpdateList} />
          </div>
          <UserList
            filteredContacts={filteredContacts}
            deletes={setNewDeleteContactHttp}
            editModalValue={editModalValue}
            editModal={editModal}
            updatingList={updatingList}
            setupdatingList={setUpdateList}
            socketConnection={socket}
          />
        </div>
      </div>

      {/*  */}
      <div className="socketBlock">
        <MyModal visible={modal} setVisible={setModal}>
          <EditForm
            editModal={editModal}
            userValue={userValue}
            edit={setNewEditContactHttp}
            socket={socket}
            setupdatingList={setUpdateList}
          />
        </MyModal>

        <MyModal visible={modalHistory} setVisible={setModalHistory}>
          <HistoryBlock historyList={historyList} />
        </MyModal>

        <MyModal visible={modalAbout} setVisible={setModalAbout}>
          <About />
        </MyModal>
        {/*  */}
      </div>
      <hr className="line" />

      <Footer></Footer>
    </div>
  );
}

export default Home;
