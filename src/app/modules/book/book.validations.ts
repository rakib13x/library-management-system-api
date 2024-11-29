import { z } from "zod";

const createBook = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title is required",
    }),
    genre: z.string({
      required_error: "Genre is required",
    }),
    publishedYear: z
      .number({
        required_error: "Published Year is required",
      })
      .min(1000, "Published Year must be a valid year"),
    totalCopies: z
      .number({
        required_error: "Total Copies is required",
      })
      .min(1, "Total Copies must be at least 1"),
    availableCopies: z
      .number({
        required_error: "Available Copies is required",
      })
      .min(0, "Available Copies cannot be negative"),
  }),
});

const updateBook = z.object({
  body: z.object({
    title: z.string().optional(),
    genre: z.string().optional(),
    publishedYear: z
      .number()
      .min(1000, "Published Year must be a valid year")
      .optional(),
    totalCopies: z
      .number()
      .min(1, "Total Copies must be at least 1")
      .optional(),
    availableCopies: z
      .number()
      .min(0, "Available Copies cannot be negative")
      .optional(),
  }),
});

export const BookValidation = {
  createBook,
  updateBook,
};
