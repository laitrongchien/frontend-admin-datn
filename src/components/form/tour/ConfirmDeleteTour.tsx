import { useAppDispatch } from "@/store/hooks";
import { deleteTour } from "@/store/features/tourSlice";
import { toast } from "react-toastify";

const ConfirmDeleteTour = ({
  toggleModal,
  tour,
}: {
  toggleModal: () => void;
  tour: any;
}) => {
  const dispatch = useAppDispatch();
  const handleDeleteTour = () => {
    dispatch(deleteTour({ id: tour._id }));
    toast.success("Xóa tour thành công");
    toggleModal();
  };

  return (
    <div className="p-4">
      <h1 className="font-semibold">Xóa tour</h1>
      <h1 className="mt-2 mb-6">
        Bạn chắc chắn muốn xóa tour này khỏi danh sách?
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
          onClick={handleDeleteTour}
        >
          Xóa
        </button>
      </div>
    </div>
  );
};

export default ConfirmDeleteTour;
