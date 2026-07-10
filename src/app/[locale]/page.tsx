"use client";

import { useTranslations } from "next-intl";

import {
  CircleCheck,
  CircleX,
  MoreHorizontalIcon,
  SquarePen,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SkeletonFallBack } from "@/src/shared/Skeleton";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import clsx from "clsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Idata, postSchema, putSchema } from "@/src/atoms/types.atom";
import { useAtom } from "jotai";
import {
  checkTodo,
  delTodo,
  getTodos,
  openMod,
  postTodo,
  putTodo,
  status,
} from "@/src/atoms/atom";

const page = () => {
  const t = useTranslations();

  const [todos] = useAtom(getTodos);

  const [, delData] = useAtom(delTodo);
  const [, checkData] = useAtom(checkTodo);
  const [, postData] = useAtom(postTodo);
  const [, putData] = useAtom(putTodo);

  const [mod, setMod] = useAtom(openMod);
  const [isEditMod, setIsEditMod] = useState(false);

  function checkedData(e: number) {
    checkData(e);
  }

  // modal

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValues,
  } = useForm({
    // here
    resolver: zodResolver(isEditMod ? putSchema : postSchema),
  });

  function hanModSubmit(e: any) {
    if (isEditMod) {
      const obj = { ...e, id: editIdx };
      console.log(obj);

      putData(obj);
    } else {
      const formData = new FormData();
      formData.append("Name", e.name);
      formData.append("Description", e.description);

      if (e.img) {
        formData.append("Images", e.img?.[0]);
      }

      postData(formData);
    }
    closeMod();
  }

  function closeMod() {
    setMod(false);
    setIsEditMod(false);
    setEditIdx(null);
    reset();
  }

  const errMess = Object.values(errors)[0]?.message;

  const [editIdx, setEditIdx] = useState<null | number>(null);

  function hanOpenModEdit(e: Idata) {
    setValues(e);
    setEditIdx(e.id);

    setIsEditMod(true);
    setMod(true);
  }

  // fitler
  const [statusF, setStatusF] = useAtom(status);

  return (
    <div>
      <p>{t("head")}</p>

      <main className="overflow-x-auto m-2">
        <Table className="border">
          <TableHeader>
            <TableRow className="bg-[#4999fb] hover:bg-[#2586fd]">
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.isArray(todos) ? (
              todos
                ?.filter((e) =>
                  statusF === "true"
                    ? e.isCompleted
                    : statusF === "false"
                      ? !e.isCompleted
                      : e,
                )
                .map((e: Idata) => {
                  return (
                    <TableRow key={e.id}>
                      <TableCell>{e.name}</TableCell>
                      <TableCell className="font-medium">
                        {e.description}
                      </TableCell>
                      <TableCell className="font-medium">
                        <img
                          className="w-[150px] h-[100px]"
                          src={`${process.env.NEXT_PUBLIC_API_URL}/images/${e?.images[0]?.imageName}`}
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        <span
                          className={clsx(
                            e.isCompleted
                              ? "bg-blue-300 border border-blue-600 text-blue-600"
                              : "bg-red-300 border border-red-600 text-red-600",
                            "p-2 text-[8px] font-[600] rounded-[60px]",
                          )}
                        >
                          {e.isCompleted ? "ACTIVE" : "INACTIVE"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-8"
                            >
                              <MoreHorizontalIcon />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => hanOpenModEdit(e)}
                              className="text-[#0062ff] font-medium"
                            >
                              <SquarePen size={20} />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => checkedData(e.id)}
                              className="text-[#008a1c]"
                            >
                              <CircleCheck />
                              Checked
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => delData(e.id)}
                              variant="destructive"
                            >
                              <CircleX color="#ff0000" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })
            ) : (
              <SkeletonFallBack />
            )}
          </TableBody>
        </Table>
      </main>
      {/* add/edit modal */}

      <Dialog
        open={mod}
        onOpenChange={(e) => {
          setMod(e);
          reset();
        }}
      >
        <DialogContent className="sm:max-w-sm">
          <div>
            <p className="text-rose-500">{errMess as string}</p>
          </div>
          <form onSubmit={handleSubmit(hanModSubmit)}>
            <DialogHeader>
              <DialogTitle>{isEditMod ? "Edit" : "Add"} modal</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <div className="my-2 flex flex-col gap-4">
              {["name", "description"].map((e) => (
                <div key={e} className="space-y-3">
                  <Label>{e.at(0)?.toUpperCase() + e.slice(1)}</Label>
                  <Input
                    {...register(e as any)}
                    placeholder={`${e.at(0)?.toUpperCase() + e.slice(1)}...`}
                  />
                </div>
              ))}
              {!isEditMod && (
                <div className="space-y-3">
                  <Label>Image</Label>
                  <Input
                    {...register("img" as any)}
                    type="file"
                    accept="image/*"
                    placeholder={`Image`}
                  />
                </div>
              )}
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">{isEditMod ? "Edit" : "Add"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default page;
