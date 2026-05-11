import { z } from "zod";

const dataSchema = z.object({
  id: z.string().optional(),
  fullName: z.string(),
  email: z.string().email(),
  phone: z.string(),
  image: z.string(),
  company: z.object({
    name: z.string(),
    department: z.string(),
    title: z.string(),
  }),
  address: z.string().optional(),
  role: z.string().optional(),
});
