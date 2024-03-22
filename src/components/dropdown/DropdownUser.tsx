import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { MdKeyboardArrowDown } from "react-icons/md";
import { LuLogOut, LuUser } from "react-icons/lu";
import { logout } from "@/store/features/authSlice";

const DropdownUser = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div className="relative">
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        href="#"
      >
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
      </Link>

      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-0 mt-2 flex w-44 flex-col rounded-sm border border-stroke bg-white shadow-default ${
          dropdownOpen === true ? "block" : "hidden"
        }`}
      >
        <ul className="flex flex-col">
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
      </div>
    </div>
  );
};

export default DropdownUser;
