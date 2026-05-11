import { z } from "zod";

const phoneRegex = /^\+?[0-9\s\-]+$/;

export const UserSchema = z.object({
  id: z.string().optional(),
  fullName: z.string().nonempty("Full name is required"),
  email: z.string().email("Invalid email"),
  // phone: z.coerce.number().transform((val) => val.toString()),
  phone: z.string().regex(phoneRegex, "Invalid phone number").min(9),
  image: z.string().url("It must start with http:// or https://"),
  company: z.object({
    name: z.string().nonempty("Company name is required"),
    department: z.string().nonempty("Department name is required"),
    title: z.string().nonempty("Title is required"),
  }),
  address: z.string().optional(),
});

export const UserListSchema = z.array(UserSchema);

export type User = z.infer<typeof UserSchema>;
