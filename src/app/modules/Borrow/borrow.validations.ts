import { z } from "zod";

const borrowBook = z.object({
  body: z.object({
    bookId: z.string({ required_error: "Book ID is required" }),
    memberId: z.string({ required_error: "Member ID is required" }),
  }),
});

const returnBook = z.object({
  body: z.object({
    borrowId: z.string({ required_error: "Borrow ID is required" }),
  }),
});

export const BorrowValidation = { borrowBook, returnBook };
