import express from "express";

import validateRequest from "../../middlewares/validateRequest";
import { BorrowController } from "./borrow.controller";
import { BorrowValidation } from "./borrow.validations";

const router = express.Router();

router.post(
  "/borrow",
  validateRequest(BorrowValidation.borrowBook),
  BorrowController.borrowBook
);
router.post(
  "/return",
  validateRequest(BorrowValidation.returnBook),
  BorrowController.returnBook
);

export const BorrowRoutes = router;
