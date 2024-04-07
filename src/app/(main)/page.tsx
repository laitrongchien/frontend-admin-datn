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

const Dashboard = () => {
  const [tours, setTours] = useState([]);
  const [motorbikes, setMotorbikes] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [rentals, setRentals] = useState([]);
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
        const toursRes = await tourService.getAllTours();
        const motorbikesRes = await motorbikeService.getAllMotorbikes();
        const bookingsRes = await bookingService.getAllTourBookings();
        const rentalsRes = await rentalService.getAllMotorbikeRentals();
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
    </div>
  );
};

export default Dashboard;
