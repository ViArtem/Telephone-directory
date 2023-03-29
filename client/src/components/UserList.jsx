import React, { useEffect, useState } from "react";
import axios from "axios";
import Photo from "./UI/photo/Photo";
import MyButton from "./UI/button/MyButton";
import jwt from "jwt-decode";
import MyPaginate from "./UI/pagination/MyPagnation";

const UserList = ({
  updatingList,
  setupdatingList,
  editModal,
  editModalValue,
}) => {
  const [contacts, setContact] = useState([]);
  const [viewUser, setViewUser] = useState();
  const [page, setPage] = useState(3);
  const [howMany, setHowMany] = useState(0);
  const [contactData, setContactData] = useState({
    fullName: "",
    action: "Delete",
    imgPath: "",
    userId: "",
    userRole: "",
    id: "",
  });

  async function changeList(e) {
    setHowMany((prevState) => ({ ...prevState, pages: e.selected }));
    const allContact = await axios.post("http://localhost:4000/contact/all", {
      pages: e.selected,
    });
    setContact([...allContact.data]);
  }

  //
  function adminView(number, name, avatar, id) {
    if (jwt(localStorage.getItem("Authorization")).role === "admin") {
      setContactData({
        fullName: name,
        number: number,
        imgPath: avatar,
        userId: jwt(localStorage.getItem("Authorization")).id,
        userRole: jwt(localStorage.getItem("Authorization")).role,
        action: "Delete",
        id,
      });
      return setViewUser(number);
    }
  }

  //

  //
  async function deleteContact(e) {
    try {
      e.preventDefault();
      const response = await axios.delete(
        "http://localhost:4000/contact/delete",
        {
          data: contactData,
        }
      );
      setContactData({ fullName: "", action: "", imgPath: "" });
      setupdatingList(Math.random());
    } catch (error) {
      console.log(error);
    }
  }
  //
  function editContact(e) {
    e.preventDefault();

    editModal(true);
    editModalValue({
      fullName: contactData.fullName,
      number: contactData.number,
      id: contactData.id,
    });
  }
  //
  useEffect(() => {
    console.log(howMany);
    axios
      .post("http://localhost:4000/contact/all", { pages: howMany })
      .then((allContact) => {
        if (allContact === undefined) {
          return console.log("Null");
        }

        setContact([...allContact.data]);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [updatingList]);

  return (
    <div className="userList">
      <h1
        style={{
          marginBottom: "20px",
          display: "inline-block",
          fontSize: "32px",
          fontWeight: "700",
          width: "100%",
        }}
      >
        CONTACTS
      </h1>

      {contacts ? (
        <ul>
          {contacts.map((contact, index) => (
            <div
              onClick={() => {
                adminView(
                  contact.number,
                  contact.fullName,
                  contact.avatar,
                  contact._id
                );
              }}
              key={Math.random()}
              className="contactLi"
            >
              <Photo>
                <img
                  style={{
                    with: "75px",
                    height: " 75px",
                    marginRight: "auto",
                    marginLeft: "auto",
                  }}
                  src={`http://localhost:4000/${contact.avatar}`}
                  alt="Logo"
                />
              </Photo>
              <div>
                <p style={{ marginRight: "auto", with: "100%" }}>
                  {contact.fullName}
                </p>
                {viewUser == contact.number ? <p>{viewUser}</p> : ""}
              </div>
              <div>
                {viewUser == contact.number ? (
                  <MyButton
                    onClick={editContact}
                    style={{ marginBottom: "3px" }}
                  >
                    Edit
                  </MyButton>
                ) : (
                  ""
                )}
                {viewUser == contact.number ? (
                  <MyButton
                    onClick={deleteContact}
                    style={{
                      marginBottom: "-2px",
                      border: " 1px solid rgb(255, 150, 200)",
                    }}
                  >
                    Delete
                  </MyButton>
                ) : (
                  ""
                )}
              </div>
            </div>
          ))}
        </ul>
      ) : (
        ""
      )}
      <MyPaginate handlePageClick={changeList} pageCount={page} />
    </div>
  );
};

export default UserList;
