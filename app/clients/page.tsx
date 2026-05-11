"use client";

import { MoreHorizontalIcon, Search, UserPlus } from "lucide-react";

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
import { useDelDataMutation, useGetUsersQuery } from "@/api/users.api";
import { useState } from "react";
import { SpinnerBadge } from "@/components/LoaderCom";

const ClientsPage = () => {
  const [inpSearch, setInpSearch] = useState("");

  const { data, isLoading } = useGetUsersQuery(inpSearch);
  const [delData] = useDelDataMutation();

  const handleSearch = (e: any) => {
    setInpSearch(e.target.value);
  };

  function hanDelBtn(id: string | any) {
    delData(id);
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
        <button className="p-[8px_15px] rounded-md bg-[#4F46E5] text-[#fff] flex gap-1 text-xs">
          <UserPlus size={14} />
          <span>Add Client</span>
        </button>
      </div>
      <main className="pt-4">
        <Table>
          <TableHeader>
            <TableRow>
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
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Duplicate</DropdownMenuItem>
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
