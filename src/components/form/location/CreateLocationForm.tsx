"use client";

import { useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { toast } from "react-toastify";
import { createLocation } from "@/store/features/locationSlice";

const CreateLocationForm = ({ toggleModal }: { toggleModal: () => void }) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<{
    name: string;
    address: string;
    description: string;
  }>({
    name: "",
    address: "",
    description: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await dispatch(createLocation(formData)).unwrap();
      toast.success("Thêm địa điểm nhận xe thành công");
      toggleModal();
    } catch (error) {
      toast.error("Có lỗi xảy ra");
    }
  };

  return (
    <div className="w-[800px] p-4">
      <h1 className="text-2xl font-semibold text-center">Địa điểm nhận xe</h1>
      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="w-full mb-4">
          <span>Tên cơ sở</span>
          <input
            className="form-input w-full"
            required
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="w-full mb-4">
          <span>Địa chỉ</span>
          <input
            className="form-input w-full"
            required
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
          />
        </div>
        <div className="w-full mb-4">
          <span>Mô tả</span>
          <textarea
            className="form-input w-full"
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

export default CreateLocationForm;
