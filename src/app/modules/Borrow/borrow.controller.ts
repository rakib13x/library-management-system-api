import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";

import httpStatus from "http-status";
import { BorrowService } from "./borrow.service";

const borrowBook = catchAsync(async (req: Request, res: Response) => {
  const { bookId, memberId } = req.body;
  const borrowRecord = await BorrowService.borrowBook(bookId, memberId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book borrowed successfully",
    data: borrowRecord,
  });
});

const returnBook = catchAsync(async (req: Request, res: Response) => {
  const { borrowId } = req.body;
  await BorrowService.returnBook(borrowId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book returned successfully",
  });
});

export const BorrowController = { borrowBook, returnBook };
