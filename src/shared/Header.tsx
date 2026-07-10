"use client";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { useRouter } from "../i18n/navigation";
import { useAtom } from "jotai";
import { inpS, openMod, status, trigger } from "../atoms/atom";

const Header = () => {
  const router = useRouter;

  const [mod, setMod] = useAtom(openMod);
  const [triggerVal, setTrigger] = useAtom(trigger);
  const [statusF, setStatusF] = useAtom(status);

  function hanOpenMod() {
    setMod(true);
  }

  // filter
  const [inpValue, setInpValue] = useAtom(inpS);

  function debounce() {
    let timer: any;
    return function (value: string) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        console.log(value);

        setInpValue(value);
        setTrigger(!triggerVal);
      }, 500);
    };
  }

  const debounce_trigger = debounce();
  return (
    <header className="border-b-[2px] border-indigo-800">
      <div className="cont">
        <div className="flex items-center justify-between p-[10px_20px]">
          <div>
            <Input
              placeholder="Search"
              // value={inpValue}
              onChange={(e) => {
                debounce_trigger(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-between items-center gap-3">
            <Button onClick={hanOpenMod}>Add</Button>
            <Select
              value={statusF}
              onValueChange={(e) => setStatusF(e)}
              defaultValue=""
            >
              <SelectTrigger className="w-full max-w-48">
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value=" ">All</SelectItem>
                  <SelectItem value="true">Complete</SelectItem>
                  <SelectItem value="false">Incomplete</SelectItem>
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
