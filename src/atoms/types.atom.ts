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

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

export const postSchema = z.object({
  name: z.string().nonempty("Please input name-field"),
  des: z.string().nonempty("Please input description-field"),
  img: z
    .any()
    .transform((files) => files?.[0]) // Grab the first file from the FileList automatically
    .pipe(
      z
        .instanceof(File, { message: "Please select an image file" })
        .refine(
          (f) => ACCEPTED_TYPES.includes(f.type),
          "Unsupported image format.",
        ),
    ),
});
