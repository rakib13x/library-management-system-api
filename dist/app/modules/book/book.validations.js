"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookValidation = void 0;
const zod_1 = require("zod");
const createBook = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: "Title is required",
        }),
        genre: zod_1.z.string({
            required_error: "Genre is required",
        }),
        publishedYear: zod_1.z
            .number({
            required_error: "Published Year is required",
        })
            .min(1000, "Published Year must be a valid year"),
        totalCopies: zod_1.z
            .number({
            required_error: "Total Copies is required",
        })
            .min(1, "Total Copies must be at least 1"),
        availableCopies: zod_1.z
            .number({
            required_error: "Available Copies is required",
        })
            .min(0, "Available Copies cannot be negative"),
    }),
});
const updateBook = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        genre: zod_1.z.string().optional(),
        publishedYear: zod_1.z
            .number()
            .min(1000, "Published Year must be a valid year")
            .optional(),
        totalCopies: zod_1.z
            .number()
            .min(1, "Total Copies must be at least 1")
            .optional(),
        availableCopies: zod_1.z
            .number()
            .min(0, "Available Copies cannot be negative")
            .optional(),
    }),
});
exports.BookValidation = {
    createBook,
    updateBook,
};
