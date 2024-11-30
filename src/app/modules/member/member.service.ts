import httpStatus from "http-status";
import prisma from "../../../shared/prisma";
import ApiError from "../../errors/ApiError";

const createMemberIntoDb = async (payload: any) => {
  const { name, email, phone } = payload;

  const existingMember = await prisma.member.findUnique({
    where: { email },
  });

  if (existingMember) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Member with the same email already exists."
    );
  }

  const newMember = await prisma.member.create({
    data: {
      name,
      email,
      phone,
    },
  });

  return newMember;
};

const getAllMembersFromDb = async () => {
  const members = await prisma.member.findMany({
    orderBy: {
      membershipDate: "desc",
    },
  });

  return members;
};

const getMemberByIdFromDb = async (memberId: string) => {
  const member = await prisma.member.findUnique({
    where: { memberId },
  });

  if (!member) {
    throw new ApiError(httpStatus.NOT_FOUND, "Member not found");
  }

  return member;
};

const updateMemberIntoDb = async (
  memberId: string,
  updateData: Partial<any>
) => {
  const member = await prisma.member.findUnique({
    where: { memberId },
  });

  if (!member) {
    throw new ApiError(httpStatus.NOT_FOUND, "Member not found");
  }

  const updatedMember = await prisma.member.update({
    where: { memberId },
    data: updateData,
  });

  return updatedMember;
};

const deleteMemberFromDb = async (memberId: string) => {
  const member = await prisma.member.findUnique({
    where: { memberId },
  });

  if (!member) {
    throw new ApiError(httpStatus.NOT_FOUND, "Member not found");
  }

  await prisma.member.delete({
    where: { memberId },
  });
};

export const MemberService = {
  createMemberIntoDb,
  getAllMembersFromDb,
  getMemberByIdFromDb,
  updateMemberIntoDb,
  deleteMemberFromDb,
};
