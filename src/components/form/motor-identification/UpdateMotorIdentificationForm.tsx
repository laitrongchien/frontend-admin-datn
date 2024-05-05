"use client";

import { useState, useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { toast } from "react-toastify";
import { updateMotorIdentification } from "@/store/features/motorIdentificationSlice";

const UpdateMotorIdentificationForm = ({
  toggleModal,
  motorIdentification,
}: {
  toggleModal: () => void;
  motorIdentification: any;
}) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<{
    identification: string;
    model_year: number;
    km_driven: number;
    status: string;
    isUsed: boolean;
    engine_failures: number;
    frame_failures: number;
    brake_failures: number;
    tire_failures: number;
    other_failures: number;
  }>({
    identification: motorIdentification.identification,
    model_year: motorIdentification.model_year,
    km_driven: motorIdentification.km_driven,
    status: motorIdentification.status,
    isUsed: motorIdentification.isUsed,
    engine_failures: motorIdentification.engine_failures,
    frame_failures: motorIdentification.frame_failures,
    brake_failures: motorIdentification.brake_failures,
    tire_failures: motorIdentification.tire_failures,
    other_failures: motorIdentification.other_failures,
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await dispatch(updateMotorIdentification(formData)).unwrap();
      toast.success("Cập nhật thành công");
      toggleModal();
    } catch (error) {
      toast.error("Có lỗi xảy ra");
    }
  };

  return (
    <div className="w-[800px] p-4">
      <h1 className="text-2xl font-semibold text-center">
        Cập nhật xe theo biển số
      </h1>
      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="flex-between flex-wrap">
          <div className="basis-[48%] mb-4">
            <h1>Biển số xe</h1>
            <input
              className="form-input w-full"
              required
              value={formData.identification}
              readOnly
              onChange={(e) =>
                setFormData({ ...formData, identification: e.target.value })
              }
            />
          </div>
          <div className="basis-[48%] mb-4">
            <h1>Số km đã đi (km)</h1>
            <input
              type="number"
              className="form-input w-full"
              required
              value={formData.km_driven}
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
              value={formData.model_year}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  model_year: parseFloat(e.target.value),
                })
              }
            />
          </div>
          <div className="basis-[48%] mb-4">
            <h1>Trạng thái thuê</h1>
            <select
              className="form-input w-full"
              value={formData.isUsed ? "rented" : "idle"}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  isUsed: e.target.value === "idle" ? false : true,
                })
              }
            >
              <option value="idle">Xe đang rỗi</option>
              <option value="rented">Đã được thuê/ đặt cọc</option>
            </select>
          </div>
          <div className="basis-[48%] mb-4">
            <h1>Tình trạng xe</h1>
            <select
              className="form-input w-full"
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value,
                })
              }
            >
              <option value="normal">Bình thường</option>
              <option value="engine_failure">Hỏng động cơ</option>
              <option value="frame_failure">Hỏng khung máy</option>
              <option value="brake_failure">Hỏng phanh</option>
              <option value="tire_failure">Hỏng săm, lốp</option>
              <option value="other_failure">Hỏng bộ phận khác</option>
            </select>
          </div>
          <div className="basis-[48%] mb-4">
            <h1>Số lần hỏng động cơ</h1>
            <input
              type="number"
              className="form-input w-full"
              required
              value={formData.engine_failures}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  engine_failures: parseInt(e.target.value),
                })
              }
            />
          </div>
          <div className="basis-[48%] mb-4">
            <h1>Số lần hỏng khung máy</h1>
            <input
              type="number"
              className="form-input w-full"
              required
              value={formData.frame_failures}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  frame_failures: parseInt(e.target.value),
                })
              }
            />
          </div>
          <div className="basis-[48%] mb-4">
            <h1>Số lần hỏng phanh</h1>
            <input
              type="number"
              className="form-input w-full"
              required
              value={formData.brake_failures}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  brake_failures: parseInt(e.target.value),
                })
              }
            />
          </div>
          <div className="basis-[48%] mb-4">
            <h1>Số lần hỏng săm, lốp</h1>
            <input
              type="number"
              className="form-input w-full"
              required
              value={formData.tire_failures}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  tire_failures: parseInt(e.target.value),
                })
              }
            />
          </div>
          <div className="basis-[48%] mb-4">
            <h1>Số lần hỏng vị trí khác</h1>
            <input
              type="number"
              className="form-input w-full"
              required
              value={formData.other_failures}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  other_failures: parseInt(e.target.value),
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

export default UpdateMotorIdentificationForm;
