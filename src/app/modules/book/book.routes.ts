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

router.get("/", BookController.getAllBooks);
router.get("/:bookId", BookController.getSingleBook);
router.patch(
  "/:bookId",
  validateRequest(BookValidation.updateBook),
  BookController.updateBook
);

router.delete("/:bookId", BookController.deleteBook);

export const BookRoutes = router;
