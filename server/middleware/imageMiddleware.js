import multer from "multer";
import uniqid from "uniqid";
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "images/");
  },
  filename(req, file, cb) {
    if (file.originalname) {
      cb(null, `${uniqid()}-${file.originalname}`);
    } else {
      cb(null, "defaulAvatar");
    }
  },
});

const types = ["image/png", "image/jpeg", "image/jpg"];

const fileFilter = (req, file, cb) => {
  if (types.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const fileSizeLimit = 20000;
export default multer({
  storage,
  fileFilter,
  limits: { fileSize: fileSizeLimit },
});
