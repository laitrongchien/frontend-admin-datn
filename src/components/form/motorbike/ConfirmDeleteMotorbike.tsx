import { useAppDispatch } from "@/store/hooks";
import { deleteMotorbike } from "@/store/features/motorbikeSlice";
import { toast } from "react-toastify";

const ConfirmDeleteMotorbike = ({
  toggleModal,
  motorbike,
}: {
  toggleModal: () => void;
  motorbike: any;
}) => {
  const dispatch = useAppDispatch();
  const handleDeleteMotorbike = () => {
    dispatch(deleteMotorbike({ id: motorbike._id }));
    toast.success("Xóa xe motor khỏi danh sách thành công");
    toggleModal();
  };

  return (
    <div className="p-4">
      <h1 className="font-semibold">Xóa xe motor</h1>
      <h1 className="mt-2 mb-6">
        Bạn chắc chắn muốn xóa mẫu xe này khỏi danh sách?
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
          onClick={handleDeleteMotorbike}
        >
          Xóa
        </button>
      </div>
    </div>
  );
};

export default ConfirmDeleteMotorbike;
