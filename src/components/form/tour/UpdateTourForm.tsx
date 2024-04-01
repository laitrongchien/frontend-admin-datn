"use client";

import { tourService } from "@/services/api/tour";
import { useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { updateTour } from "@/store/features/tourSlice";
import { toast } from "react-toastify";

const ItineraryFields = ({ onChange, item }: { onChange: any; item: any }) => {
  return (
    <div>
      <div className="flex-between gap-8 mt-4">
        <input
          type="number"
          name="day"
          value={item.day}
          onChange={onChange}
          placeholder="Ngày"
          className="flex-1 form-input w-full"
        />
        <input
          type="text"
          name="route"
          value={item.route}
          onChange={onChange}
          placeholder="Điểm đi - Điểm đến"
          className="flex-1 form-input w-full"
        />
        <input
          type="number"
          name="distance"
          value={item.distance}
          onChange={onChange}
          placeholder="Độ dài quãng đường (km)"
          className="flex-1 form-input w-full"
        />
      </div>
      <textarea
        className="form-input w-full mt-4"
        rows={6}
        name="description"
        value={item.description}
        placeholder="Thêm mô tả"
        onChange={onChange}
      />
    </div>
  );
};

const UpdateTourForm = ({
  toggleModal,
  tour,
}: {
  toggleModal: () => void;
  tour: any;
}) => {
  const dispatch = useAppDispatch();
  const [imageUploading, setImageUploading] = useState(false);
  const [formData, setFormData] = useState<{
    name: string;
    duration: number;
    price: number;
    startLocation: string;
    summary: string;
    imageCover: string;
    itinerary: {
      day: number;
      route: string;
      distance: number;
      description: string;
    }[];
  }>({
    name: tour.name,
    duration: tour.duration,
    price: tour.price,
    startLocation: tour.startLocation,
    summary: tour.summary,
    imageCover: tour.imageCover,
    itinerary: tour.itinerary,
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    dispatch(updateTour({ id: tour._id, formData }));
    toast.success("Cập nhật tour thành công");
    toggleModal();
  };

  const handleUploadImage = async (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageUploading(true);
      const imagePath = await tourService.uploadTourCoverImage(file);
      setImageUploading(false);
      setFormData({ ...formData, imageCover: imagePath });
    }
  };

  const handleChangeItinerary = (e: any, index: number) => {
    const { name, value } = e.target;
    const itineraries = [...formData.itinerary];
    itineraries[index] = {
      ...itineraries[index],
      [name]: name === "day" || name === "distance" ? parseInt(value) : value,
    };
    setFormData({ ...formData, itinerary: itineraries });
  };

  const handleAddItinerary = () => {
    setFormData({
      ...formData,
      itinerary: [
        ...formData.itinerary,
        { day: 0, route: "", distance: 0, description: "" },
      ],
    });
  };

  return (
    <div className="w-[800px] p-4">
      <h1 className="text-2xl font-semibold text-center">Cập nhật tour</h1>
      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="flex-between flex-wrap">
          <div className="basis-[48%] mb-4">
            <h1>Tên</h1>
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
            <h1>Thời gian (ngày)</h1>
            <input
              type="number"
              className="form-input w-full"
              required
              value={formData.duration}
              onChange={(e) =>
                setFormData({ ...formData, duration: parseInt(e.target.value) })
              }
            />
          </div>
          <div className="basis-[48%] mb-4">
            <h1>Giá book (nghìn đồng)</h1>
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
            <h1>Địa điểm xuất phát</h1>
            <input
              className="form-input w-full"
              required
              value={formData.startLocation}
              onChange={(e) =>
                setFormData({ ...formData, startLocation: e.target.value })
              }
            />
          </div>
          <div className="basis-[48%] mb-4">
            <h1>Tổng quan</h1>
            <input
              className="form-input w-full"
              required
              value={formData.summary}
              onChange={(e) =>
                setFormData({ ...formData, summary: e.target.value })
              }
            />
          </div>
          <div className="basis-[48%] mb-4">
            <h1>Cập nhật ảnh về tour</h1>
            <input type="file" onChange={handleUploadImage} />
          </div>
        </div>
        <button
          type="button"
          className="p-2 bg-slate-100 rounded-md"
          onClick={handleAddItinerary}
        >
          Thêm mô tả lộ trình
        </button>

        {formData.itinerary.map((item, index) => (
          <ItineraryFields
            key={index}
            item={item}
            onChange={(e: any) => handleChangeItinerary(e, index)}
          />
        ))}
        <div className="flex justify-end gap-4">
          <button
            type="submit"
            className={`mt-4 mb-2 py-2 px-6 rounded-md bg-primary text-white
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

export default UpdateTourForm;
