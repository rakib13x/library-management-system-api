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

export const MemberService = {
  createMemberIntoDb,
  getAllMembersFromDb,
};
