"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const createMemberIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, phone } = payload;
    const existingMember = yield prisma_1.default.member.findUnique({
        where: { email },
    });
    if (existingMember) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Member with the same email already exists.");
    }
    const newMember = yield prisma_1.default.member.create({
        data: {
            name,
            email,
            phone,
        },
    });
    return newMember;
});
const getAllMembersFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const members = yield prisma_1.default.member.findMany({
        orderBy: {
            membershipDate: "desc",
        },
    });
    return members;
});
const getMemberByIdFromDb = (memberId) => __awaiter(void 0, void 0, void 0, function* () {
    const member = yield prisma_1.default.member.findUnique({
        where: { memberId },
    });
    if (!member) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Member not found");
    }
    return member;
});
const updateMemberIntoDb = (memberId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const member = yield prisma_1.default.member.findUnique({
        where: { memberId },
    });
    if (!member) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Member not found");
    }
    const updatedMember = yield prisma_1.default.member.update({
        where: { memberId },
        data: updateData,
    });
    return updatedMember;
});
const deleteMemberFromDb = (memberId) => __awaiter(void 0, void 0, void 0, function* () {
    const member = yield prisma_1.default.member.findUnique({
        where: { memberId },
    });
    if (!member) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Member not found");
    }
    yield prisma_1.default.member.delete({
        where: { memberId },
    });
});
exports.MemberService = {
    createMemberIntoDb,
    getAllMembersFromDb,
    getMemberByIdFromDb,
    updateMemberIntoDb,
    deleteMemberFromDb,
};
