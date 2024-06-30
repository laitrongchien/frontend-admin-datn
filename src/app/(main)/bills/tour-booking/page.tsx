"use client";

import Loading from "@/components/Loading";
import TableData from "@/components/table/TableData";
import { bookingService } from "@/services/api/booking";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaRegEye } from "react-icons/fa";
import { colors } from "@/constants";
import { formatDate } from "@/utils/common";

const TourBooking = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [tourBookings, setTourBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchTourBookings = async () => {
      setLoading(true);
      const res = await bookingService.getAllTourBookings();
      setLoading(false);
      setTourBookings(res.data);
    };
    fetchTourBookings();
  }, []);

  const filteredTourBookings = tourBookings
    .filter((booking: any) =>
      booking.user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((booking: any) =>
      paymentType ? booking.paymentType === paymentType : true
    )
    .filter((booking: any) => (status ? booking.status === status : true));

  const columns = [
    {
      name: "Mã đơn",
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
    // {
    //   name: "Trạng thái",
    //   cell: (row: any) => (
    //     <h1
    //       className={`
    //           ${
    //             row?.status === "completed"
    //               ? "text-success"
    //               : row?.status === "started"
    //               ? "text-primary"
    //               : row?.status === "not-started"
    //               ? "text-error"
    //               : "text-pending"
    //           } font-semibold
    //         `}
    //     >
    //       {row?.status === "completed"
    //         ? "Đã hoàn thành"
    //         : row?.status === "started"
    //         ? "Đã tham gia"
    //         : row?.status === "not-started"
    //         ? "Không tham gia"
    //         : "Chưa khởi hành"}
    //     </h1>
    //   ),
    //   wrap: true,
    // },
    {
      name: "Ngày khởi hành",
      cell: (row: any) => <span>{formatDate(row?.startDate)}</span>,
      wrap: true,
    },
    {
      name: "Hành động",
      center: true,
      cell: (row: any) => (
        <FaRegEye
          color={colors.blue}
          size={20}
          className="cursor-pointer"
          onClick={() => router.push(`/bills/tour-booking/${row._id}`)}
        />
      ),
    },
  ];

  if (loading)
    return (
      <div className="h-[calc(100vh-80px-36px)]">
        <Loading />
      </div>
    );

  return (
    <div className="bg-white p-4 min-h-[calc(100vh-80px)] rounded-xl border border-gray-300">
      <h1 className="font-semibold">Tất cả đơn đặt tour</h1>
      <div className="mt-2 flex gap-6">
        <input
          type="text"
          className="form-input w-48"
          placeholder="Tìm kiếm theo email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="form-input w-52"
          onChange={(e) => setPaymentType(e.target.value)}
        >
          <option value="">Thanh toán</option>
          <option value="payAll">Thanh toán toàn bộ</option>
          <option value="payPart">Thanh toán trước 20%</option>
        </select>
        <select
          className="form-input w-52"
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">Trạng thái</option>
          <option value="wating">Chưa khởi hành</option>
          <option value="started">Đã khởi hành</option>
          <option value="completed">Đã hoàn thành</option>
        </select>
      </div>
      <div className="border border-gray-300 rounded-lg mt-4">
        <TableData columns={columns} data={filteredTourBookings} />
      </div>
    </div>
  );
};

export default TourBooking;
