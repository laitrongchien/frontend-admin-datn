"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { formatCurrency } from "@/utils/common";
import { MdStar } from "react-icons/md";
import TableData from "@/components/table/TableData";
import Loading from "@/components/Loading";
import Modal from "@/components/Modal";
import { FaEdit, FaRegEye, FaTrashAlt } from "react-icons/fa";
import CreateTourForm from "@/components/form/tour/CreateTourForm";
import UpdateTourForm from "@/components/form/tour/UpdateTourForm";
import ConfirmDeleteTour from "@/components/form/tour/ConfirmDeleteTour";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchTours } from "@/store/features/tourSlice";
import { colors } from "@/constants";

const Tours = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { tours, loading } = useAppSelector((state) => state.tour);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedTour, setSelectedTour] = useState();

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    dispatch(fetchTours());
  }, [dispatch]);

  const columns = [
    {
      name: "Tour",
      selector: (row: any) => row?.name,
      sortable: true,
      wrap: true,
      width: "280px",
    },
    {
      name: "Hình ảnh",
      cell: (row: any) => (
        <Image
          src={row?.imageCover}
          alt="img-tour"
          width={768}
          height={375}
          className="w-24 h-16 object-cover rounded-md"
        />
      ),
    },
    {
      name: "Điểm khởi hành",
      selector: (row: any) => row?.startLocation,
    },
    {
      name: "Giá",
      selector: (row: any) => row?.price,
      cell: (row: any) => (
        <h1>
          <span className="text-primary font-semibold">
            {formatCurrency(row?.price)}
          </span>
          /người
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
          <MdStar color={colors.blue} />
          <span>({row?.ratingsQuantity})</span>
        </div>
      ),
      width: "140px",
      sortable: true,
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
            onClick={() => router.push(`/tours/${row._id}`)}
          />
          <FaEdit
            color={colors.green}
            size={18}
            className="cursor-pointer"
            onClick={() => {
              toggleModal();
              setModalType("update");
              setSelectedTour(row);
            }}
          />
          <FaTrashAlt
            color={colors.red}
            size={16}
            className="cursor-pointer"
            onClick={() => {
              toggleModal();
              setModalType("delete");
              setSelectedTour(row);
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
      <h1 className="font-semibold">Tất cả tour motor</h1>
      <button
        className="px-4 py-2 bg-primary rounded-md text-white mt-2"
        onClick={() => {
          toggleModal();
          setModalType("create");
        }}
      >
        Thêm
      </button>
      <div className="border border-gray-200 rounded-lg mt-4">
        <TableData columns={columns} data={tours} />
      </div>
      {showModal && (
        <Modal toggleModal={toggleModal}>
          {modalType === "create" ? (
            <CreateTourForm toggleModal={toggleModal} />
          ) : modalType === "update" ? (
            <UpdateTourForm toggleModal={toggleModal} tour={selectedTour} />
          ) : (
            <ConfirmDeleteTour toggleModal={toggleModal} tour={selectedTour} />
          )}
        </Modal>
      )}
    </div>
  );
};

export default Tours;
