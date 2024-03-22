"use client";

import React, { useState, createContext } from "react";
import { LayoutContextProps } from "@/types/layout";
export const LayoutContext = createContext({} as LayoutContextProps);

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [layoutState, setLayoutState] = useState({
    staticMenuDesktopInactive: false,
    staticMenuMobileActive: false,
  });

  const onMenuToggle = () => {
    if (isDesktop()) {
      setLayoutState((prevLayoutState) => ({
        ...prevLayoutState,
        staticMenuDesktopInactive: !prevLayoutState.staticMenuDesktopInactive,
      }));
    } else {
      setLayoutState((prevLayoutState) => ({
        ...prevLayoutState,
        staticMenuMobileActive: !prevLayoutState.staticMenuMobileActive,
      }));
    }
  };

  const isDesktop = () => {
    return window.innerWidth > 991;
  };

  const value: LayoutContextProps = {
    layoutState,
    setLayoutState,
    onMenuToggle,
  };

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
};

export default LayoutProvider;
