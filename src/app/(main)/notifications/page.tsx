"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { notificationService } from "@/services/api/notification";
import { getTimeFromCreated } from "@/utils/common";
import Pagination from "@/components/Pagination";

const NotificationList = () => {
  const notificationLimit = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [notifications, setNotifications] = useState([]);
  const router = useRouter();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await notificationService.getAllNotifications(
          currentPage,
          notificationLimit
        );
        const { notifications, totalPages } = response.data;
        setNotifications(notifications);
        setTotalPages(totalPages);
      } catch (err) {
        console.log(err);
      }
    };
    fetchNotifications();
  }, [currentPage]);

  const handleNotificationClick = async (notification: any) => {
    const navigateUrl =
      notification.notificationType !== "maintainance"
        ? `/bills/${notification.notificationType}`
        : "/repairs";
    router.push(navigateUrl);
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
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="bg-white py-4 min-h-[calc(100vh-80px)] rounded-xl border border-gray-300">
      <h1 className="font-semibold px-4 pb-4 border-b border-gray-300">
        Tất cả thông báo
      </h1>
      {notifications.map((notification: any) => (
        <button
          key={notification._id}
          className={`px-4 py-3 w-full border-b border-gray-300 flex justify-between ${
            notification.isRead === true ? "bg-white" : "bg-[#edf2f9]"
          } hover:bg-[#ced7e4]`}
          onClick={() => handleNotificationClick(notification)}
        >
          <div className="flex gap-8">
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
      <div className="flex-center mt-6">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          route="/notifications"
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default NotificationList;
