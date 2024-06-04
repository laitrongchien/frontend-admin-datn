"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { FaSquareCheck } from "react-icons/fa6";
import { FaRegEye, FaEdit, FaTrashAlt } from "react-icons/fa";
import TableData from "@/components/table/TableData";
import Loading from "@/components/Loading";
import Modal from "@/components/Modal";
import CreateMotorIdentificationForm from "@/components/form/motor-identification/CreateMotorIdentificationForm";
import UpdateMotorIdentificationForm from "@/components/form/motor-identification/UpdateMotorIdentificationForm";
import ConfirmDeleteMotorIdentification from "@/components/form/motor-identification/ConfirmDeleteMotorIdentification";
import ImportMotorIdentificationForm from "@/components/form/motor-identification/ImportMotorIdentificationForm";
import { fetchMotorIdentifications } from "@/store/features/motorIdentificationSlice";
import { colors } from "@/constants";

const MotorbikeIdentifications = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [searchName, setSearchName] = useState("");
  const [performance, setPerformance] = useState("");
  const [status, setStatus] = useState("");
  const [rentStatus, setRentStatus] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedMotorIdentification, setSelectedMotorIdentification] =
    useState();
  const { motorIdentifications, loading } = useAppSelector(
    (state) => state.motorIdentification
  );

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    dispatch(fetchMotorIdentifications());
  }, [dispatch]);

  const filteredMotorbikeIdentifications = motorIdentifications
    .filter((identification: any) =>
      identification.motorbike.name
        .toLowerCase()
        .includes(searchName.toLowerCase())
    )
    .filter((identification: any) =>
      performance ? identification.performance === performance : true
    )
    .filter((identification: any) =>
      status ? identification.status === status : true
    )
    .filter((identification: any) => {
      if (rentStatus === "rented") {
        return identification.isUsed;
      } else if (rentStatus === "idle") {
        return !identification.isUsed;
      } else {
        return true;
      }
    });

  const columns = [
    {
      name: "Biển số xe",
      selector: (row: any) => row?.identification,
      sortable: true,
    },
    {
      name: "Tên xe",
      selector: (row: any) => row?.motorbike.name,
    },
    // {
    //   name: "Đời xe",
    //   selector: (row: any) => row?.model_year,
    // },
    // {
    //   name: "Số km đã đi",
    //   selector: (row: any) => row?.km_driven,
    // },
    // {
    //   name: "Số lần sửa trước",
    //   selector: (row: any) => row?.prev_broken,
    // },
    {
      name: "Hiệu suất",
      cell: (row: any) => (
        <h1
          className={`
        ${
          row?.performance === "good"
            ? "text-success"
            : row?.performance === "medium"
            ? "text-pending"
            : "text-error"
        } font-semibold
      `}
        >
          {row?.performance === "good"
            ? "Tốt"
            : row?.performance === "medium"
            ? "Trung bình"
            : "Kém"}
        </h1>
      ),
    },
    {
      name: "Tình trạng",
      cell: (row: any) => (
        <h1
          className={`
        ${
          row?.status === "normal" ? "text-success" : "text-error"
        } font-semibold
      `}
        >
          {row?.status === "normal"
            ? "Bình thường"
            : row?.status === "engine_failure"
            ? "Hỏng động cơ"
            : row?.status === "frame_failure"
            ? "Hỏng khung máy"
            : row?.status === "brake_failure"
            ? "Hỏng phanh"
            : row?.status === "tire_failure"
            ? "Hỏng săm, lốp"
            : "Hỏng bộ phận khác"}
        </h1>
      ),
    },
    {
      name: "Đang được thuê",
      cell: (row: any) =>
        row?.isUsed && <FaSquareCheck color={colors.green} size={22} />,
      center: true,
    },
    {
      name: "Hành động",
      center: true,
      cell: (row: any) => (
        <div className="flex items-center gap-2">
          <FaRegEye
            color={colors.blue}
            size={20}
            className="cursor-pointer"
            onClick={() =>
              router.push(`/motorbike-identifications/${row.identification}`)
            }
          />
          <FaEdit
            color={colors.green}
            size={18}
            className="cursor-pointer"
            onClick={() => {
              toggleModal();
              setModalType("update");
              setSelectedMotorIdentification(row);
            }}
          />
          <FaTrashAlt
            color={colors.red}
            size={16}
            className="cursor-pointer"
            onClick={() => {
              toggleModal();
              setModalType("delete");
              setSelectedMotorIdentification(row);
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
    <div className="bg-white p-4 min-h-[calc(100vh-80px)] rounded-xl border border-gray-300">
      <h1 className="font-semibold">Tình trạng xe hiện tại</h1>
      <div className="mt-2 flex gap-2">
        <button
          className="px-4 py-2 bg-primary rounded-md text-white"
          onClick={() => {
            toggleModal();
            setModalType("create");
          }}
        >
          Thêm xe
        </button>
        <button
          className="px-4 py-2 bg-success rounded-md text-white"
          onClick={() => {
            toggleModal();
            setModalType("import");
          }}
        >
          Thêm từ file
        </button>
      </div>
      <div className="mt-2 flex gap-6">
        <input
          type="text"
          className="form-input w-48"
          placeholder="Tìm kiếm theo tên xe"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <select
          className="form-input w-52"
          onChange={(e) => setPerformance(e.target.value)}
        >
          <option value="">Hiệu suất</option>
          <option value="good">Tốt</option>
          <option value="medium">Trung bình</option>
          <option value="bad">Kém</option>
        </select>
        <select
          className="form-input w-52"
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">Tình trạng</option>
          <option value="normal">Bình thường</option>
          <option value="engine_failure">Hỏng động cơ</option>
          <option value="frame_failure">Hỏng khung máy</option>
          <option value="brake_failure">Hỏng phanh</option>
          <option value="tire_failure">Hỏng săm, lốp</option>
          <option value="other_failure">Hỏng bộ phận khác</option>
        </select>
        <select
          className="form-input w-52"
          onChange={(e) => setRentStatus(e.target.value)}
        >
          <option value="">Trạng thái thuê</option>
          <option value="idle">Xe đang rỗi</option>
          <option value="rented">Đã được thuê/ đặt cọc</option>
        </select>
      </div>
      <div className="border border-gray-300 rounded-lg mt-4">
        <TableData columns={columns} data={filteredMotorbikeIdentifications} />
      </div>
      {showModal && (
        <Modal toggleModal={toggleModal}>
          {modalType === "create" ? (
            <CreateMotorIdentificationForm toggleModal={toggleModal} />
          ) : modalType === "update" ? (
            <UpdateMotorIdentificationForm
              toggleModal={toggleModal}
              motorIdentification={selectedMotorIdentification}
            />
          ) : modalType === "delete" ? (
            <ConfirmDeleteMotorIdentification
              toggleModal={toggleModal}
              motorIdentification={selectedMotorIdentification}
            />
          ) : (
            <ImportMotorIdentificationForm toggleModal={toggleModal} />
          )}
        </Modal>
      )}
    </div>
  );
};

export default MotorbikeIdentifications;
