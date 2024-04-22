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
    prev_broken: number;
    status: string;
    isUsed: boolean;
  }>({
    identification: motorIdentification.identification,
    model_year: motorIdentification.model_year,
    km_driven: motorIdentification.km_driven,
    prev_broken: motorIdentification.prev_broken,
    status: motorIdentification.status,
    isUsed: motorIdentification.isUsed,
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
            <h1>Số lần hỏng hóc trước đó</h1>
            <input
              type="number"
              className="form-input w-full"
              required
              value={formData.prev_broken}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  prev_broken: parseInt(e.target.value),
                })
              }
            />
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
              <option value="broken">Hỏng hóc</option>
            </select>
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
