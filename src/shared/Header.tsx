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
import { setQstatus, setQueryS } from "../reducers/querySlice";
import { Button } from "@/components/ui/button";
import { setModal } from "../reducers/uiSlice";

const Header = () => {
  const disP = useDispatch();

  function debounce() {
    let timeout: any;

    return function (str: string, type: string) {
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        if (type === "search") disP(setQueryS(str));
        else disP(setQstatus(str));
      }, 500);
    };
  }

  const trigger = debounce();

  // add modal
  function hanOpenAdd() {
    disP(setModal([true, "add"]));
  }

  return (
    <header className="border-b-[2px] border-indigo-800">
      <div className="cont">
        <div className="flex items-center justify-between p-[10px_20px]">
          <div>
            <Input
              placeholder="Search"
              onChange={(e) =>
                trigger(e.target.value.trim().toLowerCase(), "search")
              }
            />
          </div>
          <div className="flex justify-between items-center gap-3">
            <Button onClick={hanOpenAdd}>Add</Button>
            <Select onValueChange={(e) => trigger(e, "status")}>
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
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
