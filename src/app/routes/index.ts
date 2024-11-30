import express from "express";
import { BookRoutes } from "../modules/book/book.routes";
import { BorrowRoutes } from "../modules/Borrow/borrow.route";
import { MemberRoutes } from "../modules/member/member.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/books",
    route: BookRoutes,
  },
  {
    path: "/members",
    route: MemberRoutes,
  },
  {
    path: "/",
    route: BorrowRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
