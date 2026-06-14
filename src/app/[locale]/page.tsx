"use client";

import { useDelTodosMutation, useGetTodosQuery } from "@/src/api/todo.api";
import { useTranslations } from "next-intl";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

import { CircleX, MoreHorizontalIcon } from "lucide-react";
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

import { Idata } from "@/src/api/type.api";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store/store";

const isFetchBaseQueryError = (error: unknown): error is FetchBaseQueryError =>
  typeof error === "object" && error !== null && "status" in error;

const page = () => {
  const queries = useSelector((e: RootState) => e.slice);

  const t = useTranslations();

  const { data, isFetching, error } = useGetTodosQuery(queries, {
    pollingInterval: 300000,
  });

  const [delTodo] = useDelTodosMutation();

  const isNotafoundErr = isFetchBaseQueryError(error) && error.status === 404;

  if (isNotafoundErr) return <div>Not found!</div>;

  return (
    <div>
      <p>{t("head")}</p>

      <main className="overflow-x-auto m-2">
        <Table className="border">
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
            {isFetching ? (
              <SkeletonFallBack />
            ) : (
              !isNotafoundErr &&
              data?.map((e: Idata) => {
                return (
                  <TableRow key={e.id}>
                    <TableCell className="font-medium">{e.name}</TableCell>
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
                          <DropdownMenuItem>Duplicate</DropdownMenuItem>
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
    </div>
  );
};

export default page;
