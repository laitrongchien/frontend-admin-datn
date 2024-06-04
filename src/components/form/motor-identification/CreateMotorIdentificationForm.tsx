"use client";

import { useState, useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { toast } from "react-toastify";
import { motorbikeService } from "@/services/api/motorbike";
import { createMotorIdentification } from "@/store/features/motorIdentificationSlice";
import { locationService } from "@/services/api/location";

const CreateMotorIdentificationForm = ({
  toggleModal,
}: {
  toggleModal: () => void;
}) => {
  const dispatch = useAppDispatch();
  const [motorbikes, setMotorbikes] = useState([]);
  const [locations, setLocations] = useState([]);
  const [formData, setFormData] = useState<{
    identification: string;
    motorbike: string;
    location: string;
    model_year: number;
    km_driven: number;
    very_serious_failures: number;
    serious_failures: number;
    quite_serious_failures: number;
    medium_failures: number;
    minor_failures: number;
  }>({
    identification: "",
    motorbike: "",
    location: "",
    model_year: 0,
    km_driven: 0,
    very_serious_failures: 0,
    serious_failures: 0,
    quite_serious_failures: 0,
    medium_failures: 0,
    minor_failures: 0,
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

  useEffect(() => {
    const getAllLocations = async () => {
      const res = await locationService.getAllLocations();
      setLocations(res.data);
    };
    getAllLocations();
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
            <h1>Địa điểm nhận xe</h1>
            <select
              className="form-input w-full"
              required
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
            >
              <option>Chọn địa điểm nhận xe</option>
              {locations.map((location: any) => (
                <option key={location._id} value={location.address}>
                  {location.address}
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
              defaultValue={0}
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
              defaultValue={2024}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  model_year: parseInt(e.target.value),
                })
              }
            />
          </div>
          <div className="basis-[48%] mb-4">
            <h1>Thống kê hỏng hóc rất nghiêm trọng (lần)</h1>
            <input
              type="number"
              className="form-input w-full"
              required
              defaultValue={0}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  very_serious_failures: parseInt(e.target.value),
                })
              }
            />
          </div>
          <div className="basis-[48%] mb-4">
            <h1>Thống kê hỏng hóc nghiêm trọng (lần)</h1>
            <input
              type="number"
              className="form-input w-full"
              required
              defaultValue={0}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  serious_failures: parseInt(e.target.value),
                })
              }
            />
          </div>
          <div className="basis-[48%] mb-4">
            <h1>Thống kê hỏng hóc khá nghiêm trọng (lần)</h1>
            <input
              type="number"
              className="form-input w-full"
              required
              defaultValue={0}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  quite_serious_failures: parseInt(e.target.value),
                })
              }
            />
          </div>
          <div className="basis-[48%] mb-4">
            <h1>Thống kê hỏng hóc trung bình (lần)</h1>
            <input
              type="number"
              className="form-input w-full"
              required
              defaultValue={0}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  medium_failures: parseInt(e.target.value),
                })
              }
            />
          </div>
          <div className="basis-[48%] mb-4">
            <h1>Thống kê hỏng hóc nhẹ (lần)</h1>
            <input
              type="number"
              className="form-input w-full"
              required
              defaultValue={0}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  minor_failures: parseInt(e.target.value),
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
