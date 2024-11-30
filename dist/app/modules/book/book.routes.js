"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const book_controller_1 = require("./book.controller");
const book_validations_1 = require("./book.validations");
const router = express_1.default.Router();
router.post("/", (0, validateRequest_1.default)(book_validations_1.BookValidation.createBook), book_controller_1.BookController.createBook);
router.get("/", book_controller_1.BookController.getAllBooks);
router.get("/:bookId", book_controller_1.BookController.getSingleBook);
router.patch("/:bookId", (0, validateRequest_1.default)(book_validations_1.BookValidation.updateBook), book_controller_1.BookController.updateBook);
router.delete("/:bookId", book_controller_1.BookController.deleteBook);
exports.BookRoutes = router;
