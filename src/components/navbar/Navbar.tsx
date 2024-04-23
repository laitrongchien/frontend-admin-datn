"use client";

import { LuMenu } from "react-icons/lu";
import Link from "next/link";
import Image from "next/image";
import { LayoutContext } from "../layout/context/LayoutContext";
import { useContext } from "react";
import DropdownUser from "../dropdown/DropdownUser";

const Navbar = () => {
  const { onMenuToggle } = useContext(LayoutContext);
  return (
    <header className="sticky top-0 z-10 h-16 w-full bg-white border-b border-gray-300 flex-between px-10">
      <LuMenu size={28} className="cursor-pointer" onClick={onMenuToggle} />
      <Link href={"/"}>
        <Image
          src="/logo.jpg"
          alt="logo"
          width={259}
          height={194}
          className="h-[60px] object-cover w-[120px]"
        />
      </Link>
      <div>
        <DropdownUser />
      </div>
    </header>
  );
};

export default Navbar;
