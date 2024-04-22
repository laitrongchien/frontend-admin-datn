"use client";

import { useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { toast } from "react-toastify";
import { motorbikeService } from "@/services/api/motorbike";
import { createMotorbike } from "@/store/features/motorbikeSlice";

const CreateMotorbikeForm = ({ toggleModal }: { toggleModal: () => void }) => {
  const dispatch = useAppDispatch();
  const [imageUploading, setImageUploading] = useState(false);
  const [formData, setFormData] = useState<{
    name: string;
    type: string;
    engine: number;
    fuelCapacity: number;
    weight: number;
    height: number;
    price: number;
    image: string;
    description: string;
  }>({
    name: "",
    type: "",
    engine: 0,
    fuelCapacity: 0,
    weight: 0,
    height: 0,
    price: 0,
    image: "",
    description: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await dispatch(createMotorbike(formData)).unwrap();
      toast.success("Thêm mới mẫu xe thành công");
      toggleModal();
    } catch (error) {
      toast.error("Có lỗi xảy ra, tên mẫu xe đã tồn tại");
    }
    // console.log(formData);
  };

  const handleUploadImage = async (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageUploading(true);
      const imagePath = await motorbikeService.uploadMotorbikeImage(file);
      setImageUploading(false);
      setFormData({ ...formData, image: imagePath });
    }
  };

  const isSubmitDisabled =
    !formData.name ||
    !formData.type ||
    !formData.engine ||
    !formData.fuelCapacity ||
    !formData.weight ||
    !formData.height ||
    !formData.image;
  !formData.price || !formData.description || imageUploading;

  return (
    <div className="w-[800px] p-4">
      <h1 className="text-2xl font-semibold text-center">
        Thêm mới mẫu xe máy
      </h1>
      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="flex-between flex-wrap">
          <div className="basis-[48%] mb-4">
            <h1>Tên xe</h1>
            <input
              className="form-input w-full"
              required
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div className="basis-[48%] mb-4">
            <h1>Phân loại</h1>
            <select
              className="form-input w-full"
              required
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
            >
              <option>Chọn phân loại xe</option>
              <option value="manual">Xe tay côn</option>
              <option value="automatic">Xe ga</option>
              <option value="semi-automatic">Xe số</option>
            </select>
          </div>
          <div className="basis-[48%] mb-4">
            <h1>Phân khối (cc)</h1>
            <input
              type="number"
              className="form-input w-full"
              required
              onChange={(e) =>
                setFormData({ ...formData, engine: parseInt(e.target.value) })
              }
            />
          </div>
          <div className="basis-[48%] mb-4">
            <h1>Dung tích bình xăng (lít)</h1>
            <input
              type="text"
              className="form-input w-full"
              required
              onChange={(e) =>
                setFormData({
                  ...formData,
                  fuelCapacity: parseFloat(e.target.value),
                })
              }
            />
          </div>
          <div className="basis-[48%] mb-4">
            <h1>Khối lượng xe (kg)</h1>
            <input
              type="number"
              className="form-input w-full"
              required
              onChange={(e) =>
                setFormData({ ...formData, weight: parseInt(e.target.value) })
              }
            />
          </div>
          <div className="basis-[48%] mb-4">
            <h1>Chiều cao yên (mm)</h1>
            <input
              type="number"
              className="form-input w-full"
              required
              onChange={(e) =>
                setFormData({ ...formData, height: parseInt(e.target.value) })
              }
            />
          </div>

          <div className="basis-[48%] mb-4">
            <h1>Giá thuê (nghìn đồng/ ngày)</h1>
            <input
              type="number"
              className="form-input w-full"
              required
              onChange={(e) =>
                setFormData({ ...formData, price: parseInt(e.target.value) })
              }
            />
          </div>

          <div className="basis-[48%] mb-4">
            <h1>Tải lên ảnh về xe motor</h1>
            <input type="file" required onChange={handleUploadImage} />
          </div>
        </div>
        <div className="mt-2">
          <h1>Thêm thông tin mô tả</h1>
          <textarea
            className="form-input w-full"
            name="description"
            rows={2}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="submit"
            disabled={isSubmitDisabled}
            className={`mt-4 mb-2 py-2 px-6 rounded-md ${
              isSubmitDisabled ? "bg-gray-200" : "bg-primary text-white"
            }`}
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

export default CreateMotorbikeForm;
