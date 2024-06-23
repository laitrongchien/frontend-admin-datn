import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { LuBell } from "react-icons/lu";
import Dropdown from "./Dropdown";
import { notificationService } from "@/services/api/notification";
import { getTimeFromCreated } from "@/utils/common";
import { io } from "socket.io-client";

const DropdownNotification = () => {
  const notificationPage = 1;
  const notificationLimit = 5;
  const [notifications, setNotifications] = useState([]);
  const [totalUnreadNotifications, setTotalUnreadNotifications] = useState(0);
  const router = useRouter();

  const fetchNotifications = async () => {
    try {
      const response = await notificationService.getAllNotifications(
        notificationPage,
        notificationLimit
      );
      const { notifications, totalUnreadNotifications } = response.data;
      setNotifications(notifications);
      setTotalUnreadNotifications(totalUnreadNotifications);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchNotifications();

    const socketUrl =
      process.env.NODE_ENV === "production"
        ? "https://backend-service-api-x43j.onrender.com"
        : "http://localhost:8000";
    const socket = io(socketUrl);

    socket.on("notification", (notification) => {
      console.log(notification);
      setTotalUnreadNotifications((prevTotal) => prevTotal + 1);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleNotificationClick = async (notification: any) => {
    router.push(`/bills/${notification.notificationType}`);
    if (!notification.isRead) {
      try {
        await notificationService.updateReadStatus(notification._id, true);
        setNotifications((prevNotifications: any) =>
          prevNotifications.map((prevNotification: any) =>
            prevNotification._id === notification._id
              ? { ...prevNotification, isRead: true }
              : prevNotification
          )
        );
        setTotalUnreadNotifications((prevTotal) => prevTotal - 1);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleMarkAll = async () => {
    try {
      setTotalUnreadNotifications(0);
      await notificationService.markAllAsRead();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Dropdown
      trigger={
        <div className="relative">
          <LuBell size={22} />
          {totalUnreadNotifications !== 0 && (
            <span className="absolute top-[-12px] right-[-6px] w-5 h-5 flex-center rounded-full bg-[#f5803e] text-sm text-white">
              {totalUnreadNotifications}
            </span>
          )}
        </div>
      }
      fetchApi={fetchNotifications}
    >
      <div className="w-[360px]">
        <div className="flex-between px-4 py-2 border-b border-gray-300">
          <span className="font-semibold">Thông báo</span>
          <button
            className="text-sm text-primary font-semibold"
            onClick={handleMarkAll}
          >
            Đánh dấu tất cả là đã đọc
          </button>
        </div>
        {notifications.map((notification: any) => (
          <button
            key={notification._id}
            className={`px-4 py-2 w-full border-b border-gray-300 flex justify-between ${
              notification.isRead === true ? "bg-white" : "bg-[#edf2f9]"
            } hover:bg-[#ced7e4]`}
            onClick={() => handleNotificationClick(notification)}
          >
            <div className="flex gap-4">
              <Image
                src={
                  notification.notificationType === "maintainance"
                    ? "https://res.cloudinary.com/dufuwsrue/image/upload/v1719167316/motortour/images/other/download_mayo4w.png"
                    : notification.user?.avatar
                }
                alt="avatar"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full"
              />
              <div className="text-left">
                <span className="text-sm font-semibold">
                  {notification.notificationType === "maintainance"
                    ? "Thông tin bảo dưỡng"
                    : notification.user?.name}
                </span>

                <p className="break-words text-[#232e3c]">
                  {notification.message}
                </p>
              </div>
            </div>
            <span className="text-sm text-[#748194]">
              {getTimeFromCreated(notification.createdAt)}
            </span>
          </button>
        ))}

        <button
          className="h-10 w-full font-semibold hover:text-primary"
          onClick={() => router.push("/notifications")}
        >
          Xem tất cả
        </button>
      </div>
    </Dropdown>
  );
};

export default DropdownNotification;
