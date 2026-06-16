import z, { string } from "zod";

export interface Idata {
  id: string;
  name: string;
  city: string;
  job: string;
  age: number;
  status: boolean;
}

export const Schema = z.object({
  id: z.string().optional(),
  name: z.string().nonempty('Pls, fill the "name" input'),
  city: z.string().nonempty('Pls, fill the "city" input'),
  job: z.string().nonempty('Pls, fill the "job" input'),
  age: z
    .number("pls, add correct number!")
    .min(18, "Your age must be more than 18")
    .max(60, "Your age must be less than 60"),
  status: z.boolean().optional(),
});
