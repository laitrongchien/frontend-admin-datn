import { FaFlagCheckered, FaMotorcycle } from "react-icons/fa";
import { LuHome } from "react-icons/lu";
import { MdOutlineSync, MdReceiptLong } from "react-icons/md";

export const sidebar_items = [
  {
    title: "Trang chủ",
    path: "/",
    icon: <LuHome />,
  },
  {
    title: "Quản lý tours",
    path: "/tours",
    icon: <FaFlagCheckered />,
  },
  {
    title: "Quản lý mẫu xe",
    path: "/motorbikes",
    icon: <FaMotorcycle size={18} />,
  },
  {
    title: "Quản lý đơn",
    icon: <MdReceiptLong size={18} />,
    path: "/bills",
    subMenu: true,
    subMenuItems: [
      { title: "Đơn đặt tour", path: "/bills/tour-booking" },
      { title: "Đơn thuê xe", path: "/bills/motor-rental" },
    ],
  },
  {
    title: "Quản lý tình trạng xe",
    path: "/motorbike-identifications",
    icon: <MdOutlineSync size={20} />,
  },
];
