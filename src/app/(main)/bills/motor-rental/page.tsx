"use client";

import { rentalService } from "@/services/api/rental";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TableData from "@/components/table/TableData";
import Loading from "@/components/Loading";
import { FaRegEye } from "react-icons/fa";
import { colors } from "@/constants";

const MotorRental = () => {
  const router = useRouter();
  const [motorbikeRentals, setMotorbikeRentals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [status, setStatus] = useState("");

  const filteredMotorbikeRentals = motorbikeRentals
    .filter((rental: any) =>
      rental.user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((rental: any) =>
      paymentType ? rental.paymentType === paymentType : true
    )
    .filter((rental: any) => (status ? rental.status === status : true));

  useEffect(() => {
    const fetchMotorbikeRentals = async () => {
      setLoading(true);
      const res = await rentalService.getAllMotorbikeRentals();
      setLoading(false);
      setMotorbikeRentals(res.data);
    };
    fetchMotorbikeRentals();
  }, []);

  const columns = [
    {
      name: "Mã đơn",
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
    {
      name: "Hành động",
      center: true,
      cell: (row: any) => (
        <FaRegEye
          color={colors.blue}
          size={20}
          className="cursor-pointer"
          onClick={() => router.push(`/bills/motor-rental/${row._id}`)}
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
      <h1 className="font-semibold">Tất cả đơn thuê xe</h1>
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
          <option value="pending">Chờ nhận xe</option>
          <option value="received">Đã nhận xe</option>
          <option value="not-received">Không nhận xe</option>
          <option value="returned">Đã trả xe</option>
        </select>
      </div>
      <div className="border border-gray-200 rounded-lg mt-4">
        <TableData columns={columns} data={filteredMotorbikeRentals} />
      </div>
    </div>
  );
};

export default MotorRental;
