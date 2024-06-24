"use client";

import { useState, useEffect } from "react";
import { motorbikeService } from "@/services/api/motorbike";
import { toast } from "react-toastify";

const MaintainSchedule = () => {
  const [motorbikes, setMotorbikes] = useState([]);
  const [motorbike, setMotorbike] = useState<any>();
  const [editSchedule, setEditSchedule] = useState<any[]>([]);

  useEffect(() => {
    const getAllMotorbikes = async () => {
      const res = await motorbikeService.getAllMotorbikes();
      setMotorbikes(res.data.motorbikes);
    };
    getAllMotorbikes();
  }, []);

  useEffect(() => {
    setEditSchedule(motorbike?.maintainSchedule || []);
  }, [motorbike]);

  const handleQuantityChange = (index: number, value: string) => {
    const updatedSchedule = [...editSchedule];
    updatedSchedule[index].quantity = Number(value);
    setEditSchedule(updatedSchedule);
  };

  const handleUnitChange = (index: number, value: string) => {
    const updatedSchedule = [...editSchedule];
    updatedSchedule[index].unit = Number(value);
    setEditSchedule(updatedSchedule);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await motorbikeService.updateMaintainSchedule(
        motorbike._id,
        editSchedule
      );
      toast.success("Cập nhật thành công");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <label>Chọn mẫu xe</label>
      <select
        className="form-input w-[240px] mt-2 ml-4"
        onChange={(e) =>
          setMotorbike(motorbikes.find((m: any) => m._id === e.target.value))
        }
      >
        <option>Chọn trong danh sách dưới đây</option>
        {motorbikes.map((motorbike: any) => (
          <option key={motorbike._id} value={motorbike._id}>
            {motorbike.name}
          </option>
        ))}
      </select>

      <form onSubmit={handleSubmit}>
        {editSchedule?.map((maintain: any, index: number) => (
          <div key={index} className="flex-between mt-8 w-[500px]">
            <label>{maintain.type}</label>
            <div className="flex items-center gap-2">
              <span>Sau mỗi:</span>
              <input
                value={maintain.quantity}
                onChange={(e) => handleQuantityChange(index, e.target.value)}
                className="w-20 h-6 border-b border-gray-400 outline-none"
              />
              <select
                value={maintain.unit}
                onChange={(e) => handleUnitChange(index, e.target.value)}
                className="w-20 border-t-transparent border-x-transparent h-6 rounded-none p-0 focus:outline-none"
              >
                <option value="km">km</option>
                <option value="day">ngày</option>
              </select>
            </div>
          </div>
        ))}
        {motorbike && (
          <div className="w-[500px] mt-6">
            <button className="float-right py-2 px-6 rounded-md bg-primary text-white">
              Lưu
            </button>
          </div>
        )}
      </form>
    </>
  );
};

export default MaintainSchedule;
