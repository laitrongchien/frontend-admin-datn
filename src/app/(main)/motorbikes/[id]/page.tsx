"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motorbikeService } from "@/services/api/motorbike";
import Loading from "@/components/Loading";
import { MdArrowBackIos } from "react-icons/md";

const MotorbikeDetail = ({ params }: { params: { id: string } }) => {
  const [motorbike, setMotorbike] = useState<any>();
  const [loading, setLoading] = useState(false);

  const motorbikeId = params.id;
  useEffect(() => {
    if (motorbikeId) {
      const fetchMotorbikeDetail = async () => {
        setLoading(true);
        const res = await motorbikeService.getMotorbikeById(motorbikeId);
        setLoading(false);
        setMotorbike(res.data);
      };
      fetchMotorbikeDetail();
    }
  }, [motorbikeId]);

  if (loading)
    return (
      <div className="h-[calc(100vh-80px-36px)]">
        <Loading />
      </div>
    );

  return (
    <div className="p-4">
      <Link href={"/motorbikes"} className="flex items-center gap-2">
        <MdArrowBackIos />
        <span>Quay lại</span>
      </Link>
      {motorbike && (
        <div className="flex-center">
          <Image
            src={motorbike.image}
            alt="img1"
            width={1024}
            height={759}
            className="w-[80%] object-cover rounded-lg"
          />
        </div>
      )}
      <h1 className="font-sans text-4xl font-semibold mt-6">
        {motorbike?.name}
      </h1>
      <div className="mt-2">
        <h1 className="text-lg font-semibold">Tổng quan</h1>
        <p className="mt-2">{motorbike?.description}</p>
        <h1 className="text-lg font-semibold mt-4">Thông số</h1>
        <p className="py-2">Phân khối: {motorbike?.engine} cc</p>
        <p className="py-2">Khối lượng: {motorbike?.weight} kg</p>
        <p className="py-2">Chiều cao yên: {motorbike?.height} mm</p>
        <p className="py-2">Dung tích bình xăng: {motorbike?.fuelCapacity} l</p>
      </div>
    </div>
  );
};

export default MotorbikeDetail;
