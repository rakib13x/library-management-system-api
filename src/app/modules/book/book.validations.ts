import { z } from "zod";

// Define the schema to validate incoming book creation data
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

export const BookValidation = {
  createBook,
};
