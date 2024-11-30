import prisma from "../../../shared/prisma";
import ApiError from "../../errors/ApiError";
import httpStatus from "http-status";

const borrowBook = async (bookId: string, memberId: string) => {
  const book = await prisma.book.findUnique({ where: { bookId } });

  if (!book || book.availableCopies <= 0) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Book is not available for borrowing."
    );
  }

  const borrowRecord = await prisma.borrowRecord.create({
    data: {
      bookId,
      memberId,
    },
  });

  await prisma.book.update({
    where: { bookId },
    data: { availableCopies: { decrement: 1 } },
  });

  return borrowRecord;
};

const returnBook = async (borrowId: string) => {
  const borrowRecord = await prisma.borrowRecord.findUnique({
    where: { borrowId },
  });

  if (!borrowRecord) {
    throw new ApiError(httpStatus.NOT_FOUND, "Borrow record not found.");
  }

  await prisma.borrowRecord.update({
    where: { borrowId },
    data: { returnDate: new Date() },
  });

  await prisma.book.update({
    where: { bookId: borrowRecord.bookId },
    data: { availableCopies: { increment: 1 } },
  });
};

export const BorrowService = { borrowBook, returnBook };
