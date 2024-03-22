"use client";

import React from "react";
import Navbar from "@/components/navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { useContext } from "react";
import { LayoutContext } from "./context/LayoutContext";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { layoutState, setLayoutState } = useContext(LayoutContext);
  return (
    <div>
      <Navbar />
      <div
        className={`w-[270px] h-[100vh] fixed mt-4 transition-transform transition-left duration-200 px-2 py-4 rounded-xl shadow-md bg-white ${
          layoutState.staticMenuDesktopInactive
            ? "transform -translate-x-full left-0"
            : "left-6"
        }`}
      >
        <Sidebar />
      </div>
      <div
        className={`min-h-[calc(100vh-80px)] mt-4 px-6 transition-margin duration-200 ${
          layoutState.staticMenuDesktopInactive ? "ml-0" : "ml-[300px]"
        }`}
      >
        <div className="bg-green-200">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
