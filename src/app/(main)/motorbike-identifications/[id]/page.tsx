"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MdArrowBackIos } from "react-icons/md";
import Loading from "@/components/Loading";
import { motorIdentificationService } from "@/services/api/identification";

const IdentificationDetail = ({ params }: { params: { id: string } }) => {
  const [motorIdentificationDetail, setMotorIdentificationDetail] =
    useState<any>();
  const [loading, setLoading] = useState(false);
  const motorIdentification = params.id;

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
          Số lần hỏng động cơ: {motorIdentificationDetail?.engine_failures}
        </h1>
        <h1 className="mt-2">
          Số lần hỏng khung máy: {motorIdentificationDetail?.frame_failures}
        </h1>
        <h1 className="mt-2">
          Số lần hỏng phanh: {motorIdentificationDetail?.brake_failures}
        </h1>
        <h1 className="mt-2">
          Số lần hỏng săm, lốp: {motorIdentificationDetail?.tire_failures}
        </h1>
        <h1 className="mt-2">
          Hỏng bộ phận khác: {motorIdentificationDetail?.other_failures}
        </h1>
      </div>
    </div>
  );
};

export default IdentificationDetail;
