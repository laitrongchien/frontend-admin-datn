import { useAppDispatch } from "@/store/hooks";
import { deleteLocation } from "@/store/features/locationSlice";
import { toast } from "react-toastify";

const ConfirmDeleteLocation = ({
  toggleModal,
  location,
}: {
  toggleModal: () => void;
  location: any;
}) => {
  const dispatch = useAppDispatch();
  const handleDeleteLocation = () => {
    dispatch(deleteLocation({ id: location._id }));
    toast.success("Xóa địa điểm nhận xe thành công");
    toggleModal();
  };

  return (
    <div className="p-4">
      <h1 className="font-semibold">Xóa địa điểm nhận xe</h1>
      <h1 className="mt-2 mb-6">
        Bạn chắc chắn muốn xóa địa điểm nhận xe này khỏi danh sách?
      </h1>
      <div className="flex justify-end gap-4">
        <button
          className="mt-4 mb-2 py-2 px-6 rounded-md bg-gray-200"
          onClick={toggleModal}
        >
          Hủy
        </button>
        <button
          className={`mt-4 mb-2 py-2 px-6 rounded-md bg-error text-white
            }`}
          onClick={handleDeleteLocation}
        >
          Xóa
        </button>
      </div>
    </div>
  );
};

export default ConfirmDeleteLocation;
