"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { formatCurrency } from "@/utils/common";
import { MdStar } from "react-icons/md";
import TableData from "@/components/table/TableData";
import Loading from "@/components/Loading";
import { fetchMotorbikes } from "@/store/features/motorbikeSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Modal from "@/components/Modal";
import CreateMotorbikeForm from "@/components/form/motorbike/CreateMotorbikeForm";
import { FaEdit, FaTrashAlt, FaRegEye } from "react-icons/fa";
import UpdateMotorbikeForm from "@/components/form/motorbike/UpdateMotorbikeForm";
import ConfirmDeleteMotorbike from "@/components/form/motorbike/ConfirmDeleteMotorbike";

const Motorbikes = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { motorbikes, loading } = useAppSelector((state) => state.motorbike);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [motorType, setMotorType] = useState("");
  const [selectedMotorbike, setSelectedMotorbike] = useState();

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const filteredMotorbikes = motorType
    ? motorbikes.filter((motorbike) => motorbike.type === motorType)
    : motorbikes;

  useEffect(() => {
    dispatch(fetchMotorbikes());
  }, [dispatch]);

  const columns = [
    {
      name: "Mẫu xe",
      selector: (row: any) => row?.name,
      sortable: true,
      wrap: true,
      width: "200px",
    },
    {
      name: "Hình ảnh",
      cell: (row: any) => (
        <Image
          src={row?.image}
          alt="img-motorbike"
          width={279}
          height={175}
          className="w-24 h-16 object-cover rounded-md"
        />
      ),
    },
    {
      name: "Giá thuê",
      selector: (row: any) => row?.price,
      cell: (row: any) => (
        <h1>
          <span className="text-primary font-semibold">
            {formatCurrency(row?.price)}
          </span>
          /ngày
        </h1>
      ),
      width: "200px",
      sortable: true,
    },
    {
      name: "Đánh giá",
      selector: (row: any) => row?.ratingsAverage,
      cell: (row: any) => (
        <div className="flex items-center">
          <span>{row?.ratingsAverage}</span>
          <MdStar color="#03c9d7" />
          <span>({row?.ratingsQuantity})</span>
        </div>
      ),
      width: "160px",
      sortable: true,
    },
    {
      name: "Loại xe",
      cell: (row: any) => (
        <h1>
          {row?.type === "manual"
            ? "Xe tay côn"
            : row?.type === "automatic"
            ? "Xe ga"
            : "Xe số"}
        </h1>
      ),
    },
    {
      name: "Hành động",
      center: true,
      cell: (row: any) => (
        <div className="flex items-center gap-2">
          <FaRegEye
            color="#03c9d7"
            size={20}
            className="cursor-pointer"
            onClick={() => router.push(`/motorbikes/${row._id}`)}
          />
          <FaEdit
            color="#1abf57"
            size={18}
            className="cursor-pointer"
            onClick={() => {
              toggleModal();
              setModalType("update");
              setSelectedMotorbike(row);
            }}
          />
          <FaTrashAlt
            color="#dc2626"
            size={16}
            className="cursor-pointer"
            onClick={() => {
              toggleModal();
              setModalType("delete");
              setSelectedMotorbike(row);
            }}
          />
        </div>
      ),
    },
  ];

  if (loading)
    return (
      <div className="h-[calc(100vh-80px-36px)]">
        <Loading />
      </div>
    );

  return (
    <div>
      <h1 className="font-semibold">Tất cả mẫu xe cho thuê</h1>
      <div className="flex-between mt-2">
        <button
          className="px-4 py-2 bg-primary rounded-md text-white"
          onClick={() => {
            toggleModal();
            setModalType("create");
          }}
        >
          Thêm
        </button>

        <select
          className="form-input w-40"
          onChange={(e) => setMotorType(e.target.value)}
        >
          <option value="">Phân loại xe</option>
          <option value="semi-automatic">Xe số</option>
          <option value="automatic">Xe ga</option>
          <option value="manual">Xe tay côn</option>
        </select>
      </div>
      <div className="border border-gray-200 rounded-lg mt-4">
        <TableData columns={columns} data={filteredMotorbikes} />
      </div>
      {showModal && (
        <Modal toggleModal={toggleModal}>
          {modalType === "create" ? (
            <CreateMotorbikeForm toggleModal={toggleModal} />
          ) : modalType === "update" ? (
            <UpdateMotorbikeForm
              toggleModal={toggleModal}
              motorbike={selectedMotorbike}
            />
          ) : (
            <ConfirmDeleteMotorbike
              toggleModal={toggleModal}
              motorbike={selectedMotorbike}
            />
          )}
        </Modal>
      )}
    </div>
  );
};

export default Motorbikes;
