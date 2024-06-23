"use client";

import { useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { toast } from "react-toastify";
import { motorbikeService } from "@/services/api/motorbike";
import { updateMotorbike } from "@/store/features/motorbikeSlice";
import QuillEditor from "@/components/editor/QuillEditor";

const UpdateMotorbikeForm = ({
  toggleModal,
  motorbike,
}: {
  toggleModal: () => void;
  motorbike: any;
}) => {
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
    name: motorbike.name,
    type: motorbike.type,
    engine: motorbike.engine,
    fuelCapacity: motorbike.fuelCapacity,
    weight: motorbike.weight,
    height: motorbike.height,
    price: motorbike.price,
    image: motorbike.image,
    description: motorbike.description,
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await dispatch(updateMotorbike({ id: motorbike._id, formData })).unwrap();
      toast.success("Cập nhật thông tin xe máy thành công");
      toggleModal();
    } catch (error) {
      toast.error("Có lỗi xảy ra, tên mẫu xe đã tồn tại");
    }
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

  return (
    <div className="w-[800px] p-4">
      <h1 className="text-2xl font-semibold text-center">
        Cập nhật thông tin mẫu xe
      </h1>
      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="flex-between flex-wrap">
          <div className="basis-[48%] mb-4">
            <h1>Tên xe</h1>
            <input
              className="form-input w-full"
              required
              value={formData.name}
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
              value={formData.type}
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
              value={formData.engine}
              onChange={(e) =>
                setFormData({ ...formData, engine: parseInt(e.target.value) })
              }
            />
          </div>
          <div className="basis-[48%] mb-4">
            <h1>Dung tích bình xăng (lít)</h1>
            <input
              type="number"
              className="form-input w-full"
              required
              value={formData.fuelCapacity}
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
              value={formData.weight}
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
              value={formData.height}
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
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: parseInt(e.target.value) })
              }
            />
          </div>

          <div className="basis-[48%] mb-4">
            <h1>Cập nhật ảnh về xe motor</h1>
            <input type="file" onChange={handleUploadImage} />
          </div>
        </div>
        <div className="mt-2">
          <h1>Thêm thông tin mô tả</h1>
          <QuillEditor
            content={formData.description}
            setContent={(value: any) =>
              setFormData({ ...formData, description: value })
            }
          />
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="submit"
            className={`mt-4 mb-2 py-2 px-6 rounded-md ${
              imageUploading ? "bg-gray-200" : "bg-primary text-white"
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

export default UpdateMotorbikeForm;
