import adminServise from "../services/adminServiсe.js";
import jwt_decode from "jwt-decode";
import ApiError from "../exсeptions/apiError.js";

class adminController {
  // a request from the administrator to receive the entire history
  async getAllHistory(req, res, next) {
    try {
      const rightsCheck = jwt_decode(req.headers.authorization);

      if (rightsCheck.role === "admin") {
        return res.status(200).json(await adminServise.getHistory());
      }
      // error handling
      throw ApiError.RefreshError("you don't have enough rights");
    } catch (error) {
      next(error);
    }
  }
}
export default new adminController();
