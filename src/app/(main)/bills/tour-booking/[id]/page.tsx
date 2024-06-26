"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { MdArrowBackIos } from "react-icons/md";
import Loading from "@/components/Loading";
import { bookingService } from "@/services/api/booking";
import { formatCurrency, formatDate } from "@/utils/common";
import { toast } from "react-toastify";

const TourBookingDetail = ({ params }: { params: { id: string } }) => {
  const [bookingTour, setBookingTour] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [bookingStatus, setBookingStatus] = useState("");
  const bookingTourId = params.id;

  const handleUpdateBookingStatus = async () => {
    try {
      await bookingService.updateTourBookingStatus(
        bookingTourId,
        bookingStatus
      );
      toast.success("Cập nhật trạng thái thành công");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (bookingTour?.status) {
      setBookingStatus(bookingTour?.status);
    }
  }, [bookingTour]);

  useEffect(() => {
    if (bookingTourId) {
      const fetchBookingTourDetail = async () => {
        setLoading(true);
        const res = await bookingService.getTourBookingById(bookingTourId);
        setLoading(false);
        setBookingTour(res.data);
      };
      fetchBookingTourDetail();
    }
  }, [bookingTourId]);

  if (loading)
    return (
      <div className="h-[calc(100vh-80px-36px)]">
        <Loading />
      </div>
    );

  return (
    <div className="bg-white py-4 px-8 min-h-[calc(100vh-80px)] rounded-xl shadow-md border border-gray-200">
      <Link href={"/bills/tour-booking"} className="flex items-center gap-2">
        <MdArrowBackIos />
        <span>Quay lại</span>
      </Link>
      <h1 className="mt-2 font-semibold">
        Chi tiết đơn đặt tour {bookingTourId}
      </h1>
      <div className="mt-8 flex justify-between">
        {bookingTour && (
          <Image
            src={
              bookingTour?.tour?.imageCover ||
              bookingTour?.tourHistory?.imageCover
            }
            alt="tour-img"
            width={768}
            height={375}
            className="w-80 h-52 object-cover rounded-lg"
          />
        )}

        <div>
          <h1 className="text-lg font-semibold">
            {bookingTour?.tour?.name || bookingTour?.tourHistory?.name}
          </h1>
          <p className="py-1 text-right">
            Giá:{" "}
            {formatCurrency(
              bookingTour?.tour?.price || bookingTour?.tourHistory?.price
            )}
            / người
          </p>
          <p className="py-1 text-right">
            Số lượng người: {bookingTour?.numberPeople}
          </p>
          <p className="py-1 text-right">
            Ngày khởi hành: {formatDate(bookingTour?.startDate)}
          </p>
          <p className="py-1 text-right">
            Tên người đặt: {bookingTour?.user.name}
          </p>
          <p className="py-1 text-right">Email: {bookingTour?.user.email}</p>
          <p className="py-1 text-right">
            Số điện thoại liên hệ: {bookingTour?.phone}
          </p>
        </div>
      </div>
      <div className="mt-8 flex-between">
        <h1>
          Trạng thái thanh toán:{" "}
          <span
            className={`font-semibold ${
              bookingTour?.paymentType === "payAll"
                ? "text-success"
                : "text-pending"
            }`}
          >
            {bookingTour?.paymentType === "payAll"
              ? "Thanh toán toàn bộ"
              : "Thanh toán trước 20%"}
          </span>
        </h1>
        <div>
          <p className="text-right">
            Tổng tiền phải trả:{" "}
            <span className="font-semibold min-w-[85px] inline-block">
              {formatCurrency(bookingTour?.totalPrice)}
            </span>
          </p>
          <p className="text-right">
            Đã thanh toán qua VNPay:{" "}
            <span className="font-semibold min-w-[85px] inline-block">
              {bookingTour?.paymentType === "payAll"
                ? formatCurrency(bookingTour?.totalPrice)
                : formatCurrency(bookingTour?.totalPrice * 0.2)}
            </span>
          </p>
          {bookingStatus === "started" &&
            bookingTour?.paymentType === "payPart" && (
              <p className="text-right">
                Đã thanh toán tại điểm đến:{" "}
                <span className="font-semibold min-w-[85px] inline-block">
                  {formatCurrency(bookingTour?.totalPrice * 0.8)}
                </span>
              </p>
            )}
        </div>
      </div>
      <h1 className="mt-4">
        Trạng thái tour:
        {bookingTour?.status !== "completed" ? (
          <select
            className="form-input w-40 ml-6"
            value={bookingStatus}
            onChange={(e) => setBookingStatus(e.target.value)}
          >
            <option value="waiting">Chưa khởi hành</option>
            <option value="started">Đã tham gia</option>
            <option value="not-started">Không tham gia</option>
            <option value="completed">Đã hoàn thành</option>
          </select>
        ) : (
          <span className="text-success font-semibold">Đã hoàn thành</span>
        )}
      </h1>
      <button
        className="px-4 py-2 rounded-md text-white bg-primary float-right mt-4"
        onClick={handleUpdateBookingStatus}
      >
        Lưu
      </button>
    </div>
  );
};

export default TourBookingDetail;
