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
import { Idata } from "@/src/atoms/types.atom";
import { useAtom } from "jotai";
import { checkTodo, delTodo, getTodos, trigger } from "@/src/atoms/atom";

const page = () => {
  const t = useTranslations();

  function hanOpenEdit(elem: any) {
    // setIsEditMod(true);
    // const arr = Object.entries(elem);
    // arr.forEach((e) => setValue(e[0] as keyof Idata, e[1]));
    // disP(setModal(true));
  }

  const data = [
    {
      id: 1227,
      isCompleted: false,
      images: [],
      name: "fdsfsd",
      description: "sfdsdf",
    },
    {
      id: 1228,
      isCompleted: false,
      images: [],
      name: "dsf",
      description: "sdf",
    },
    {
      id: 1233,
      isCompleted: false,
      images: [],
      name: "пмпр",
      description: "псапсап",
    },
    {
      id: 1240,
      isCompleted: false,
      images: [
        {
          id: 1666,
          imageName: "44b6275e-7757-4bc2-bbc2-c690a6af4c4d.png",
        },
      ],
      name: "hj",
      description: "j",
    },
    {
      id: 1241,
      isCompleted: false,
      images: [
        {
          id: 1667,
          imageName: "3c3a6d0b-9fb2-45fb-a9e5-b81989594c08.png",
        },
      ],
      name: "df",
      description: "Online Omuz",
    },
  ];

  const [todos] = useAtom(getTodos);

  const [, delData] = useAtom(delTodo);
  const [, checkData] = useAtom(checkTodo);

  function checkedData(e: number) {
    checkData(e);
  }

  console.log(todos);

  return (
    <div>
      <p>{t("head")}</p>

      <main className="overflow-x-auto m-2">
        <Table
          className={`border ${todos.state == "loading" ? "loading" : null}`}
        >
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
            {/* here */}
            {todos?.data?.map((e: Idata) => {
              return (
                <TableRow key={e.id}>
                  <TableCell>{e.name}</TableCell>
                  <TableCell className="font-medium">{e.description}</TableCell>
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
                        <Button variant="ghost" size="icon" className="size-8">
                          <MoreHorizontalIcon />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => hanOpenEdit(e)}
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
            })}
          </TableBody>
        </Table>
      </main>
      {/* add modal */}

      {/* <Dialog open={openAdd} onOpenChange={(e) => disP(setModal(e))}>
        <DialogContent className="sm:max-w-sm">
          <div>
            <p className="text-rose-500">{errMessage[0]}</p>
          </div>
          <form onSubmit={handleSubmit(hanAddSubmit)}>
            <DialogHeader>
              <DialogTitle>{isEditMod ? "Edit" : "Add"} modal</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <div className="my-2 flex flex-col gap-4">
              {["name", "city", "job", "age"].map((e) => (
                <div key={e} className="space-y-3">
                  <Label>{e.at(0)?.toUpperCase() + e.slice(1)}</Label>
                  <Input
                    {...register(e as any, { valueAsNumber: e === "age" })}
                    placeholder={`${e.at(0)?.toUpperCase() + e.slice(1)}...`}
                  />
                </div>
              ))}
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">{isEditMod ? "Edit" : "Add"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog> */}
    </div>
  );
};

export default page;
