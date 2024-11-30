"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BorrowRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const borrow_controller_1 = require("./borrow.controller");
const borrow_validations_1 = require("./borrow.validations");
const router = express_1.default.Router();
router.post("/borrow", (0, validateRequest_1.default)(borrow_validations_1.BorrowValidation.borrowBook), borrow_controller_1.BorrowController.borrowBook);
router.post("/return", (0, validateRequest_1.default)(borrow_validations_1.BorrowValidation.returnBook), borrow_controller_1.BorrowController.returnBook);
router.get("/borrow/overdue", borrow_controller_1.BorrowController.getOverdueBorrowList);
exports.BorrowRoutes = router;
