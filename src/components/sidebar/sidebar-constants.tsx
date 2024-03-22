import { FaMotorcycle } from "react-icons/fa";
import { LuHome } from "react-icons/lu";

export const sidebar_items = [
  {
    title: "Trang chủ",
    path: "/",
    icon: <LuHome />,
  },
  {
    title: "Xe",
    icon: <FaMotorcycle />,
    subMenu: true,
    subMenuItems: [
      { title: "fdfdfd", path: "/hghg" },
      { title: "fđ", path: "/hhg" },
    ],
  },
  {
    title: "Xe",
    icon: <FaMotorcycle />,
    subMenu: true,
    subMenuItems: [
      { title: "fdfdfd", path: "/hghg" },
      { title: "fđ", path: "/hhg" },
    ],
  },
];
