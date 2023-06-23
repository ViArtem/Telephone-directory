import administratorAdapter from "../adapters/adminAdapter.js";
import jwt_decode from "jwt-decode";

async function setHistory(req, res, next) {
  try {
    if (req.body.action) {
      const userActions = req.body.action;
      const userName = jwt_decode(req.headers.authorization).username;

      const actionsArray = ["Find", "Add", "Delete", "Edit"];

      actionsArray.forEach(async (actions) => {
        if (actions === userActions) {
          await administratorAdapter.addAction(
            `User ${userName} send http request for a ${actions.toLowerCase()} contact ${
              req.body.fullName
            }`,
            new Date()
          );
          return;
        }
      });
    }
    next();
  } catch (error) {
    console.log(error);
    next();
  }
}

export { setHistory };
