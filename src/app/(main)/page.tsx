"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAppSelector } from "@/store/hooks";
import { FaFlagCheckered, FaMotorcycle } from "react-icons/fa";
import { MdReceiptLong } from "react-icons/md";
import { RiBillLine } from "react-icons/ri";
import { tourService } from "@/services/api/tour";
import { motorbikeService } from "@/services/api/motorbike";
import { bookingService } from "@/services/api/booking";
import { rentalService } from "@/services/api/rental";
import TableData from "@/components/table/TableData";
import Loading from "@/components/Loading";

const Dashboard = () => {
  const [tours, setTours] = useState([]);
  const [motorbikes, setMotorbikes] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    }
  }, [user, router]);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const toursRes = await tourService.getAllTours();
        const motorbikesRes = await motorbikeService.getAllMotorbikes();
        const bookingsRes = await bookingService.getAllTourBookings();
        const rentalsRes = await rentalService.getAllMotorbikeRentals();
        setLoading(false);
        setTours(toursRes.data.tours);
        setMotorbikes(motorbikesRes.data.motorbikes);
        setBookings(bookingsRes.data);
        setRentals(rentalsRes.data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  const bookingColumns = [
    {
      name: "Mã đơn đặt tour",
      selector: (row: any) => row?._id,
    },
    {
      name: "Tên người đặt",
      selector: (row: any) => row?.user.name,
    },
    {
      name: "Email",
      selector: (row: any) => row?.user.email,
      wrap: true,
    },
    {
      name: "Thanh toán",
      cell: (row: any) => (
        <h1
          className={`
                ${
                  row?.paymentType === "payAll"
                    ? "text-success"
                    : "text-pending"
                } font-semibold
              `}
        >
          {row?.paymentType === "payAll"
            ? "Đã thanh toán toàn bộ"
            : "Thanh toán trước 20%"}
        </h1>
      ),
      wrap: true,
    },
    {
      name: "Trạng thái",
      cell: (row: any) => (
        <h1
          className={`
              ${
                row?.status === "completed"
                  ? "text-success"
                  : row?.status === "started"
                  ? "text-primary"
                  : row?.status === "not-started"
                  ? "text-error"
                  : "text-pending"
              } font-semibold
            `}
        >
          {row?.status === "completed"
            ? "Đã hoàn thành"
            : row?.status === "started"
            ? "Đã tham gia"
            : row?.status === "not-started"
            ? "Không tham gia"
            : "Chưa khởi hành"}
        </h1>
      ),
      wrap: true,
    },
  ];

  const rentalColumns = [
    {
      name: "Mã đơn thuê xe",
      selector: (row: any) => row?._id,
    },
    {
      name: "Tên người thuê",
      selector: (row: any) => row?.user.name,
    },
    {
      name: "Email",
      selector: (row: any) => row?.user.email,
      wrap: true,
    },
    {
      name: "Thanh toán",
      cell: (row: any) => (
        <h1
          className={`
            ${
              row?.paymentType === "payAll" ? "text-success" : "text-pending"
            } font-semibold
          `}
        >
          {row?.paymentType === "payAll"
            ? "Đã thanh toán toàn bộ"
            : "Thanh toán trước 20%"}
        </h1>
      ),
      wrap: true,
    },
    {
      name: "Trạng thái",
      cell: (row: any) => (
        <h1
          className={`
            ${
              row?.status === "returned"
                ? "text-success"
                : row?.status === "received"
                ? "text-primary"
                : row?.status === "not-received"
                ? "text-error"
                : "text-pending"
            } font-semibold
          `}
        >
          {row?.status === "returned"
            ? "Đã trả xe"
            : row?.status === "received"
            ? "Đã nhận xe"
            : row?.status === "not-received"
            ? "Không nhận xe"
            : "Chờ nhận xe"}
        </h1>
      ),
      wrap: true,
    },
  ];

  if (loading)
    return (
      <div className="h-[calc(100vh-80px-36px)]">
        <Loading />
      </div>
    );

  return (
    <div>
      <div className="flex-between flex-wrap">
        <div className="p-2 xl:basis-[25%] lg:basis-[50%] basis-[100%]">
          <div className="p-6 border border-gray-300 rounded-lg h-[140px] bg-white">
            <div className="flex justify-between">
              <div>
                <h1 className="text-gray-600">Tour xe motor</h1>
                <h1 className="mt-4 font-semibold text-xl">{tours.length}</h1>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#e5fafb] flex-center">
                <FaFlagCheckered color="#03c9d7" />
              </div>
            </div>
          </div>
        </div>
        <div className="p-2 xl:basis-[25%] lg:basis-[50%] basis-[100%]">
          <div className="p-6 border border-gray-300 rounded-lg h-[140px] bg-white">
            <div className="flex justify-between">
              <div>
                <h1 className="text-gray-600">Mẫu xe motor</h1>
                <h1 className="mt-4 font-semibold text-xl">
                  {motorbikes.length}
                </h1>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#e5fafb] flex-center">
                <FaMotorcycle color="#03c9d7" size={20} />
              </div>
            </div>
          </div>
        </div>
        <div className="p-2 xl:basis-[25%] lg:basis-[50%] basis-[100%]">
          <div className="p-6 border border-gray-300 rounded-lg h-[140px] bg-white">
            <div className="flex justify-between">
              <div>
                <h1 className="text-gray-600">Đơn đặt tour</h1>
                <h1 className="mt-4 font-semibold text-xl">
                  {bookings.length}
                </h1>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#e5faf2] flex-center">
                <MdReceiptLong color="#1abf57" />
              </div>
            </div>
          </div>
        </div>
        <div className="p-2 xl:basis-[25%] lg:basis-[50%] basis-[100%]">
          <div className="p-6 border border-gray-300 rounded-lg h-[140px] bg-white">
            <div className="flex justify-between">
              <div>
                <h1 className="text-gray-600">Đơn thuê xe</h1>
                <h1 className="mt-4 font-semibold text-xl">{rentals.length}</h1>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#e5faf2] flex-center">
                <RiBillLine color="#1abf57" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="p-2">
        <h1 className="text-lg">Đơn đặt tour gần đây</h1>
        <div className="border border-gray-200 rounded-lg mt-4">
          <TableData columns={bookingColumns} data={bookings} />
        </div>
      </div> */}
      <div className="p-2 mt-4">
        <div className="flex-between">
          <h1 className="text-lg">Đơn thuê xe gần đây</h1>
          <Link href={"/bills/motor-rental"} className="text-sm">
            Xem tất cả
          </Link>
        </div>
        <div className="border border-gray-300 rounded-lg mt-4">
          <TableData columns={rentalColumns} data={rentals.slice(0, 5)} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
