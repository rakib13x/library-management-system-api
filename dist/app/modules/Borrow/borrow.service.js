"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BorrowService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const borrowBook = (bookId, memberId) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield prisma_1.default.book.findUnique({ where: { bookId } });
    if (!book || book.availableCopies <= 0) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Book is not available for borrowing.");
    }
    const borrowRecord = yield prisma_1.default.borrowRecord.create({
        data: {
            bookId,
            memberId,
        },
    });
    yield prisma_1.default.book.update({
        where: { bookId },
        data: { availableCopies: { decrement: 1 } },
    });
    return borrowRecord;
});
const returnBook = (borrowId) => __awaiter(void 0, void 0, void 0, function* () {
    const borrowRecord = yield prisma_1.default.borrowRecord.findUnique({
        where: { borrowId },
    });
    if (!borrowRecord) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Borrow record not found.");
    }
    yield prisma_1.default.borrowRecord.update({
        where: { borrowId },
        data: { returnDate: new Date() },
    });
    yield prisma_1.default.book.update({
        where: { bookId: borrowRecord.bookId },
        data: { availableCopies: { increment: 1 } },
    });
});
const getOverdueBorrows = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentDate = new Date();
    const overdueBorrowRecords = yield prisma_1.default.borrowRecord.findMany({
        where: {
            returnDate: null,
            borrowDate: {
                lt: new Date(currentDate.setDate(currentDate.getDate() - 14)),
            },
        },
        include: {
            book: { select: { title: true } },
            member: { select: { name: true } },
        },
    });
    const overdueList = overdueBorrowRecords.map((record) => ({
        borrowId: record.borrowId,
        bookTitle: record.book.title,
        borrowerName: record.member.name,
        overdueDays: Math.floor((new Date().getTime() - record.borrowDate.getTime()) /
            (1000 * 60 * 60 * 24) -
            14),
    }));
    return overdueList;
});
exports.BorrowService = { borrowBook, returnBook, getOverdueBorrows };
