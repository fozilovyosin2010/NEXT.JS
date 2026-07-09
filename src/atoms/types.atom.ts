import z from "zod";

export interface Idata {
  id: number;
  isCompleted: boolean;
  images: Iimage[];
  name: string;
  description: string;
}

export interface Iimage {
  id: number;
  imageName: string;
}

// const ACCEPTED_TYPES = ["image/*"];

export const postSchema = z.object({
  name: z.string().nonempty("Please input name-field"),
  des: z.string().nonempty("Please input description-field"),
  img: z.any().refine(
    (files) => files.length > 0,
    //checking validation (if empty inp-file that means => files.length===0)
    {
      message: "Please select an image file",
    },
  ),
});
