import { z } from "zod";

const createMember = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Name is required",
      })
      .min(1, "Name cannot be empty"),

    email: z
      .string({
        required_error: "Email is required",
      })
      .email("Invalid email format"),

    phone: z
      .string()
      .optional()
      .refine((phone) => !phone || (phone.length >= 10 && phone.length <= 15), {
        message:
          "Phone number must be between 10 and 15 characters if provided",
      }),
  }),
});

export const MemberValidation = {
  createMember,
};
