import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { MemberController } from "./member.controller";
import { MemberValidation } from "./member.validations";

const router = express.Router();

router.post(
  "/",
  validateRequest(MemberValidation.createMember),
  MemberController.createMember
);
router.get("/", MemberController.getAllMembers);

export const MemberRoutes = router;
