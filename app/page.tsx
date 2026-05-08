"use client";

import { MoreHorizontalIcon } from "lucide-react";
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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  useAddUserMutation,
  useDelUserMutation,
  useGetUsersQuery,
} from "@/api/users.api";
import { Idata } from "@/api/types.api";
import { SpinnerCom } from "@/components/Loader";

import { useForm } from "react-hook-form";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

const page = () => {
  const { data, error, isLoading } = useGetUsersQuery("");
  const [delData] = useDelUserMutation();
  const [addUser] = useAddUserMutation();

  const formSchema = Yup.object({
    name: Yup.string().required(),
    city: Yup.string().required(),
    job: Yup.string().required(),
    age: Yup.number().required(),
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formSchema) });

  function hanDelBtn(id: string) {
    delData(id);
    // console.log(id);
  }

  function addSubmit(event: any) {
    addUser(event);
  }

  const [addModal, setAddModal] = useState(false);
  return (
    <div>
      <header className="flex justify-between gap-[30px] p-[10px_20px]">
        <input
          type="text"
          className="border rounded-[10px] border-[#ccc]"
          placeholder="search"
        />
        <Button onClick={() => setAddModal(true)}>Add</Button>
      </header>
      <div className="p-[10px_20px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Job</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((e: Idata) => {
              return (
                <TableRow key={e.id}>
                  <TableCell className="font-medium">{e.name}</TableCell>
                  <TableCell>{e.city}</TableCell>
                  <TableCell>{e.job}</TableCell>
                  <TableCell>{e.age}</TableCell>
                  <TableCell>
                    <span
                      className={`p-2 text-[#fff] rounded-[5px] ${e.status ? "bg-blue-600" : "bg-red-600"}`}
                    >
                      {e.status ? "ACTIVE" : "INACTIVE"}
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
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => hanDelBtn(e.id)}
                          variant="destructive"
                        >
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
        {isLoading ? <SpinnerCom /> : null}
      </div>

      {/* here modal schema*/}
      <Dialog open={addModal} onOpenChange={(e) => setAddModal(e)}>
        <DialogContent className="sm:max-w-sm">
          <div className="max-w-[300px]">
            {(errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )) ||
              (errors.city && (
                <p className="text-red-500">{errors.city.message}</p>
              )) ||
              (errors.job && (
                <p className="text-red-500">{errors.job.message}</p>
              )) ||
              (errors.age && (
                <p className="text-red-500">{errors.age.message}</p>
              ))}
          </div>
          <form onSubmit={handleSubmit(addSubmit)}>
            <DialogHeader>
              <DialogTitle>Add a user</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-3 pb-3">
              <input
                className="border p-[10px_15px]"
                {...register("name")}
                type="text"
              />
              <input
                className="border p-[10px_15px]"
                {...register("city")}
                type="text"
              />
              <input
                className="border p-[10px_15px]"
                {...register("job")}
                type="text"
              />
              <input
                className="border p-[10px_15px]"
                {...register("age")}
                type="number"
              />
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
