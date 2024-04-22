"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MdArrowBackIos } from "react-icons/md";
import Loading from "@/components/Loading";
import { motorIdentificationService } from "@/services/api/identification";
// import { toast } from "react-toastify";

const IdentificationDetail = ({ params }: { params: { id: string } }) => {
  const [motorIdentificationDetail, setMotorIdentificationDetail] =
    useState<any>();
  const [loading, setLoading] = useState(false);
  // const [motorStatus, setMotorStatus] = useState("");
  // const [rentStatus, setRentStatus] = useState("");
  const motorIdentification = params.id;

  // const handleUpdateMotorStatus = async () => {
  //   try {
  //     await motorIdentificationService.updateMotorIdentification({
  //       identification: motorIdentification,
  //       status: motorStatus,
  //       isUsed: rentStatus === "idle" ? false : true,
  //     });
  //     toast.success("Đã cập nhật tình trạng xe");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   if (motorIdentificationDetail?.status) {
  //     setMotorStatus(motorIdentificationDetail?.status);
  //   }
  // }, [motorIdentificationDetail]);

  // useEffect(() => {
  //   if (motorIdentificationDetail?.isUsed) {
  //     setRentStatus("rented");
  //   } else setRentStatus("idle");
  // }, [motorIdentificationDetail]);

  useEffect(() => {
    if (motorIdentification) {
      const fetchMotorIdentification = async () => {
        setLoading(true);
        const res = await motorIdentificationService.getMotorByIdentification(
          motorIdentification
        );
        setLoading(false);
        setMotorIdentificationDetail(res.data);
      };
      fetchMotorIdentification();
    }
  }, [motorIdentification]);

  if (loading)
    return (
      <div className="h-[calc(100vh-80px-36px)]">
        <Loading />
      </div>
    );

  return (
    <div className="bg-white py-4 px-8 min-h-[calc(100vh-80px)] rounded-xl shadow-md border border-gray-200">
      <Link
        href={"/motorbike-identifications"}
        className="flex items-center gap-2"
      >
        <MdArrowBackIos />
        <span>Quay lại</span>
      </Link>
      <h1 className="mt-2 font-semibold">Chi tiết xe {motorIdentification}</h1>
      <div className="mt-4">
        <h1>
          Hiệu suất xe:{" "}
          <span
            className={`
        ${
          motorIdentificationDetail?.performance === "good"
            ? "text-success"
            : motorIdentificationDetail?.performance === "medium"
            ? "text-pending"
            : "text-error"
        } font-semibold
      `}
          >
            {motorIdentificationDetail?.performance === "good"
              ? "Tốt"
              : motorIdentificationDetail?.performance === "medium"
              ? "Trung bình"
              : "Kém"}
          </span>
        </h1>
        <h1 className="mt-2">
          Số km đã đi: {motorIdentificationDetail?.km_driven}
        </h1>
        <h1 className="mt-2">
          Đời xe: {motorIdentificationDetail?.model_year}
        </h1>
        <h1 className="mt-2">
          Số lần sửa chữa trước đó: {motorIdentificationDetail?.prev_broken}
        </h1>
        {/* <div className="mt-4">
          <span className="min-w-[120px] inline-block">Tình trạng:</span>
          <select
            className="form-input w-60 ml-2"
            value={motorStatus}
            onChange={(e) => setMotorStatus(e.target.value)}
          >
            <option value="normal">Bình thường</option>
            <option value="broken">Hỏng hóc</option>
          </select>
        </div>
        <div className="mt-4">
          <span className="min-w-[120px] inline-block">Trạng thái thuê:</span>
          <select
            className="form-input w-60 ml-2"
            value={rentStatus}
            onChange={(e) => setRentStatus(e.target.value)}
          >
            <option value="idle">Xe đang rỗi</option>
            <option value="rented">Đã được thuê/ đặt cọc</option>
          </select>
        </div> */}
      </div>

      {/* <button
        className="px-4 py-2 rounded-md text-white bg-primary mt-4"
        onClick={handleUpdateMotorStatus}
      >
        Lưu
      </button> */}
    </div>
  );
};

export default IdentificationDetail;
