import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { BookController } from "./book.controller";
import { BookValidation } from "./book.validations";

const router = express.Router();

router.post(
  "/",
  validateRequest(BookValidation.createBook),
  BookController.createBook
);

export const BookRoutes = router;
