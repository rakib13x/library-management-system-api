"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BorrowValidation = void 0;
const zod_1 = require("zod");
const borrowBook = zod_1.z.object({
    body: zod_1.z.object({
        bookId: zod_1.z.string({ required_error: "Book ID is required" }),
        memberId: zod_1.z.string({ required_error: "Member ID is required" }),
    }),
});
const returnBook = zod_1.z.object({
    body: zod_1.z.object({
        borrowId: zod_1.z.string({ required_error: "Borrow ID is required" }),
    }),
});
exports.BorrowValidation = { borrowBook, returnBook };
