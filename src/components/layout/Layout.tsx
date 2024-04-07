"use client";

import React, { useEffect, useRef } from "react";
import Navbar from "@/components/navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { useContext } from "react";
import { LayoutContext } from "./context/LayoutContext";
import classNames from "classnames";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { layoutState, setLayoutState } = useContext(LayoutContext);
  const sidebarRef = useRef<any>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setLayoutState((prevLayoutState) => ({
          ...prevLayoutState,
          staticMenuMobileActive: false,
        }));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setLayoutState]);

  const sidebarClasses = classNames("layout-sidebar", {
    "transform -translate-x-full !left-0":
      layoutState.staticMenuDesktopInactive,
    "layout-mobile-active": layoutState.staticMenuMobileActive,
  });

  const contentClasses = classNames("layout-content", {
    "!ml-0": layoutState.staticMenuDesktopInactive,
  });

  const overlayClasses = classNames("layout-overlay", {
    "!block transition-all duration-200": layoutState.staticMenuMobileActive,
  });

  return (
    <div>
      <Navbar />
      <div ref={sidebarRef} className={sidebarClasses}>
        <Sidebar />
      </div>
      <div className={contentClasses}>
        <div>{children}</div>
      </div>
      <div className={overlayClasses}></div>
    </div>
  );
};

export default Layout;
