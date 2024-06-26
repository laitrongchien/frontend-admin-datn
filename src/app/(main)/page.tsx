"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { FaFlagCheckered, FaMotorcycle } from "react-icons/fa";
import { MdReceiptLong } from "react-icons/md";
import { RiBillLine } from "react-icons/ri";
import { tourService } from "@/services/api/tour";
import { motorbikeService } from "@/services/api/motorbike";
import { bookingService } from "@/services/api/booking";
import { rentalService } from "@/services/api/rental";
import Loading from "@/components/Loading";
import { colors, rentalStatuses, motorPerformance } from "@/constants";
import AppPieChart from "@/components/chart/AppPieChart";
import AppLineChart from "@/components/chart/AppLineChart";
import { motorIdentificationService } from "@/services/api/identification";

const Dashboard = () => {
  const [tours, setTours] = useState([]);
  const [motorbikes, setMotorbikes] = useState([]);
  const [motorIdentifications, setMotorIdentifications] = useState([]);
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
        const motorIdentificationRes =
          await motorIdentificationService.getAllMotorbikeIdentifications();
        const bookingsRes = await bookingService.getAllTourBookings();
        const rentalsRes = await rentalService.getAllMotorbikeRentals();
        setLoading(false);
        setTours(toursRes.data.tours);
        setMotorbikes(motorbikesRes.data.motorbikes);
        setMotorIdentifications(motorIdentificationRes.data);
        setBookings(bookingsRes.data);
        setRentals(rentalsRes.data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  if (loading)
    return (
      <div className="h-[calc(100vh-80px-36px)]">
        <Loading />
      </div>
    );

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 border border-gray-300 rounded-lg h-[140px] bg-white">
          <div className="flex justify-between">
            <div>
              <h1 className="text-gray-600">Tour xe máy</h1>
              <h1 className="mt-4 font-semibold text-xl">{tours.length}</h1>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#e5fafb] flex-center">
              <FaFlagCheckered color={colors.blue} />
            </div>
          </div>
        </div>
        <div className="p-6 border border-gray-300 rounded-lg h-[140px] bg-white">
          <div className="flex justify-between">
            <div>
              <h1 className="text-gray-600">Mẫu xe máy</h1>
              <h1 className="mt-4 font-semibold text-xl">
                {motorbikes.length}
              </h1>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#e5fafb] flex-center">
              <FaMotorcycle color={colors.blue} size={20} />
            </div>
          </div>
        </div>
        <div className="p-6 border border-gray-300 rounded-lg h-[140px] bg-white">
          <div className="flex justify-between">
            <div>
              <h1 className="text-gray-600">Đơn đặt tour</h1>
              <h1 className="mt-4 font-semibold text-xl">{bookings.length}</h1>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#e5faf2] flex-center">
              <MdReceiptLong color={colors.green} />
            </div>
          </div>
        </div>
        <div className="p-6 border border-gray-300 rounded-lg h-[140px] bg-white">
          <div className="flex justify-between">
            <div>
              <h1 className="text-gray-600">Đơn thuê xe</h1>
              <h1 className="mt-4 font-semibold text-xl">{rentals.length}</h1>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#e5faf2] flex-center">
              <RiBillLine color={colors.green} />
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="w-full h-[320px] bg-white rounded-lg border border-gray-300">
          <p className="text-[18px] text-gray-600 font-semibold text-center mt-2">
            Thống kê hiệu suất xe
          </p>
          <AppPieChart
            data={motorPerformance.map((item: any) => ({
              label: item.label,
              value: motorIdentifications.filter(
                (identification: any) =>
                  identification.performance === item.performance
              ).length,
              color: item.color,
            }))}
          />
        </div>
        <div className="w-full h-[320px] bg-white rounded-lg border border-gray-300">
          <p className="text-[18px] text-gray-600 font-semibold text-center mt-2">
            Thống kê trạng thái đơn thuê xe
          </p>
          <AppPieChart
            data={rentalStatuses.map((item: any) => ({
              label: item.label,
              value: rentals.filter(
                (rental: any) => rental.status === item.status
              ).length,
              color: item.color,
            }))}
          />
        </div>
      </div>
      <div className="mt-4 h-[500px] bg-white rounded-lg border border-gray-300 pt-6 pb-12">
        <AppLineChart bookingData={bookings} rentalData={rentals} />
      </div>
    </>
  );
};

export default Dashboard;
