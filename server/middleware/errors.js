import { MulterError } from "multer";
import ApiError from "../exсeptions/apiError.js";
export default function errorMiddleware(err, req, res, next) {
  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors });
  }
  if (err instanceof MulterError) {
    return res.status(400).json({ message: err.message });
  }
  console.log(err);
  return res.status(500).json({ message: "server error" });
}
