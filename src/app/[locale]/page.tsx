"use client";

import {
  useDelTodosMutation,
  useEditTodoMutation,
  useGetTodosQuery,
} from "@/src/api/todo.api";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

import { Idata, Schema } from "@/src/api/type.api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
import { setModal } from "@/src/reducers/uiSlice";

import { useTranslations } from "next-intl";

import { CircleCheck, CircleX, MoreHorizontalIcon } from "lucide-react";

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

const isFetchBaseQueryError = (error: unknown): error is FetchBaseQueryError =>
  typeof error === "object" && error !== null && "status" in error;

const page = () => {
  const queries = useSelector((e: RootState) => e.slice);

  const t = useTranslations();

  const { data, isFetching, error, isLoading } = useGetTodosQuery(queries, {
    pollingInterval: 300000,
  });

  const [delTodo] = useDelTodosMutation();
  const [editMutation] = useEditTodoMutation();

  const isNotafoundErr = isFetchBaseQueryError(error) && error.status === 404;

  function checkedData(e: Idata) {
    editMutation({ ...e, status: !e.status });
  }

  if (isNotafoundErr) return <div>Not found!</div>;

  // add modal

  const { openAdd } = useSelector((e: RootState) => e.uiSlice);
  const disP = useDispatch();

  function hanCloseAdd() {
    disP(setModal([false, "add"]));
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted },
  } = useForm({
    resolver: zodResolver(Schema),
  });

  function hanAddSubmit(e: any) {
    console.log(e);
  }
  const errMessage = Object.values(errors).map((e) => e.message);

  return (
    <div>
      <p>{t("head")}</p>

      <main className="overflow-x-auto m-2">
        <Table
          className={`border ${isFetching !== isLoading ? "loading" : null}`}
        >
          <TableHeader>
            <TableRow className="bg-[#4999fb]">
              <TableHead>Name</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Job</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* here */}
            {isLoading ? (
              <SkeletonFallBack />
            ) : (
              !isNotafoundErr &&
              data?.map((e: Idata) => {
                return (
                  <TableRow key={e.id}>
                    <TableCell>{e.name}</TableCell>
                    <TableCell className="font-medium">{e.city}</TableCell>
                    <TableCell className="font-medium">{e.age}</TableCell>
                    <TableCell className="font-medium">{e.job}</TableCell>
                    <TableCell className="font-medium">
                      <span
                        className={clsx(
                          e.status
                            ? "bg-blue-300 border border-blue-600 text-blue-600"
                            : "bg-red-300 border border-red-600 text-red-600",
                          "p-2 text-[8px] font-[600] rounded-[60px]",
                        )}
                      >
                        {e.status ? "ACTIVE" : "INACTIVE"}
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
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => checkedData(e)}
                            className="text-[#008a1c]"
                          >
                            <CircleCheck />
                            Checked
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => delTodo(e.id)}
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
            )}
          </TableBody>
        </Table>
      </main>
      {/* add modal */}

      <Dialog open={openAdd} onOpenChange={(e) => disP(setModal([e, "add"]))}>
        <DialogContent className="sm:max-w-sm">
          <div>
            <p className="text-rose-500">{errMessage[0]}</p>
          </div>
          <form onSubmit={handleSubmit(hanAddSubmit)}>
            <DialogHeader>
              <DialogTitle>Add modal</DialogTitle>
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
                    // name={e}
                    placeholder={`${e.at(0)?.toUpperCase() + e.slice(1)}...`}
                  />
                </div>
              ))}
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default page;
