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
router.get("/:memberId", MemberController.getMemberById);
router.patch(
  "/:memberId",
  validateRequest(MemberValidation.updateMember),
  MemberController.updateMember
);
router.delete("/:memberId", MemberController.deleteMember);

export const MemberRoutes = router;
