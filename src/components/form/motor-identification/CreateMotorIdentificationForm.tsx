"use client";

import { useState, useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { toast } from "react-toastify";
import { motorbikeService } from "@/services/api/motorbike";
import { createMotorIdentification } from "@/store/features/motorIdentificationSlice";

const CreateMotorIdentificationForm = ({
  toggleModal,
}: {
  toggleModal: () => void;
}) => {
  const dispatch = useAppDispatch();
  const [motorbikes, setMotorbikes] = useState([]);
  const [formData, setFormData] = useState<{
    identification: string;
    motorbike: string;
    model_year: number;
    km_driven: number;
    prev_broken: number;
  }>({
    identification: "",
    motorbike: "",
    model_year: 0,
    km_driven: 0,
    prev_broken: 0,
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await dispatch(createMotorIdentification(formData)).unwrap();
      toast.success("Thêm mới biển số thành công");
      toggleModal();
    } catch (error) {
      toast.error("Có lỗi xảy ra");
    }
  };

  useEffect(() => {
    const getAllMotorbikes = async () => {
      const res = await motorbikeService.getAllMotorbikes();
      setMotorbikes(res.data.motorbikes);
    };
    getAllMotorbikes();
  }, []);

  return (
    <div className="w-[800px] p-4">
      <h1 className="text-2xl font-semibold text-center">
        Thêm mới xe theo biển số
      </h1>
      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="flex-between flex-wrap">
          <div className="basis-[48%] mb-4">
            <h1>Biển số xe</h1>
            <input
              className="form-input w-full"
              required
              onChange={(e) =>
                setFormData({ ...formData, identification: e.target.value })
              }
            />
          </div>
          <div className="basis-[48%] mb-4">
            <h1>Mẫu xe</h1>
            <select
              className="form-input w-full"
              required
              onChange={(e) =>
                setFormData({ ...formData, motorbike: e.target.value })
              }
            >
              <option>Chọn mẫu xe</option>
              {motorbikes.map((motorbike: any) => (
                <option key={motorbike._id} value={motorbike._id}>
                  {motorbike.name}
                </option>
              ))}
            </select>
          </div>
          <div className="basis-[48%] mb-4">
            <h1>Số km đã đi (km)</h1>
            <input
              type="number"
              className="form-input w-full"
              required
              onChange={(e) =>
                setFormData({
                  ...formData,
                  km_driven: parseInt(e.target.value),
                })
              }
            />
          </div>
          <div className="basis-[48%] mb-4">
            <h1>Đời xe</h1>
            <input
              type="number"
              className="form-input w-full"
              required
              onChange={(e) =>
                setFormData({
                  ...formData,
                  model_year: parseFloat(e.target.value),
                })
              }
            />
          </div>
          <div className="basis-[48%] mb-4">
            <h1>Số lần hỏng hóc trước đó</h1>
            <input
              type="number"
              className="form-input w-full"
              required
              onChange={(e) =>
                setFormData({
                  ...formData,
                  prev_broken: parseInt(e.target.value),
                })
              }
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="submit"
            className={`mt-4 mb-2 py-2 px-6 rounded-md bg-primary text-white
            `}
          >
            Lưu
          </button>
          <button
            type="button"
            onClick={toggleModal}
            className="mt-4 mb-2 py-2 px-6 rounded-md bg-gray-200"
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateMotorIdentificationForm;
