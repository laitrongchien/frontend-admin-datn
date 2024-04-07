"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MdArrowBackIos } from "react-icons/md";
import { rentalService } from "@/services/api/rental";
import { motorIdentificationService } from "@/services/api/identification";
import Loading from "@/components/Loading";
import { formatCurrency, formatTime, formatTimeDate } from "@/utils/common";
import { toast } from "react-toastify";

const MotorRentalDetail = ({ params }: { params: { id: string } }) => {
  const [motorRentalDetail, setMotorRentalDetail] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [rentalStatus, setRentalStatus] = useState("");
  const motorRentalDetailId = params.id;
  const [identificationsRental, setIdentificationsRental] = useState<any[]>([]);

  useEffect(() => {
    if (motorRentalDetail?.status) {
      setRentalStatus(motorRentalDetail?.status);
    }
  }, [motorRentalDetail]);

  useEffect(() => {
    if (motorRentalDetail?.motorbikes[0].identifications) {
      setIdentificationsRental(
        motorRentalDetail?.motorbikes[0].identifications
      );
    }
  }, [motorRentalDetail?.motorbikes]);

  const handleUpdateIdentificationsRental = async () => {
    try {
      await rentalService.updateIdentificationsRental(
        motorRentalDetailId,
        identificationsRental
      );
      await Promise.all(
        identificationsRental.map(async (identification: string) => {
          await motorIdentificationService.updateMotorIdentification({
            identification,
            isUsed: true,
          });
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateRentalStatus = async () => {
    try {
      await rentalService.updateRentalStatus(motorRentalDetailId, rentalStatus);
      if (rentalStatus === "not-received" || rentalStatus === "returned")
        await Promise.all(
          identificationsRental.map(async (identification: string) => {
            await motorIdentificationService.updateMotorIdentification({
              identification,
              isUsed: false,
            });
          })
        );
      toast.success("Cập nhật trạng thái đơn thuê thành công");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (motorRentalDetailId) {
      const fetchMotorRentalDetail = async () => {
        setLoading(true);
        const res = await rentalService.getMotorbikeRentalById(
          motorRentalDetailId
        );
        setLoading(false);
        setMotorRentalDetail(res.data);
      };
      fetchMotorRentalDetail();
    }
  }, [motorRentalDetailId]);

  if (loading)
    return (
      <div className="h-[calc(100vh-80px-36px)]">
        <Loading />
      </div>
    );

  return (
    <div className="bg-white py-4 px-8 min-h-[calc(100vh-80px)] rounded-xl shadow-md border border-gray-200">
      <Link href={"/bills/motor-rental"} className="flex items-center gap-2">
        <MdArrowBackIos />
        <span>Quay lại</span>
      </Link>
      <h1 className="mt-2 font-semibold">
        Chi tiết đơn thuê xe {motorRentalDetailId}
      </h1>
      <div className="flex mt-4">
        <div>
          <h1 className="font-semibold">Thông tin thuê xe</h1>
          {motorRentalDetail?.motorbikes.map((data: any) => (
            <div key={data._id}>
              <p>Tên xe: {data.motorbike.name}</p>
              <p>Giá thuê: {formatCurrency(data.motorbike.price)}</p>
              <p>Ngày nhận: {formatTime(data.startDate)}</p>
              <p>Ngày trả: {formatTime(data.finishDate)}</p>
              <p>Số lượng xe thuê: {data.numMotorbikes}</p>
              <p>
                Đặt thuê xe lúc: {formatTimeDate(motorRentalDetail.createdAt)}
              </p>
              <h1 className="mt-2 font-semibold">Biển số xe cho thuê</h1>
              {[...Array(data.numMotorbikes)].map((_, index) => (
                <div key={index}>
                  <input
                    className="w-40 form-input mt-2"
                    value={identificationsRental[index]}
                    onChange={(e) => {
                      const newIdentifications = [...identificationsRental];
                      newIdentifications[index] = e.target.value;
                      setIdentificationsRental(newIdentifications);
                    }}
                  />
                </div>
              ))}
            </div>
          ))}
          <button
            className="px-4 py-2 rounded-md text-white bg-primary mt-4"
            onClick={handleUpdateIdentificationsRental}
          >
            Cập nhật
          </button>
        </div>
        <div className="ml-24">
          <h1 className="font-semibold">Thông tin khách hàng</h1>
          <p>Tên: {motorRentalDetail?.user.name}</p>
          <p>Tên: {motorRentalDetail?.user.email}</p>
        </div>
      </div>
      <div className="mt-8 flex-between">
        <h1>
          Trạng thái thanh toán:{" "}
          <span
            className={`font-semibold ${
              motorRentalDetail?.paymentType === "payAll"
                ? "text-success"
                : "text-pending"
            }`}
          >
            {motorRentalDetail?.paymentType === "payAll"
              ? "Thanh toán toàn bộ"
              : "Thanh toán trước 20%"}
          </span>
        </h1>
        <div>
          <p>
            Tổng tiền phải trả:{" "}
            <span className="font-semibold">
              {formatCurrency(motorRentalDetail?.totalPrice)}
            </span>
          </p>
        </div>
      </div>
      <h1 className="mt-4">
        Trạng thái đơn thuê:{" "}
        {motorRentalDetail?.status !== "returned" ? (
          <select
            className="form-input w-60 ml-6"
            value={rentalStatus}
            onChange={(e) => setRentalStatus(e.target.value)}
          >
            <option value="pending">Chờ nhận xe</option>
            <option value="received">Đã nhận xe</option>
            <option value="not-received">Không nhận xe</option>
            <option value="returned">Đã trả xe</option>
          </select>
        ) : (
          <span className="text-success font-semibold">Đã trả xe</span>
        )}
      </h1>
      <div className="flex justify-end">
        <button
          className="px-4 py-2 rounded-md text-white bg-primary mt-4"
          onClick={handleUpdateRentalStatus}
        >
          Lưu
        </button>
      </div>
    </div>
  );
};

export default MotorRentalDetail;
