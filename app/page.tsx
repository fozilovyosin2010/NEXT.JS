"use client";

import {
  delUsersData,
  getUserById,
  getUsersData,
  postUsersData,
  putUsersData,
} from "@/api/users.api";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";

import { MoreHorizontalIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
import { Idata } from "@/api/types.api";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const page = () => {
  const queryClient = new QueryClient();

  const zodSchema = z.object({
    id: z.string().optional(),
    name: z.string().nonempty("Name is required"),
    city: z.string().nonempty("City is required"),
    job: z.string().nonempty("Job is required"),
    age: z.number().min(18).max(60),
  });

  const { data, isFetching } = useQuery({
    queryKey: ["users"],
    queryFn: async () => await getUsersData(),
  });

  const { mutate: delMutation } = useMutation({
    mutationFn: async (id: string) => await delUsersData(id),
    onSuccess: () => {
      console.log("Success");

      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const { mutate: postMutation } = useMutation({
    mutationFn: async (obj: Idata) => await postUsersData(obj),
    onSuccess: () => {
      console.log("Success");

      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  function btnDel(id: string) {
    console.log(id);

    delMutation(id);
  }
  /// add

  const [openAdd, setOpenAdd] = useState(false);

  function openAddModal() {
    setOpenAdd(true);
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(zodSchema),
    defaultValues: {
      id: "",
      name: "",
      city: "",
      job: "",
      age: 0,
    },
  });

  function handleAddSubmit(e: any) {
    console.log(e);

    postMutation(e);

    setOpenAdd(false);

    reset();
  }

  ///// edit
  const [openEdit, setOpenEdit] = useState(false);

  const { mutate: putMutation } = useMutation({
    mutationFn: async (obj: Idata) => await putUsersData(obj),
    onSuccess: () => {
      console.log("Success");

      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  function openEditModal(e: Idata) {
    setOpenEdit(true);

    setValue("id", e.id);
    setValue("name", e.name);
    setValue("city", e.city);
    setValue("job", e.job);
    setValue("age", e.age);
  }

  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    reset: resetEdit,
    setValue,
    formState: { errors: errorsEdit },
  } = useForm({
    resolver: zodResolver(zodSchema),
  });

  function handleEditSubmit(e: any) {
    console.log(e);

    setOpenEdit(false);
    putMutation(e);
  }

  function btnEdit(e: Idata) {
    console.log(e);

    openEditModal(e);
  }

  ////check

  function btnCheck(e: Idata) {
    const obj = { ...e, status: !e.status };
    putMutation(obj);
  }

  ///info
  const [idx, setIdx] = useState<string | null>(null);

  const { data: dataI, isFetching: isFetchingI } = useQuery({
    queryKey: ["users", [idx]],
    queryFn: () => getUserById(idx as string),
  });

  function btnInfo(id: string) {
    console.log(id);

    setOpenInfo(true);
    setIdx(id);
  }

  const [openInfo, setOpenInfo] = useState(false);

  console.log(dataI);

  return (
    <div>
      <header className="border-b border-b-blue-500 pb-5">
        <input className="border" placeholder="Input" type="text" />
        <button onClick={openAddModal} className="border">
          Add
        </button>
      </header>
      <main className="mt-3 m-5">
        <Table className="">
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
                      className={`p-1 text-[#fff] rounded-md ${e.status ? "bg-blue-500" : "bg-red-500"}`}
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
                        <DropdownMenuItem onClick={() => btnEdit(e)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => btnCheck(e)}>
                          Checked
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => btnInfo(e.id as string)}
                        >
                          Info
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => btnDel(e.id as string)}
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
        {isFetching && <div>loading...</div>}
      </main>

      {/* add modal */}
      <Dialog open={openAdd} onOpenChange={(e) => setOpenAdd(e)}>
        <DialogContent className="sm:max-w-sm">
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
          <form onSubmit={handleSubmit(handleAddSubmit)}>
            <DialogHeader>
              <DialogTitle>Add profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-3">
              <Label>Name</Label>
              <Input {...register("name")} />
              <Label>City</Label>
              <Input {...register("city")} />
              <Label>Job</Label>
              <Input {...register("job")} />
              <Label>Age</Label>
              <Input
                type="number"
                {...register("age", { valueAsNumber: true })}
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
      {/* edit modal */}
      <Dialog open={openEdit} onOpenChange={(e) => setOpenEdit(e)}>
        <DialogContent className="sm:max-w-sm">
          {(errorsEdit.name && (
            <p className="text-red-500">{errorsEdit.name.message}</p>
          )) ||
            (errorsEdit.city && (
              <p className="text-red-500">{errorsEdit.city.message}</p>
            )) ||
            (errorsEdit.job && (
              <p className="text-red-500">{errorsEdit.job.message}</p>
            )) ||
            (errorsEdit.age && (
              <p className="text-red-500">{errorsEdit.age.message}</p>
            ))}
          <form onSubmit={handleSubmitEdit(handleEditSubmit)}>
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-3">
              <Label>Name</Label>
              <Input {...registerEdit("name")} />
              <Label>City</Label>
              <Input {...registerEdit("city")} />
              <Label>Job</Label>
              <Input {...registerEdit("job")} />
              <Label>Age</Label>
              <Input
                type="number"
                {...registerEdit("age", { valueAsNumber: true })}
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
      {/* info modal */}
      <Dialog open={openInfo} onOpenChange={(e) => setOpenInfo(e)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Info</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            <Table>
              <tbody>
                <TableRow>
                  <TableCell className="font-medium">{dataI?.name}</TableCell>
                  <TableCell>{dataI?.city}</TableCell>
                  <TableCell>{dataI?.job}</TableCell>
                  <TableCell>{dataI?.age}</TableCell>
                  <TableCell>
                    <span
                      className={`p-1 text-[#fff] rounded-md ${dataI?.status ? "bg-blue-500" : "bg-red-500"}`}
                    >
                      {dataI?.status ? "ACTIVE" : "INACTIVE"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right"></TableCell>
                </TableRow>
              </tbody>
            </Table>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default page;
