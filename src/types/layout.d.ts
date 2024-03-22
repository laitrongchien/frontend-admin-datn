import React, {
  ReactElement,
  Dispatch,
  SetStateAction,
  HTMLAttributeAnchorTarget,
  ReactNode,
} from "react";

export type LayoutState = {
  staticMenuDesktopInactive: boolean;
  staticMenuMobileActive: boolean;
};

export interface LayoutContextProps {
  layoutState: LayoutState;
  setLayoutState: Dispatch<SetStateAction<LayoutState>>;
  onMenuToggle: () => void;
}
