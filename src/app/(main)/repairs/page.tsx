"use client";

import { useEffect, useState } from "react";
import TableData from "@/components/table/TableData";
import Loading from "@/components/Loading";
import Modal from "@/components/Modal";
import CreateRepairForm from "@/components/form/repair/CreateRepairForm";
import UpdateRepairForm from "@/components/form/repair/UpdateRepairForm";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchRepairs } from "@/store/features/repairSlice";
import { formatTime, formatCurrency } from "@/utils/common";
import { FaEdit } from "react-icons/fa";
import { colors } from "@/constants";

const Repairs = () => {
  const dispatch = useAppDispatch();
  const { repairs, loading } = useAppSelector((state) => state.repair);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedRepairMotor, setSelectedRepairMotor] = useState();

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    dispatch(fetchRepairs());
  }, [dispatch]);

  const columns = [
    {
      name: "Ngày bắt đầu",
      selector: (row: any) => formatTime(row?.startDate),
      sortable: true,
    },
    {
      name: "Biển số xe",
      selector: (row: any) => row?.identification,
      sortable: true,
    },
    {
      name: "Loại",
      cell: (row: any) => (
        <h1>{row?.type === "repair" ? "Sửa chữa" : "Bảo dưỡng"}</h1>
      ),
    },
    {
      name: "Mô tả",
      selector: (row: any) => row?.description,
    },
    {
      name: "Chi phí",
      selector: (row: any) => formatCurrency(row?.cost),
      sortable: true,
    },
    {
      name: "Trạng thái",
      cell: (row: any) => (
        <h1
          className={`font-semibold ${
            row?.status === "in progress" ? "text-pending" : "text-success"
          }`}
        >
          {row?.status === "in progress"
            ? row.type === "repair"
              ? "Đang sửa chữa"
              : "Đang bảo dưỡng"
            : "Đã hoàn thành"}
        </h1>
      ),
    },
    {
      name: "Hành động",
      center: true,
      cell: (row: any) => (
        <FaEdit
          color={colors.green}
          size={18}
          className="cursor-pointer"
          onClick={() => {
            toggleModal();
            setModalType("update");
            setSelectedRepairMotor(row);
          }}
        />
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
      <h1 className="font-semibold">Bảo dưỡng, sửa chữa xe cho thuê</h1>
      <button
        className="px-4 py-2 bg-primary rounded-md text-white mt-2"
        onClick={() => {
          toggleModal();
          setModalType("create");
        }}
      >
        Thêm
      </button>
      <div className="border border-gray-300 rounded-lg mt-4">
        <TableData columns={columns} data={repairs} />
      </div>
      {showModal && (
        <Modal toggleModal={toggleModal}>
          {modalType === "create" ? (
            <CreateRepairForm toggleModal={toggleModal} />
          ) : (
            <UpdateRepairForm
              toggleModal={toggleModal}
              repairMotor={selectedRepairMotor}
            />
          )}
        </Modal>
      )}
    </div>
  );
};

export default Repairs;
