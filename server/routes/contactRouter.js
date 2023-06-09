import { Router } from "express";
import contactHttpController from "../controllers/contactHttpController.js";
import multer from "../middleware/imageMiddleware.js";
const contactRouter = new Router();

contactRouter.post("/contact/find", contactHttpController.findContact);
contactRouter.post(
  "/contact/find/part",
  contactHttpController.findContactByPartData
);
contactRouter.post("/contact/add", contactHttpController.addContact);
contactRouter.delete("/contact/delete", contactHttpController.deleteContact);
contactRouter.put("/contact/update", contactHttpController.updateContact);
contactRouter.post("/contact/all", contactHttpController.findAllContact);

export { contactRouter };

//multer.single("avatar"),
