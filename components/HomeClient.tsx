"use client";

import { Eye, MoreHorizontal, Pencil, Trash } from "lucide-react";
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
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import {
  usedelUserDataMutation,
  usegetUserDataQuery,
  usePostUserDataMutation,
  usePutUserDataMutation,
} from "@/api/users.api";

import { Idata } from "@/api/types.api";
import { SpinnerCom } from "@/components/Loader";

import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useState } from "react";
import { useRouter } from "next/navigation";

const formSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  city: Yup.string().required("City is required"),
  job: Yup.string().required("Job is required"),
  age: Yup.number().required("Age is required").positive().integer(),
});

interface HomeClientProps {
  initialData: Idata[];
}

export default function HomeClient({ initialData }: HomeClientProps) {
  const navigate = useRouter();
  const [inpSearch, setInpSearch] = useState("");

  // We use initialData to prevent the "loading flash" on first mount
  const { data, isFetching } = usegetUserDataQuery(inpSearch);
  
  // Use server data if client data hasn't arrived yet
  const users = data || initialData;

  const { mutate: postMutate } = usePostUserDataMutation();
  const { mutate: putMutate } = usePutUserDataMutation();
  const { mutate: delMutate } = usedelUserDataMutation();

  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<Idata | null>(null);

  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      name: "",
      city: "",
      job: "",
      age: 0,
    },
  });

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      delMutate(id);
    }
  };

  const onAddSubmit = (formData: any) => {
    postMutate({ ...formData, status: false });
    setAddModal(false);
  };

  const onEditSubmit = (formData: any) => {
    putMutate({ ...formData, id: currentUser?.id });
    setEditModal(false);
    reset();
  };

  const onStatusToggle = (user: Idata) => {
    putMutate({ ...user, status: !user.status });
  };

  const handleView = (id: string) => {
    navigate.push(`user/${id}`);
  };

  const handleEdit = (user: Idata) => {
    setCurrentUser(user);
    setValue("name", user.name);
    setValue("city", user.city);
    setValue("job", user.job);
    setValue("age", user.age);
    setEditModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              User Management
            </h1>
            <p className="text-muted-foreground text-sm">
              Manage your team members and their roles.
            </p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <Input
              onChange={(e) => setInpSearch(e.target.value)}
              type="text"
              className="max-w-xs bg-gray-50"
              placeholder="Search users..."
            />
            <Button
              onClick={() => {
                reset();
                setAddModal(true);
              }}
              className="shadow-sm"
            >
              Add User
            </Button>
          </div>
        </header>

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="w-[200px]">Name</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Job</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users?.map((e: Idata) => (
                <TableRow key={e.id}>
                  <TableCell className="font-medium">{e.name}</TableCell>
                  <TableCell>{e.city}</TableCell>
                  <TableCell>{e.job}</TableCell>
                  <TableCell>{e.age}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={e.status}
                        onCheckedChange={() => onStatusToggle(e)}
                      />
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded-full ${e.status ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}
                      >
                        {e.status ? "ACTIVE" : "INACTIVE"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-100">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[160px]">
                        <DropdownMenuItem onClick={() => handleView(e.id)}>
                          <Eye className="mr-2 h-4 w-4" /> View Info
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(e)}>
                          <Pencil className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDelete(e.id)} className="text-red-600">
                          <Trash className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {isFetching && (
            <div className="flex justify-center p-12">
              <SpinnerCom />
            </div>
          )}

          {!isFetching && users?.length === 0 && (
            <div className="text-center p-12 text-muted-foreground">
              No users found.
            </div>
          )}
        </div>
      </div>

      {/* Add Modal */}
      <Dialog open={addModal} onOpenChange={setAddModal}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit(onAddSubmit)}>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>Fill in the details to create a new user profile.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="add-name">Name</Label>
                <Input id="add-name" {...register("name")} placeholder="John Doe" />
                {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="add-city">City</Label>
                <Input id="add-city" {...register("city")} placeholder="New York" />
                {errors.city && <p className="text-xs text-red-500">{errors.city.message}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="add-job">Job</Label>
                <Input id="add-job" {...register("job")} placeholder="Developer" />
                {errors.job && <p className="text-xs text-red-500">{errors.job.message}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="add-age">Age</Label>
                <Input id="add-age" type="number" {...register("age")} placeholder="25" />
                {errors.age && <p className="text-xs text-red-500">{errors.age.message}</p>}
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setAddModal(false)}>Cancel</Button>
              <Button type="submit">Create User</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={editModal} onOpenChange={setEditModal}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit(onEditSubmit)}>
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
              <DialogDescription>Update the user profile information.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Name</Label>
                <Input id="edit-name" {...register("name")} />
                {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-city">City</Label>
                <Input id="edit-city" {...register("city")} />
                {errors.city && <p className="text-xs text-red-500">{errors.city.message}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-job">Job</Label>
                <Input id="edit-job" {...register("job")} />
                {errors.job && <p className="text-xs text-red-500">{errors.job.message}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-age">Age</Label>
                <Input id="edit-age" type="number" {...register("age")} />
                {errors.age && <p className="text-xs text-red-500">{errors.age.message}</p>}
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setEditModal(false)}>Cancel</Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
