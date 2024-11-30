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

const getMemberById = catchAsync(async (req: Request, res: Response) => {
  const { memberId } = req.params;
  const member = await MemberService.getMemberByIdFromDb(memberId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Member retrieved successfully",
    data: member,
  });
});

const updateMember = catchAsync(async (req: Request, res: Response) => {
  const { memberId } = req.params;
  const updateData = req.body;
  const updatedMember = await MemberService.updateMemberIntoDb(
    memberId,
    updateData
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Member updated successfully",
    data: updatedMember,
  });
});

const deleteMember = catchAsync(async (req: Request, res: Response) => {
  const { memberId } = req.params;
  await MemberService.deleteMemberFromDb(memberId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Member successfully deleted",
  });
});

export const MemberController = {
  createMember,
  getAllMembers,
  getMemberById,
  updateMember,
  deleteMember,
};
