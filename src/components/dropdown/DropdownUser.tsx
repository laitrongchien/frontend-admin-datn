import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { MdKeyboardArrowDown } from "react-icons/md";
import { LuLogOut, LuUser } from "react-icons/lu";
import { logout } from "@/store/features/authSlice";
import Dropdown from "./Dropdown";
import { resetTourState } from "@/store/features/tourSlice";
import { resetMotorbikeState } from "@/store/features/motorbikeSlice";
import { resetMotorIdentificationState } from "@/store/features/motorIdentificationSlice";
import { resetRepairState } from "@/store/features/repairSlice";

const DropdownUser = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    router.push("/");
    dispatch(logout());
    dispatch(resetTourState());
    dispatch(resetMotorbikeState());
    dispatch(resetMotorIdentificationState());
    dispatch(resetRepairState());
  };

  return (
    <Dropdown
      trigger={
        <div className="flex items-center gap-2">
          {user && (
            <Image
              src={user?.avatar}
              alt="Avatar"
              width={42}
              height={42}
              className="w-[42px] h-[42px] object-cover rounded-full"
            />
          )}

          <MdKeyboardArrowDown size={22} />
        </div>
      }
    >
      <ul className="flex flex-col w-44">
        <li className="px-4 py-2 hover:bg-gray-100 rounded-md">
          <Link href={"/profile/info"} className="flex items-center w-full">
            <LuUser />
            <p className="ml-2">Tài khoản</p>
          </Link>
        </li>
        <li className="py-2 px-4 hover:bg-gray-100 rounded-md">
          <button className="flex items-center w-full" onClick={handleLogout}>
            <LuLogOut />
            <p className="ml-2">Đăng xuất</p>
          </button>
        </li>
      </ul>
    </Dropdown>
  );
};

export default DropdownUser;
