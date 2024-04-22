import { useAppDispatch } from "@/store/hooks";
import { deleteMotorIdentification } from "@/store/features/motorIdentificationSlice";
import { toast } from "react-toastify";

const ConfirmDeleteMotorIdentification = ({
  toggleModal,
  motorIdentification,
}: {
  toggleModal: () => void;
  motorIdentification: any;
}) => {
  const dispatch = useAppDispatch();
  const handleDeleteMotorIdentification = () => {
    dispatch(deleteMotorIdentification({ id: motorIdentification._id }));
    toast.success("Xóa thành công");
    toggleModal();
  };

  return (
    <div className="p-4">
      <h1 className="font-semibold">Xóa biển số xe khỏi danh sách</h1>
      <h1 className="mt-2 mb-6">
        Bạn chắc chắn muốn xóa xe này khỏi danh sách?
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
          onClick={handleDeleteMotorIdentification}
        >
          Xóa
        </button>
      </div>
    </div>
  );
};

export default ConfirmDeleteMotorIdentification;
