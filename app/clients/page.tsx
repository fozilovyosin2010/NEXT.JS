"use client";

import { Info, MoreHorizontalIcon, Search, UserPlus } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useAddDataMutation,
  useDelDataMutation,
  useEditDataMutation,
  useGetUsersQuery,
} from "@/api/users.api";

import { useState } from "react";

import { SpinnerBadge } from "@/components/LoaderCom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, UserSchema } from "@/api/types.api";
import { useRouter } from "next/navigation";

const ClientsPage = () => {
  const navigate = useRouter();

  const [inpSearch, setInpSearch] = useState("");

  const { data, isLoading } = useGetUsersQuery(inpSearch);
  const [delData] = useDelDataMutation();
  const [addData] = useAddDataMutation();
  const [editData] = useEditDataMutation();

  const handleSearch = (e: any) => {
    setInpSearch(e.target.value);
  };

  function hanDelBtn(id: string | any) {
    delData(id);
  }

  const {
    register,
    handleSubmit: handleSubmitAdd,
    reset,
    setValue,
    formState: { errors: erorsFormAdd },
  } = useForm({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      image: "https://",
      company: {
        name: "",
        department: "",
        title: "",
      },
      address: "",
    },
  });
  /////add modal
  const [openAddModal, setOpenAddModal] = useState(false);

  function hanCloseAddModal() {
    setOpenAddModal(false);

    reset();
  }

  function hanAddSubmit(e: any) {
    addData(e);

    hanCloseAddModal();
  }

  ///////edit  modal

  const [openEditModal, setOpenEditModal] = useState(false);
  function hanCloseEditModal() {
    setOpenEditModal(false);

    reset();
  }

  function hanEditSubmit(e: any) {
    // addData(e);

    editData(e);

    hanCloseEditModal();
  }

  function hanEditBtn(user: User) {
    setOpenEditModal(true);
    // console.log(user);
    const { id, ...obj } = user;

    (setValue("id", id), setValue("fullName", obj.fullName));
    setValue("email", obj.email);
    setValue("phone", obj.phone);
    setValue("image", obj.image);
    setValue("company.name", obj.company.name);
    setValue("company.department", obj.company.department);
    setValue("company.title", obj.company.title);
    setValue("address", obj.address);
  }

  ////info
  function hanInfoBtn(id: string | any) {
    navigate.push(`/clients/${id}`);
  }

  return (
    <div className="p-5">
      <div className="flex justify-between items-center">
        <div className="border flex items-center p-2 rounded-md gap-2">
          <Search />
          <input
            value={inpSearch}
            onChange={handleSearch}
            type="text"
            placeholder="Search"
            className="outline-none"
          />
        </div>
        <button
          onClick={() => setOpenAddModal(true)}
          className="p-[8px_15px] rounded-md bg-[#4F46E5] text-[#fff] flex gap-1 text-xs"
        >
          <UserPlus size={14} />
          <span>Add Client</span>
        </button>
      </div>
      <main className="pt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Avatar</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Company</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <img
                    src={user.image}
                    alt={"404"}
                    className="w-[30px] h-[30px] rounded-full"
                  />
                </TableCell>
                <TableCell className="font-medium">{user.fullName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.company.name}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="size-8">
                        <MoreHorizontalIcon />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => hanEditBtn(user)}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => hanInfoBtn(user?.id)}
                        className="flex items-center"
                      >
                        <Info />
                        <span>Info</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => hanDelBtn(user?.id)}
                        variant="destructive"
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* add modal */}
        <Dialog open={openAddModal} onOpenChange={hanCloseAddModal}>
          <DialogContent className="sm:max-w-sm">
            <form onSubmit={handleSubmitAdd(hanAddSubmit)}>
              {/* errors */}
              <p className="text-red-600 text-center">
                {erorsFormAdd.fullName?.message ||
                  erorsFormAdd.email?.message ||
                  erorsFormAdd.phone?.message ||
                  erorsFormAdd.image?.message ||
                  erorsFormAdd.company?.name?.message ||
                  erorsFormAdd.company?.department?.message ||
                  erorsFormAdd.company?.title?.message}
              </p>

              <DialogHeader>
                <DialogTitle>Add User</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you&apos;re
                  done.
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-2 gap-[10px] max-md:grid-cols-1 py-2">
                <label>
                  Full Name
                  <input
                    className="border p-[10px_15px] w-full"
                    type="text"
                    placeholder="Full Name"
                    {...register("fullName")}
                  />
                </label>
                <label>
                  Email
                  <input
                    className="border p-[10px_15px] w-full"
                    type="email"
                    placeholder="Email"
                    {...register("email")}
                  />
                </label>
                <label>
                  Phone
                  <input
                    className="border p-[10px_15px] w-full"
                    type="text"
                    placeholder="Phone"
                    {...register("phone")}
                  />
                </label>
                <label>
                  Image
                  <input
                    className="border p-[10px_15px] w-full"
                    type="text"
                    placeholder="image"
                    {...register("image")}
                  />
                </label>
                <label>
                  Company:
                  <input
                    className="border p-[10px_15px] w-full"
                    type="text"
                    placeholder="Company"
                    {...register("company.name")}
                  />
                </label>
                <label>
                  Department:
                  <input
                    className="border p-[10px_15px] w-full"
                    type="text"
                    placeholder="Department"
                    {...register("company.department")}
                  />
                </label>
                <label>
                  Title:
                  <input
                    className="border p-[10px_15px] w-full"
                    type="text"
                    placeholder="Title"
                    {...register("company.title")}
                  />
                </label>
                <label>
                  Address:
                  <input
                    className="border p-[10px_15px] w-full"
                    type="text"
                    placeholder="Address"
                    {...register("address")}
                  />
                </label>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  onClick={hanCloseAddModal}
                  variant="outline"
                >
                  Cancel
                </Button>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* edit modal */}
        <Dialog open={openEditModal} onOpenChange={hanCloseEditModal}>
          <DialogContent className="sm:max-w-sm">
            <form onSubmit={handleSubmitAdd(hanEditSubmit)}>
              {/* errors */}
              <p className="text-red-600 text-center">
                {erorsFormAdd.fullName?.message ||
                  erorsFormAdd.email?.message ||
                  erorsFormAdd.phone?.message ||
                  erorsFormAdd.image?.message ||
                  erorsFormAdd.company?.name?.message ||
                  erorsFormAdd.company?.department?.message ||
                  erorsFormAdd.company?.title?.message}
              </p>

              <DialogHeader>
                <DialogTitle>Edit User</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you&apos;re
                  done.
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-2 gap-[10px] max-md:grid-cols-1 py-2">
                <label>
                  Full Name
                  <input
                    className="border p-[10px_15px] w-full"
                    type="text"
                    placeholder="Full Name"
                    {...register("fullName")}
                  />
                </label>
                <label>
                  Email
                  <input
                    className="border p-[10px_15px] w-full"
                    type="email"
                    placeholder="Email"
                    {...register("email")}
                  />
                </label>
                <label>
                  Phone
                  <input
                    className="border p-[10px_15px] w-full"
                    type="text"
                    placeholder="Phone"
                    {...register("phone")}
                  />
                </label>
                <label>
                  Image
                  <input
                    className="border p-[10px_15px] w-full"
                    type="text"
                    placeholder="image"
                    {...register("image")}
                  />
                </label>
                <label>
                  Company:
                  <input
                    className="border p-[10px_15px] w-full"
                    type="text"
                    placeholder="Company"
                    {...register("company.name")}
                  />
                </label>
                <label>
                  Department:
                  <input
                    className="border p-[10px_15px] w-full"
                    type="text"
                    placeholder="Department"
                    {...register("company.department")}
                  />
                </label>
                <label>
                  Title:
                  <input
                    className="border p-[10px_15px] w-full"
                    type="text"
                    placeholder="Title"
                    {...register("company.title")}
                  />
                </label>
                <label>
                  Address:
                  <input
                    className="border p-[10px_15px] w-full"
                    type="text"
                    placeholder="Address"
                    {...register("address")}
                  />
                </label>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  onClick={hanCloseAddModal}
                  variant="outline"
                >
                  Cancel
                </Button>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {isLoading && (
          <div className="flex justify-center p-12">
            <SpinnerBadge />
          </div>
        )}

        {!isLoading && data?.length === 0 && (
          <div className="text-center p-12 text-muted-foreground">
            No users found.
          </div>
        )}
      </main>
    </div>
  );
};

export default ClientsPage;
