"use client";

import { useState } from "react";

const CreateMaintainSchedule = ({
  toggleModal,
}: {
  toggleModal: () => void;
}) => {
  const [unit, setUnit] = useState("day");
  const [numKms, setNumKms] = useState<number>();
  const [numDays, setNumDays] = useState<number>();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(unit, numDays, numKms);
  };

  return (
    <div className="w-[600px] p-4">
      <h1 className="text-lg font-semibold text-center">
        Thêm mới cài đặt thông báo bảo dưỡng
      </h1>
      <form className="mt-4" onSubmit={handleSubmit}>
        <div>
          <p>Loại bảo dưỡng</p>
          <input
            className="form-input w-full"
            required
            //   onChange={(e) =>
            //     setFormData({ ...formData, identification: e.target.value })
            //   }
          />
        </div>
        <div className="mt-4">
          <p>Lặp lại mỗi</p>
          <div className="flex items-center">
            <input
              type="radio"
              name="km"
              value="km"
              checked={unit === "km"}
              onChange={(e) => setUnit(e.target.value)}
            />
            <label className="ml-2 min-w-[120px]">km</label>
            <input
              type="number"
              placeholder="km"
              className="form-input w-[120px] ml-8"
              onChange={(e) => setNumKms(Number(e.target.value))}
              required={unit === "km"}
            />
          </div>
          <div className="flex items-center mt-4">
            <input
              type="radio"
              name="day"
              value="day"
              checked={unit === "day"}
              onChange={(e) => setUnit(e.target.value)}
            />
            <label className="ml-2 min-w-[120px]">Thời gian (ngày)</label>
            <input
              type="number"
              placeholder="Thời gian"
              className="form-input w-[120px] ml-8"
              onChange={(e) => setNumDays(Number(e.target.value))}
              required={unit === "day"}
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

export default CreateMaintainSchedule;
