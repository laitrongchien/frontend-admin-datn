"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { rentalService } from "@/services/api/rental";
import { motorIdentificationService } from "@/services/api/identification";
import { formatCurrency, formatDate, formatDateTime } from "@/utils/common";
import Loading from "../Loading";

const RentalDetail = ({
  motorRentalDetailId,
}: {
  motorRentalDetailId: string;
}) => {
  const [motorRentalDetail, setMotorRentalDetail] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [rentalStatus, setRentalStatus] = useState("");
  const payOnline =
    motorRentalDetail?.paymentType === "payAll"
      ? motorRentalDetail?.totalPrice
      : motorRentalDetail?.totalPrice * 0.2;
  const payAtPickup =
    motorRentalDetail?.paymentType === "payPart" &&
    (rentalStatus === "received" || rentalStatus === "returned")
      ? motorRentalDetail?.totalPrice * 0.8
      : 0;
  const extraFee = motorRentalDetail?.extraFee || 0;
  const compensateFee = motorRentalDetail?.compensateFee || 0;
  const payRemain =
    motorRentalDetail?.totalPrice -
    payOnline -
    payAtPickup +
    extraFee +
    compensateFee;

  useEffect(() => {
    if (motorRentalDetailId) {
      const fetchMotorRentalDetail = async () => {
        setLoading(true);
        const res = await rentalService.getMotorbikeRentalById(
          motorRentalDetailId
        );
        setTimeout(() => {
          setLoading(false);
        }, 1000);
        setMotorRentalDetail(res.data);
      };
      fetchMotorRentalDetail();
    }
  }, [motorRentalDetailId]);

  useEffect(() => {
    if (motorRentalDetail?.status) {
      setRentalStatus(motorRentalDetail?.status);
    }
  }, [motorRentalDetail]);

  const handleUpdateRentalStatus = async () => {
    try {
      await rentalService.updateRentalStatus(
        motorRentalDetail?._id,
        rentalStatus
      );
      if (rentalStatus === "not-received" || rentalStatus === "returned")
        await Promise.all(
          motorRentalDetail?.motorbikes[0].identifications.map(
            async (identification: string) => {
              await motorIdentificationService.updateMotorIdentification({
                identification,
                isUsed: false,
              });
            }
          )
        );
      toast.success("Cập nhật trạng thái đơn thuê thành công");
    } catch (error) {
      console.log(error);
    }
  };

  const handleExportToPDF = async () => {
    const element = document.getElementById("rental-detail");
    if (element) {
      const pdf = new jsPDF("p", "mm", "a4");
      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL("image/png");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 10;

      const canvasWidth = pageWidth - 2 * margin;
      const canvasHeight = (canvas.height * canvasWidth) / canvas.width;

      if (canvasHeight > pageHeight - 2 * margin) {
        const ratio = (pageHeight - 2 * margin) / canvasHeight;
        pdf.addImage(
          imgData,
          "PNG",
          margin,
          margin,
          canvasWidth * ratio,
          canvasHeight * ratio
        );
      } else {
        pdf.addImage(imgData, "PNG", margin, margin, canvasWidth, canvasHeight);
      }

      pdf.save("rental-detail.pdf");
    }
  };

  if (loading)
    return (
      <div className="h-[calc(100vh-160px)]">
        <Loading />
      </div>
    );

  return (
    <>
      <div id="rental-detail" className="pb-4">
        <div className="mt-4">
          <h1 className="font-semibold">Thông tin khách hàng</h1>
          <p>Tên: {motorRentalDetail?.user.name}</p>
          <p>Email: {motorRentalDetail?.user.email}</p>
          <p>Số điện thoại liên hệ: {motorRentalDetail?.phone}</p>
        </div>
        <div className="mt-4">
          <h1 className="font-semibold">Thông tin thuê xe</h1>
          {motorRentalDetail?.motorbikes.map((data: any) => (
            <div key={data?._id}>
              <p>
                Tên xe: {data.motorbike?.name || data.motorbikeHistory?.name}
              </p>
              <p>
                Giá thuê:{" "}
                {formatCurrency(
                  data.motorbike?.price || data.motorbikeHistory?.price
                )}
              </p>
              <p>Ngày nhận: {formatDate(data.startDate)}</p>
              <p>Ngày dự kiến trả: {formatDate(data.finishDate)}</p>
              <p>Số lượng xe thuê: {data.numMotorbikes}</p>
              <p>
                Đặt thuê xe lúc: {formatDateTime(motorRentalDetail.createdAt)}
              </p>
              {data.identifications.length !== 0 && (
                <h1 className="mt-2 font-semibold">
                  Biển số xe cho thuê:{" "}
                  <span>{data.identifications.join(", ")}</span>
                </h1>
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-between">
          <div>
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
            <div className="mt-4">
              <span>Trạng thái đơn thuê:</span>
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
            </div>
            <p className="mt-4 max-w-[500px] break-words">
              Ghi chú nhận xe: {motorRentalDetail?.returnNote}
            </p>
          </div>
          <div>
            <p className="text-right">
              Tổng tiền dự kiến:{" "}
              <span className="font-semibold min-w-[85px] inline-block">
                {formatCurrency(motorRentalDetail?.totalPrice)}
              </span>
            </p>
            <p className="text-right">
              Đã thanh toán qua VNPay:{" "}
              <span className="font-semibold min-w-[85px] inline-block">
                {formatCurrency(payOnline)}
              </span>
            </p>
            {payAtPickup !== 0 && (
              <p className="text-right">
                Đã thanh toán tại điểm nhận xe:{" "}
                <span className="font-semibold min-w-[85px] inline-block">
                  {formatCurrency(payAtPickup)}
                </span>
              </p>
            )}
            {extraFee !== 0 && (
              <p className="text-right">
                Phụ phí:{" "}
                <span className="font-semibold min-w-[85px] inline-block">
                  {formatCurrency(extraFee)}
                </span>
              </p>
            )}
            {compensateFee !== 0 && (
              <p className="text-right">
                Phí đền bù:{" "}
                <span className="font-semibold min-w-[85px] inline-block">
                  {formatCurrency(compensateFee)}
                </span>
              </p>
            )}
            <p className="text-right">
              Còn phải thanh toán:{" "}
              <span className="font-semibold min-w-[85px] inline-block">
                {formatCurrency(payRemain)}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-x-4">
        <button
          className="px-4 py-2 rounded-md text-white bg-success"
          onClick={handleExportToPDF}
        >
          Xuất PDF
        </button>
        <button
          className="px-4 py-2 rounded-md text-white bg-primary"
          onClick={handleUpdateRentalStatus}
        >
          Lưu
        </button>
      </div>
    </>
  );
};

export default RentalDetail;
