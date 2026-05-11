import { z } from "zod";

const phoneRegex = /^\+?[0-9\s\-]+$/;

const UserSchema = z.object({
  id: z.string().optional(),
  fullName: z.string(),
  email: z.string().email(),
  phone: z.string().regex(phoneRegex, "Invalid phone number format"),
  image: z.string().url(),
  company: z.object({
    name: z.string(),
    department: z.string(),
    title: z.string(),
  }),
  address: z.string().optional(),
});

export const UserListSchema = z.array(UserSchema);

export type User = z.infer<typeof UserSchema>;
