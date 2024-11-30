"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberValidation = void 0;
const zod_1 = require("zod");
const createMember = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            required_error: "Name is required",
        })
            .min(1, "Name cannot be empty"),
        email: zod_1.z
            .string({
            required_error: "Email is required",
        })
            .email("Invalid email format"),
        phone: zod_1.z
            .string()
            .optional()
            .refine((phone) => !phone || (phone.length >= 10 && phone.length <= 15), {
            message: "Phone number must be between 10 and 15 characters if provided",
        }),
    }),
});
const updateMember = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        email: zod_1.z.string().email("Invalid email format").optional(),
        phone: zod_1.z.string().optional(),
    }),
});
exports.MemberValidation = {
    createMember,
    updateMember,
};
