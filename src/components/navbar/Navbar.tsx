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
    <header className="sticky top-0 z-10 h-16 w-full bg-white border-b border-gray-200 flex-between px-10">
      <LuMenu size={28} className="cursor-pointer" onClick={onMenuToggle} />
      {/* <Link href={"/"}>
        <Image
          src="/logo.png"
          alt="logo"
          width={237}
          height={27}
          className="w-[237px] h-[27px]"
        />
      </Link> */}
      <div>
        <DropdownUser />
      </div>
    </header>
  );
};

export default Navbar;
