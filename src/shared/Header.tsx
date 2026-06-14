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

import { useDispatch } from "react-redux";
import { setQueryS } from "../reducers/querySlice";

const Header = () => {
  const disP = useDispatch();

  function debounce() {
    let timeout: any;

    return function (str: string) {
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        console.log("search");
        disP(setQueryS(str));
      }, 500);
    };
  }

  const trigger = debounce();

  return (
    <header className="flex items-center justify-between p-[10px_20px]">
      <div>
        <Input
          placeholder="Search"
          onChange={(e) => trigger(e.target.value.trim().toLowerCase())}
        />
      </div>
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
    </header>
  );
};

export default Header;
