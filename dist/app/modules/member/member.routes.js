"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const member_controller_1 = require("./member.controller");
const member_validations_1 = require("./member.validations");
const router = express_1.default.Router();
router.post("/", (0, validateRequest_1.default)(member_validations_1.MemberValidation.createMember), member_controller_1.MemberController.createMember);
router.get("/", member_controller_1.MemberController.getAllMembers);
router.get("/:memberId", member_controller_1.MemberController.getMemberById);
router.patch("/:memberId", (0, validateRequest_1.default)(member_validations_1.MemberValidation.updateMember), member_controller_1.MemberController.updateMember);
router.delete("/:memberId", member_controller_1.MemberController.deleteMember);
exports.MemberRoutes = router;
