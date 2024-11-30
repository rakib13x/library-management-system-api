"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_routes_1 = require("../modules/book/book.routes");
const borrow_route_1 = require("../modules/Borrow/borrow.route");
const member_routes_1 = require("../modules/member/member.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/books",
        route: book_routes_1.BookRoutes,
    },
    {
        path: "/members",
        route: member_routes_1.MemberRoutes,
    },
    {
        path: "/",
        route: borrow_route_1.BorrowRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
