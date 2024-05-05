"use client";

import { useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { toast } from "react-toastify";
import { createRepair } from "@/store/features/repairSlice";

const CreateRepairForm = ({ toggleModal }: { toggleModal: () => void }) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<{
    startDate: Date;
    identification: string;
    type: "repair" | "maintainance" | string;
    description: string;
    cost: number;
  }>({
    startDate: new Date(),
    identification: "",
    type: "repair",
    description: "",
    cost: 0,
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await dispatch(createRepair(formData)).unwrap();
      toast.success("Thêm bảo dưỡng, sửa chữa thành công");
      toggleModal();
    } catch (error) {
      toast.error("Có lỗi xảy ra");
    }
  };

  return (
    <div className="w-[800px] p-4">
      <h1 className="text-2xl font-semibold text-center">
        Bảo dưỡng, sửa chữa xe
      </h1>
      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="flex-between flex-wrap">
          <div className="basis-[48%] mb-4">
            <h1>Ngày bắt đầu</h1>
            <input
              type="date"
              className="form-input w-full"
              required
              onChange={(e) =>
                setFormData({
                  ...formData,
                  startDate: new Date(e.target.value),
                })
              }
            />
          </div>
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
            <h1>Loại</h1>
            <select
              className="form-input w-full"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  type: e.target.value,
                })
              }
            >
              <option disabled selected>
                Chọn loại
              </option>
              <option value="repair">Sửa chữa</option>
              <option value="maintainance">Bảo dưỡng</option>
            </select>
          </div>
          <div className="basis-[48%] mb-4">
            <h1>Chi phí (nghìn đồng)</h1>
            <input
              type="number"
              className="form-input w-full"
              required
              defaultValue={0}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  cost: parseInt(e.target.value),
                })
              }
            />
          </div>
          <textarea
            className="form-input w-full mt-4"
            name="description"
            rows={2}
            required
            placeholder="Thêm mô tả"
            onChange={(e) =>
              setFormData({
                ...formData,
                description: e.target.value,
              })
            }
          />
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

export default CreateRepairForm;
