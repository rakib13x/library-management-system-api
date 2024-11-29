import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { BookService } from "./book.service";

const createBook = catchAsync(async (req: Request, res: Response) => {
  const bookData = req.body;
  const newBook = await BookService.createBookIntoDb(bookData);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Book created successfully",
    data: newBook,
  });
});

const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const books = await BookService.getAllBooksFromDb();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Books retrieved successfully",
    data: books,
  });
});

export const BookController = {
  createBook,
  getAllBooks,
};
