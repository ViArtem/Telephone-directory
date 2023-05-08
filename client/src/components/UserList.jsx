import React, { useEffect, useState } from "react";
import axios from "axios";
import Photo from "./UI/photo/Photo";
import MyButton from "./UI/button/MyButton";
import jwt from "jwt-decode";
import MyPaginate from "./UI/pagination/MyPagnation";
import avatarImage from "../components/icon/avatar3.jpg";
import MyInput from "./UI/input/MyInput";

const UserList = ({
  deletes,
  updatingList,
  setupdatingList,
  editModal,
  editModalValue,
}) => {
  const [contactLiClass, setContactLiClass] = useState("contactLi");
  useEffect(() => {
    if (jwt(localStorage.getItem("Authorization")).role === "admin") {
      setContactLiClass("contactLi contactLiAdmin");
    }
  }, []);

  const [contacts, setContact] = useState([]);
  const [viewUser, setViewUser] = useState();
  const [page, setPage] = useState(1);
  const [howMany, setHowMany] = useState(0);
  const [contactData, setContactData] = useState({
    fullName: "",
    action: "Delete",
    imgPath: "",
    userId: "",
    userRole: "",
    id: "",
  });

  const [contactFilter, setContactFilter] = useState("");
  useEffect(() => {
    if (contactFilter.trim() === "" || contactFilter.length < 3) {
      return setupdatingList(Math.random());
    }
    if (contactFilter.length < 3) {
      return;
    }
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}contact/find/part`, {
        fullName: contactFilter,
      })
      .then((data) => {
        setHowMany(0);
        setPage(1);
        setContact([...data.data]);
      });
  }, [contactFilter]);

  async function changeList(e) {
    setHowMany(e.selected);

    const allContact = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}contact/all`,
      {
        pages: e.selected,
      }
    );

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
        `${process.env.REACT_APP_SERVER_URL}contact/delete`,
        {
          data: contactData,
        }
      );

      contacts.pop();
      if (contacts.length === 0) {
        setHowMany(howMany - 1);
      }
      setupdatingList(Math.random());
      setContactData({ fullName: "", action: "", imgPath: "" });

      deletes(response);
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
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}contact/all`, {
        pages: howMany,
      })
      .then((allContact) => {
        if (allContact === undefined) {
          return console.log("Null");
        }

        if (allContact.data[0].id <= 5) {
          setPage(1);
        } else if (allContact.data[0].id > 5) {
          setPage(Math.ceil(allContact.data[0].id / 5));
        }
        if (allContact.data.length === 0) {
          return setContact([]);
        }
        setContact([...allContact.data]);
      })
      .catch((e) => {
        setContact([]);
        console.log(e);
      });
  }, [updatingList]);

  return (
    <div className="userList">
      <div className="userListContent">
        <h1>CONTACTS</h1>

        {contacts.length ? (
          <ul style={{ height: "370px" }}>
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
                className={contactLiClass}
              >
                <Photo>
                  <img
                    src={
                      contact.avatar !== "noAvatar"
                        ? `${process.env.REACT_APP_SERVER_URL}${contact.avatar}`
                        : avatarImage
                    }
                    alt="Logo"
                  />
                </Photo>
                <div className="liFullname">
                  <p
                    style={{
                      marginRight: "auto",
                      with: "100%",
                    }}
                  >
                    {contact.fullName}
                  </p>
                  {viewUser == contact.number ? <p>{viewUser}</p> : ""}
                </div>
                <div>
                  {viewUser == contact.number ? (
                    <MyButton
                      onClick={editContact}
                      style={{
                        width: "65px",
                        height: "25px",
                        fontSize: "14px",
                      }}
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
                        width: "65px",
                        fontSize: "14px",
                        height: "25px",
                        marginTop: "3px",
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
          <div className="emptyList">
            <p style={{ color: "rgba(39, 38, 67, 1)" }}>
              The contact list is empty
            </p>
          </div>
        )}
        <MyInput
          style={{ width: "200px", marginTop: "20px" }}
          onChange={(e) => setContactFilter(e.target.value)}
          placeholder="Filter contacts"
        ></MyInput>
        <div className="paginateContainer">
          <MyPaginate handlePageClick={changeList} pageCount={page} />
        </div>
      </div>
    </div>
  );
};

export default UserList;
