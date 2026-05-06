import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div>
      <header className="flex justify-between p-[10px_20px]">
        <Link href={"/"}>Home</Link>
        <nav className="flex gap-3">
          <Link
            className="border border-dashed p-1 rounded-md border-blue-700"
            href={"/about"}
          >
            About
          </Link>
          <Link
            className="border border-dashed p-1 rounded-md border-blue-700"
            href={"/contact"}
          >
            Contact
          </Link>
        </nav>
      </header>
    </div>
  );
};

export default page;
