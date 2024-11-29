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

export const BookService = {
  createBookIntoDb,
  getAllBooksFromDb,
};
