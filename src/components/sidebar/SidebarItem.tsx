"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { BsChevronRight } from "react-icons/bs";

const SideBarMenuItem = ({ item }: { item: any }) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);

  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  return (
    <>
      {item.subMenu ? (
        <div className="min-w-[18px] mb-2">
          <button
            className={`w-full flex items-center min-h-[40px] text-black py-2 px-4 hover:bg-hoverItem hover:text-primary hover:border-r-2 border-primary transition duration-200 ${
              pathname.includes(item.path) &&
              "text-primary bg-hoverItem border-r-2 border-primary"
            }`}
            onClick={toggleSubMenu}
          >
            <div className="min-w-[20px]">{item.icon}</div>

            <span className="ml-3 text-base leading-6">{item.title}</span>
            <BsChevronRight
              className={`${
                subMenuOpen && "rotate-90"
              } ml-auto stroke-2 text-xs`}
            />
          </button>
          {subMenuOpen && (
            <div className="bg-white border-l-4">
              <div>
                {item.subMenuItems?.map((subItem: any, index: number) => (
                  <Link
                    key={index}
                    href={subItem.path}
                    className={`w-full block py-2 px-4 hover:text-primary transition duration-200 rounded-md ml-[27px] ${
                      pathname.includes(subItem.path)
                        ? "text-primary"
                        : "text-black"
                    }`}
                  >
                    <span>{subItem.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <Link
          href={item.path}
          className={`flex items-center min-h-[40px] text-black py-2 px-4 mb-2 hover:text-primary hover:bg-hoverItem hover:border-r-2 border-primary transition duration-200 ${
            (item.path === "/" && pathname === item.path) ||
            (item.path !== "/" && pathname.startsWith(item.path))
              ? "text-primary bg-hoverItem border-r-2 border-primary"
              : ""
          }`}
        >
          <div className="min-w-[20px]">{item.icon}</div>
          <span className="ml-3 leading-6">{item.title}</span>
        </Link>
      )}
    </>
  );
};

export default SideBarMenuItem;
