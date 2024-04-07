"use client";

import { useEffect, useState } from "react";
import { FaEllipsisVertical, FaSquareCheck } from "react-icons/fa6";
import TableData from "@/components/table/TableData";
import { motorIdentificationService } from "@/services/api/identification";
import Loading from "@/components/Loading";

const MotorbikeIdentifications = () => {
  const [loading, setLoading] = useState(false);
  const [motorbikeIdentifications, setMotorbikeIdentifications] = useState([]);
  const [searchIdentification, setSearchIdentification] = useState("");
  const [searchName, setSearchName] = useState("");
  const [performance, setPerformance] = useState("");
  const [status, setStatus] = useState("");
  const [rentStatus, setRentStatus] = useState("");

  useEffect(() => {
    const fetchMotorbikeIdentifications = async () => {
      setLoading(true);
      const res =
        await motorIdentificationService.getAllMotorbikeIdentifications();
      setLoading(false);
      setMotorbikeIdentifications(res.data);
    };
    fetchMotorbikeIdentifications();
  }, []);

  const filteredMotorbikeIdentifications = motorbikeIdentifications
    .filter((identification: any) =>
      identification.motorbike.name
        .toLowerCase()
        .includes(searchName.toLowerCase())
    )
    .filter((identification: any) =>
      performance ? identification.performance === performance : true
    )
    .filter((identification: any) =>
      status ? identification.status === status : true
    )
    .filter((identification: any) => {
      if (rentStatus === "rented") {
        return identification.isUsed;
      } else if (rentStatus === "idle") {
        return !identification.isUsed;
      } else {
        return true;
      }
    });

  const columns = [
    {
      name: "Biển số xe",
      selector: (row: any) => row?.identification,
      sortable: true,
    },
    {
      name: "Tên xe",
      selector: (row: any) => row?.motorbike.name,
    },
    {
      name: "Hiệu suất",
      cell: (row: any) => (
        <h1
          className={`
        ${
          row?.performance === "good"
            ? "text-success"
            : row?.performance === "medium"
            ? "text-pending"
            : "text-error"
        } font-semibold
      `}
        >
          {row?.performance === "good"
            ? "Tốt"
            : row?.performance === "medium"
            ? "Trung bình"
            : "Kém"}
        </h1>
      ),
    },
    {
      name: "Tình trạng",
      cell: (row: any) => (
        <h1
          className={`
        ${
          row?.status === "normal" ? "text-success" : "text-error"
        } font-semibold
      `}
        >
          {row?.status === "normal" ? "Bình thường" : "Hỏng hóc"}
        </h1>
      ),
    },
    {
      name: "Đang được thuê",
      cell: (row: any) =>
        row?.isUsed && <FaSquareCheck color="#1abf57" size={22} />,
      center: true,
    },
    {
      name: "Hành động",
      center: true,
      cell: (row: any) => <FaEllipsisVertical size={20} color="#666" />,
    },
  ];

  if (loading)
    return (
      <div className="h-[calc(100vh-80px-36px)]">
        <Loading />
      </div>
    );

  return (
    <div className="bg-white p-4 min-h-[calc(100vh-80px)] rounded-xl shadow-md border border-gray-200">
      <h1 className="font-semibold">Tình trạng xe hiện tại</h1>
      <div className="mt-2 flex gap-6">
        {/* <input
          type="text"
          className="form-input w-48"
          placeholder="Tìm kiếm theo biển số"
          value={searchIdentification}
          onChange={(e) => setSearchIdentification(e.target.value)}
        /> */}
        <input
          type="text"
          className="form-input w-48"
          placeholder="Tìm kiếm theo tên xe"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <select
          className="form-input w-52"
          onChange={(e) => setPerformance(e.target.value)}
        >
          <option value="">Hiệu suất</option>
          <option value="good">Tốt</option>
          <option value="medium">Trung bình</option>
          <option value="bad">Kém</option>
        </select>
        <select
          className="form-input w-52"
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">Tình trạng</option>
          <option value="normal">Bình thường</option>
          <option value="broken">Hỏng hóc</option>
        </select>
        <select
          className="form-input w-52"
          onChange={(e) => setRentStatus(e.target.value)}
        >
          <option value="">Trạng thái thuê</option>
          <option value="idle">Xe đang rỗi</option>
          <option value="rented">Đã được thuê/ đặt cọc</option>
        </select>
      </div>
      <div className="border border-gray-200 rounded-lg mt-4">
        <TableData columns={columns} data={filteredMotorbikeIdentifications} />
      </div>
    </div>
  );
};

export default MotorbikeIdentifications;
