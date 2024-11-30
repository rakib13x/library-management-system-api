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

const getOverdueBorrowList = catchAsync(async (req: Request, res: Response) => {
  const overdueList = await BorrowService.getOverdueBorrows();

  if (overdueList.length > 0) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Overdue borrow list fetched",
      data: overdueList,
    });
  } else {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "No overdue books",
      data: [],
    });
  }
});

export const BorrowController = {
  borrowBook,
  returnBook,
  getOverdueBorrowList,
};
