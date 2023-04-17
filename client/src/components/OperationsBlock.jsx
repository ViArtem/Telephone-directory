import React, { useEffect, useState } from "react";
const OperationsBlock = ({
  styleClass,
  foundRequest,
  addRequest,
  deleteRequest,
  editRequest,
  socket,
  setupdatingList,
}) => {
  let className = "otherBlock operationsBlock";
  const [action, setAction] = useState([]);

  if (styleClass) {
    className += styleClass;
  }

  useEffect(() => {
    if (foundRequest) {
      try {
        if (foundRequest.data.fullName) {
          return setAction([
            ...action,
            `Found request ${JSON.stringify(foundRequest.data.fullName)}`,
          ]);
        }
      } catch (error) {
        if (foundRequest.success == "Contact no found") {
          return setAction([...action, "No found enter correct name"]);
        }

        if (foundRequest.success == "The value cannot be empty") {
          return setAction([...action, "The value cannot be empty"]);
        }
      }
    }
  }, [foundRequest]);

  useEffect(() => {
    if (addRequest) {
      try {
        if (addRequest.data) {
          return setAction([...action, `Add ${addRequest.data.fullName} `]);
        }
        if (addRequest.success === "Such a contact already exists") {
          return setAction([...action, addRequest.success]);
        }

        if (addRequest.success === "Name not valid" || "Number not valid") {
          return setAction([...action, addRequest.success]);
        }

        if (addRequest.success === "The number or name is not valid") {
          return setAction([...action, `Validate Error`]);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [addRequest]);

  useEffect(() => {
    if (deleteRequest) {
      setAction([...action, `Delete request`]);
    }
  }, [deleteRequest]);

  //displaying an inscription about the edited user in the block with operations
  useEffect(() => {
    if (editRequest) {
      try {
        if (
          editRequest.response.data.message.message == "Name not valid" ||
          editRequest.response.data.message.message == "Number not valid"
        ) {
          return setAction([
            ...action,
            editRequest.response.data.message.message,
          ]);
        }
        if (editRequest.response.data.message == "The value cannot be empty") {
          return setAction([
            ...action,
            editRequest.response.data.message.message,
          ]);
        }
      } catch (error) {
        if (editRequest.data.fullName) {
          return setAction([
            ...action,
            `Update request ${editRequest.data.fullName}`,
          ]);
        }
        console.log(error);
      }
    }
  }, [editRequest]);

  //socket
  const [addRequestForHistory, setAddRequestForHistory] = useState([]);
  const [socketAction, setSocketAction] = useState([]);
  if (socket) {
    //displaying an inscription about the added user in the block with operations

    socket.on("add user", (data) => {
      if (
        data.userErrorName == "Name not valid" ||
        data.userErrorName == "Number not valid" ||
        data.userErrorName == "The value cannot be empty" ||
        data.userErrorName == "Such a contact already exists"
      ) {
        return setAddRequestForHistory([
          ...addRequestForHistory,
          data.userErrorName,
        ]);
      }

      setAddRequestForHistory([
        ...addRequestForHistory,
        `Add request ${data.newUserData.fullName}`,
      ]);
      setupdatingList(Math.random() + Math.random());
    });

    //displaying an inscription about the found user in the block with operations
    socket.on("find user", (data) => {
      if (
        data.userFirstName == "User not found" ||
        data.userFirstName == "The value cannot be empty"
      ) {
        return setAddRequestForHistory([
          ...addRequestForHistory,
          `${data.userFirstName}`,
        ]);
      }

      setAddRequestForHistory([
        ...addRequestForHistory,
        `Find request ${data.foundData.fullName} `,
      ]);
    });

    //displaying an inscription about the edited user in the block with operations
    socket.on("edit user", (data) => {
      if (
        data.userErrorName == "The value cannot be empty" ||
        data.userErrorName == "Name not valid" ||
        data.userErrorName == "Number not valid"
      ) {
        return setAddRequestForHistory([
          ...addRequestForHistory,
          data.userErrorName,
        ]);
      }
      setAddRequestForHistory([
        ...addRequestForHistory,
        `Edit request ${data.userFirstName.fullName}`,
      ]);
      setupdatingList(Math.random() + Math.random());
    });

    //displaying an inscription about the deleted user in the block with operations
    socket.on("delete user", (data) => {
      setAddRequestForHistory([
        ...addRequestForHistory,
        `${data.userFirstName.success}`,
      ]);
      setupdatingList(Math.random() + Math.random());
    });
  }

  useEffect(() => {
    if (socket) {
      setSocketAction([...addRequestForHistory]);
    }
  }, [addRequestForHistory]);

  return (
    <div className={className}>
      <h1>OPERATIONS</h1>
      <ul>
        {foundRequest || deleteRequest || addRequest || editRequest
          ? action.map((act) => {
              return <p key={Math.random()}>{act}</p>;
            })
          : ""}

        {socket
          ? socketAction.map((act, index) => {
              return <p key={Math.random()}>{act}</p>;
            })
          : ""}
      </ul>
    </div>
  );
};

export default OperationsBlock;
