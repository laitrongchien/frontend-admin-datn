"use client";

import { useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { updateRepair } from "@/store/features/repairSlice";
import { toast } from "react-toastify";

const UpdateRepairForm = ({
  toggleModal,
  repairMotor,
}: {
  toggleModal: () => void;
  repairMotor: any;
}) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<{
    startDate: Date;
    identification: string;
    type: "repair" | "maintainance" | string;
    description: string;
    cost: number;
    status: string;
  }>({
    startDate: new Date(repairMotor.startDate),
    identification: repairMotor.identification,
    type: repairMotor.type,
    description: repairMotor.description,
    cost: repairMotor.cost,
    status: repairMotor.status,
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await dispatch(updateRepair({ id: repairMotor._id, formData })).unwrap();
      toast.success("Cập nhật thành công");
      toggleModal();
    } catch (error) {
      toast.error("Có lỗi xảy ra");
    }
  };

  return (
    <div className="w-[800px] p-4">
      <h1 className="text-2xl font-semibold text-center">
        Cập nhật bảo dưỡng, sửa chữa
      </h1>
      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="flex-between flex-wrap">
          <div className="flex-between flex-wrap">
            <div className="basis-[48%] mb-4">
              <h1>Ngày bắt đầu</h1>
              <input
                type="date"
                className="form-input w-full"
                required
                defaultValue={repairMotor.startDate.toString().split("T")[0]}
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
                value={formData.identification}
                onChange={(e) =>
                  setFormData({ ...formData, identification: e.target.value })
                }
              />
            </div>
            <div className="basis-[48%] mb-4">
              <h1>Loại</h1>
              <select
                className="form-input w-full"
                value={formData.type}
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
                value={formData.cost}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    cost: parseInt(e.target.value),
                  })
                }
              />
            </div>
            <div className="mb-4 basis-[100%]">
              <h1>Mô tả</h1>
              <textarea
                className="form-input w-full"
                name="description"
                rows={2}
                required
                value={formData.description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: e.target.value,
                  })
                }
              />
            </div>

            <div className="basis-[48%] mb-4">
              <h1>Trạng thái</h1>
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
                <option value="in progress">
                  {formData.type === "repair"
                    ? "Đang sửa chữa"
                    : "Đang bảo dưỡng"}
                </option>
                <option value="completed">Đã hoàn thành</option>
              </select>
            </div>
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

export default UpdateRepairForm;
