import { app } from "../server.js";
import { createRequire } from "node:module";
import { socketData } from "../controllers/contactSocketController.js";
import { socketChat } from "../controllers/chatSocketController.js";
import connectToDatabase from "../databasesСonnecting/connectToMongo.js";
import helpers from "../exсeptions/helpers.js";
import path from "node:path";
const require = createRequire(import.meta.url);

let io;
const PORT = process.env.PORT || 4000;
// start the socket server
function startSocketServer() {
  try {
    const server = require("http").createServer(app);
    io = require("socket.io")(server, {
      cors: {
        origin: process.env.FRONTEND_URL,
      },
      maxHttpBufferSize: 1e8,
      transports: ["websocket", "polling"],
    });

    server.listen(PORT, async () => {
      if (process.env.QUERY_PARAMETERS === "mongo") {
        connectToDatabase();
      }

      await helpers.checkPresenceFolder(path.resolve("images"));

      console.log("Started socket server...");
    });
    socketData();
    socketChat();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
export { io, startSocketServer };
