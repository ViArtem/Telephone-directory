import React, { useState, useEffect } from "react";
import FindBlock from "../components/FindBlock";
import AddContactBlock from "../components/AddBlock";
import FoundBlock from "../components/FoundBlock";
import OperationsBlock from "../components/OperationsBlock.jsx";
import UserList from "../components/UserList";
import NavBar from "../components/NavBar";
import EditForm from "../components/EditForm";

import "../styles/App.css";

//socket
import io from "socket.io-client";
import MyModal from "../components/UI/MyModal/MyModal";
import HistoryBlock from "../components/HistoryBlock";

const socket = io.connect("http://localhost:4000");
//
function Home() {
  //Додає в список операцій знайдений контакт
  const [foundRequest, setFoundRequest] = useState();
  const [foundContactHttp, setFoundContactHttp] = useState();
  function setNewFoundContactHttp(newContact) {
    setFoundContactHttp(newContact);
    setFoundRequest(newContact);
  }
  //

  //Додає в список операцій створений контaкт
  const [addRequest, setAddRequest] = useState();
  function setNewAddContactHttp(newContact) {
    setAddRequest(newContact);
  }
  //

  //Додає в список операцій редагований контaкт
  const [editRequest, setEditRequest] = useState();
  function setNewEditContactHttp(newContact) {
    setEditRequest(newContact);
  }
  //

  //Додає в список операцій видалений контaкт
  const [deleteRequest, setDeleteRequest] = useState();
  function setNewDeleteContactHttp(newContact) {
    setDeleteRequest(newContact);
  }
  //

  //

  //

  // модальне вікно значення які ми будем передавати при натисканні кнопки
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

  //

  //модалка для історій
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
  return (
    <div className="App">
      <NavBar history={historyModal} historyList={historyModalValue} />
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

        <div className="httpContainer">
          <h1
            style={{
              fontSize: "24px",
              fontWeight: "700",
              marginBottom: "10px",
            }}
          >
            HTTP REQUEST
          </h1>
          <div className="rowBlock">
            <FindBlock find={setNewFoundContactHttp} />

            <FoundBlock
              foundContactHttp={foundContactHttp}
              editModal={editModal}
              editModalValue={editModalValue}
              deletes={setNewDeleteContactHttp}
              isHttp={true}
              setupdatingList={setUpdateList}
            />
          </div>
          <div className="rowBlock">
            <AddContactBlock
              add={setNewAddContactHttp}
              setupdatingList={setUpdateList}
            />

            <OperationsBlock
              foundRequest={foundRequest}
              addRequest={addRequest}
              deleteRequest={deleteRequest}
              editRequest={editRequest}
            />
          </div>
        </div>
        <UserList
          editModalValue={editModalValue}
          editModal={editModal}
          updatingList={updatingList}
          setupdatingList={setUpdateList}
        />

        <div className="container">
          <div>
            <h1
              style={{
                fontSize: "24px",
                fontWeight: "700",
                marginBottom: "10px",
              }}
            >
              SOCKET REQUEST
            </h1>
            <div className="rowBlock">
              <FoundBlock
                styleClass="socketColor"
                socket={socket}
                editModal={editModal}
                editModalValue={editModalValue}
                setupdatingList={setUpdateList}
              />
              <FindBlock styleClass="socketColor" socket={socket} />
            </div>
            <div className="rowBlock">
              <AddContactBlock
                styleClass="socketColor"
                socket={socket}
                setupdatingList={setUpdateList}
              />

              <OperationsBlock
                styleClass="socketColor"
                socket={socket}
                setupdatingList={setUpdateList}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
