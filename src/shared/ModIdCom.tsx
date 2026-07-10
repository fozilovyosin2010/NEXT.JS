"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { infoIdx, postById, postMod } from "../atoms/atom";
import { useAtom } from "jotai";

const ModIdCom = () => {
  const [addModal, setAddModal] = useAtom(postMod);
  const [, postImg] = useAtom(postById);

  const [idx] = useAtom(infoIdx);

  function hanAddSub(e: any) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Images", e.target["img"].files[0]);

    postImg(idx, formData);
    console.log(Object.fromEntries(formData));
    setAddModal(false);
    e.target.reset();
  }

  return (
    <Dialog open={addModal} onOpenChange={(e) => setAddModal(e)}>
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={hanAddSub}>
          <DialogHeader>
            <DialogTitle>Add Image</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <Label htmlFor="username-1">Image</Label>
          <Input type="file" accept="image/*" name="img" required />
          <DialogFooter className="py-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ModIdCom;
