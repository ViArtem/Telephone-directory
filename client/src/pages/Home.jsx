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

const socket = io.connect(`${process.env.REACT_APP_SERVER_URL}`);
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
  return (
    <div className="App">
      {/* First page */}
      <div className="page firstPage">
        <NavBar
          newMessageValue={newMessageValue}
          changeListVisible={changeChatListVisible}
          history={historyModal}
          historyList={historyModalValue}
          socketConnection={socket}
        />
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
          <div className="mainText">
            <h1 className="fistPageTitle">Artem Vitenko's Project</h1>
            <p
              className="fistPageSubtitle"
              style={{
                lineHeight: "1.5",
              }}
            >
              This site uses WebSocket and http requests as the basis for
              interacting with the server. The Add Contact module is responsible
              for saving a new contact. The Find Contact module sends a request
              to the server with the name of the contact you need, where the
              request is processed and contact information is sent as a
              response. The Found Contacts module receives a response from the
              server and displays all available information about the contact,
              including their first name, last name, phone number, and avatar.
              Buttons for deleting and editing a contact appear if you have
              created it.
            </p>
          </div>
          <UserList
            deletes={setNewDeleteContactHttp}
            editModalValue={editModalValue}
            editModal={editModal}
            updatingList={updatingList}
            setupdatingList={setUpdateList}
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
          HTTP Request
        </h1>
        <div className="secondPageContent">
          <div className="findOperationBlock">
            <FindBlock find={setNewFoundContactHttp} />
            <OperationsBlock
              foundRequest={foundRequest}
              addRequest={addRequest}
              deleteRequest={deleteRequest}
              editRequest={editRequest}
            />
          </div>
          <FoundBlock
            foundContactHttp={foundContactHttp}
            editModal={editModal}
            editModalValue={editModalValue}
            deletes={setNewDeleteContactHttp}
            isHttp={true}
            setupdatingList={setUpdateList}
          />
          <AddContactBlock
            add={setNewAddContactHttp}
            setupdatingList={setUpdateList}
          />
        </div>
        <hr className="line" />
      </div>

      {/* Third page */}
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
            <FindBlock socket={socket} />
            <OperationsBlock socket={socket} setupdatingList={setUpdateList} />
          </div>
          <FoundBlock
            socket={socket}
            editModal={editModal}
            editModalValue={editModalValue}
            setupdatingList={setUpdateList}
          />
          <AddContactBlock socket={socket} setupdatingList={setUpdateList} />
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
        {/*  */}
      </div>
      <hr className="line" />

      <Footer></Footer>
    </div>
  );
}

export default Home;
