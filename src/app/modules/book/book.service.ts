import httpStatus from "http-status";
import prisma from "../../../shared/prisma";
import ApiError from "../../errors/ApiError";

const createBookIntoDb = async (payload: any) => {
  const { title, genre, publishedYear, totalCopies, availableCopies } = payload;

  const existingBook = await prisma.book.findFirst({
    where: { title },
  });

  if (existingBook) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Book with the same title already exists."
    );
  }

  const newBook = await prisma.book.create({
    data: {
      title,
      genre,
      publishedYear,
      totalCopies,
      availableCopies,
    },
  });

  return newBook;
};

const getAllBooksFromDb = async () => {
  const books = await prisma.book.findMany({
    orderBy: {
      publishedYear: "desc",
    },
  });

  return books;
};

const getSingleBookFromDb = async (bookId: string) => {
  const book = await prisma.book.findUnique({
    where: { bookId },
  });

  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book not found");
  }

  return book;
};

const updateBookIntoDb = async (bookId: string, updateData: Partial<any>) => {
  const existingBook = await prisma.book.findUnique({
    where: { bookId },
  });

  if (!existingBook) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book not found");
  }

  const updatedBook = await prisma.book.update({
    where: { bookId },
    data: updateData,
  });

  return updatedBook;
};

const deleteBookIntoDb = async (bookId: string) => {
  const existingBook = await prisma.book.findUnique({
    where: { bookId },
  });

  if (!existingBook) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book not found");
  }

  await prisma.book.delete({
    where: { bookId },
  });

  return { message: "Book deleted successfully" };
};

export const BookService = {
  createBookIntoDb,
  getAllBooksFromDb,
  getSingleBookFromDb,
  updateBookIntoDb,
  deleteBookIntoDb,
};
