import { FaFlagCheckered, FaMotorcycle } from "react-icons/fa";
import { LuHome, LuWrench, LuBell } from "react-icons/lu";
import { MdOutlineSync, MdReceiptLong, MdLocationOn } from "react-icons/md";

export const sidebar_items = [
  {
    title: "Trang chủ",
    path: "/",
    icon: <LuHome />,
  },
  {
    title: "Quản lý tour xe máy",
    path: "/tours",
    icon: <FaFlagCheckered />,
  },
  {
    title: "Quản lý mẫu xe máy",
    path: "/motorbikes",
    icon: <FaMotorcycle size={18} />,
  },
  {
    title: "Quản lý địa điểm nhận xe",
    path: "/locations",
    icon: <MdLocationOn size={18} />,
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
    title: "Quản lý kho xe",
    path: "/motorbike-identifications",
    icon: <MdOutlineSync size={20} />,
  },
  {
    title: "Bảo dưỡng, sửa chữa xe",
    path: "/repairs",
    icon: <LuWrench size={20} />,
  },
  {
    title: "Tất cả thông báo",
    path: "/notifications",
    icon: <LuBell size={20} />,
  },
];
