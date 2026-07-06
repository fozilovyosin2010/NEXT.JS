"use client";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { useRouter } from "../i18n/navigation";

const Header = () => {
  const router = useRouter;

  return (
    <header className="border-b-[2px] border-indigo-800">
      <div className="cont">
        <div className="flex items-center justify-between p-[10px_20px]">
          <div>
            <Input placeholder="Search" />
          </div>
          <div className="flex justify-between items-center gap-3">
            <Button>Add</Button>
            <Select>
              <SelectTrigger className="w-full max-w-48">
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  <SelectItem value=" ">All</SelectItem>
                  <SelectItem value="false">Inactive</SelectItem>
                  <SelectItem value="true">Active</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full max-w-48">
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="true"></SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
