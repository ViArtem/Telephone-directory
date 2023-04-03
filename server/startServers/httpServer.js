import { app } from "../server.js";
import connectToDatabase from "../databasesСonnecting/connectToMongo.js";
// start the http server
const PORT = process.env.PORT || 8080;
function startHttpServer() {
  app.listen(PORT, () => {
    connectToDatabase();
  });
  return "Start http server...";
}

export { startHttpServer };
