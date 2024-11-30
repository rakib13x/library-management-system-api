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
exports.BookService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const createBookIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, genre, publishedYear, totalCopies, availableCopies } = payload;
    const existingBook = yield prisma_1.default.book.findFirst({
        where: { title },
    });
    if (existingBook) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Book with the same title already exists.");
    }
    const newBook = yield prisma_1.default.book.create({
        data: {
            title,
            genre,
            publishedYear,
            totalCopies,
            availableCopies,
        },
    });
    return newBook;
});
const getAllBooksFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield prisma_1.default.book.findMany({
        orderBy: {
            publishedYear: "desc",
        },
    });
    return books;
});
const getSingleBookFromDb = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield prisma_1.default.book.findUnique({
        where: { bookId },
    });
    if (!book) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Book not found");
    }
    return book;
});
const updateBookIntoDb = (bookId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const existingBook = yield prisma_1.default.book.findUnique({
        where: { bookId },
    });
    if (!existingBook) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Book not found");
    }
    const updatedBook = yield prisma_1.default.book.update({
        where: { bookId },
        data: updateData,
    });
    return updatedBook;
});
const deleteBookIntoDb = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const existingBook = yield prisma_1.default.book.findUnique({
        where: { bookId },
    });
    if (!existingBook) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Book not found");
    }
    yield prisma_1.default.book.delete({
        where: { bookId },
    });
    return { message: "Book deleted successfully" };
});
exports.BookService = {
    createBookIntoDb,
    getAllBooksFromDb,
    getSingleBookFromDb,
    updateBookIntoDb,
    deleteBookIntoDb,
};
