import httpStatus from "http-status";
import prisma from "../../../shared/prisma";
import ApiError from "../../errors/ApiError";

const createBook = async (payload: any) => {
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

export const BookService = {
  createBook,
};
