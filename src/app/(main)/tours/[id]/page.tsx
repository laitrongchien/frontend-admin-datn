"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { tourService } from "@/services/api/tour";
import Loading from "@/components/Loading";
import { MdArrowBackIos } from "react-icons/md";
import { formatCurrency } from "@/utils/common";

const TourDetail = ({ params }: { params: { id: string } }) => {
  const [tour, setTour] = useState<any>();
  const [loading, setLoading] = useState(false);

  const tourId = params.id;
  useEffect(() => {
    if (tourId) {
      const fetchTourDetail = async () => {
        setLoading(true);
        const res = await tourService.getTourById(tourId);
        setLoading(false);
        setTour(res.data);
      };
      fetchTourDetail();
    }
  }, [tourId]);

  if (loading)
    return (
      <div className="h-[calc(100vh-80px-36px)]">
        <Loading />
      </div>
    );

  return (
    <div className="p-4">
      <Link href={"/tours"} className="flex items-center gap-2">
        <MdArrowBackIos />
        <span>Quay lại</span>
      </Link>
      <h1 className="text-3xl font-semibold text-primary mt-4">{tour?.name}</h1>
      <div className="p-4 border border-gray-300 rounded-md mb-8 mt-6 bg-base-200">
        <p className="py-1">
          Thời gian: {tour?.duration} ngày/ {tour?.duration - 1} đêm
        </p>
        <p className="py-1">
          Giá book tour:{" "}
          <span className="text-primary font-semibold">
            {formatCurrency(tour?.price)}
          </span>
        </p>
      </div>
      {tour && (
        <div className="flex-center">
          <Image
            src={tour?.imageCover}
            alt="img1"
            width={1024}
            height={759}
            className="w-[100%] object-cover rounded-lg"
          />
        </div>
      )}
      <div className="mt-4">
        <h1 className="font-semibold text-lg">Tổng quan</h1>
        <p className="mt-2">{tour?.summary}</p>
      </div>
    </div>
  );
};

export default TourDetail;
