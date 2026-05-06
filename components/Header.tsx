"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const Location = usePathname();
  console.log(Location);

  return (
    <header className="p-[10px_20px]">
      <div className="max-w-[1440px] mx-auto flex justify-between items-center gap-[30px]">
        <Link className="text-[#3730A3] text-[16px] font-[700]" href={"/"}>
          RecruitPro
        </Link>
        <nav className="flex gap-3">
          <Link
            className={`${Location == "/" ? "text-[#3730A3] text-[16px] font-[700] border-b-[#3730A3] border-b-2" : null}`}
            href={"/"}
          >
            Home
          </Link>
          <Link
            className={`${Location == "/jobs	" ? "text-[#3730A3] text-[16px] font-[700] border-b-[#3730A3] border-b-2" : null}`}
            href={"/jobs"}
          >
            Find Jobs
          </Link>
        </nav>
        <div className="flex gap-[10px]">
          <button className="text-[#3730A3] text-[16px] font-[700]">
            Sign In
          </button>
          <button className="text-[#fff] p-[10px_15px] rounded-[10px] text-[16px] font-[700] bg-[#3730A3]">
            Join Now
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
