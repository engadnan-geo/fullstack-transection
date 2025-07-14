import { z } from "zod";

export const createTransactionSchema = z.object({
  title: z.string().min(1, "Title is required"),
  amount: z.number({
    invalid_type_error: "Amount must be a number",
  }).positive("Amount must be greater than zero"),

  type: z.enum(["income", "expense"], {
    errorMap: () => ({ message: "Type must be either 'income' or 'expense'" }),
  }),

  category: z.string().min(1, "Category is required"),

  date: z.coerce.date({  // allows string like "2025-07-12" to be accepted as Date
    invalid_type_error: "Date must be valid",
  }),
});
