import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { MemberService } from "./member.service";

const createMember = catchAsync(async (req: Request, res: Response) => {
  const memberData = req.body;
  const newMember = await MemberService.createMemberIntoDb(memberData);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Member created successfully",
    data: newMember,
  });
});

const getAllMembers = catchAsync(async (req: Request, res: Response) => {
  const members = await MemberService.getAllMembersFromDb();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Members retrieved successfully",
    data: members,
  });
});

export const MemberController = {
  createMember,
  getAllMembers,
};
