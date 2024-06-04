"use client";

import { useEffect, useState } from "react";
import TableData from "@/components/table/TableData";
import Loading from "@/components/Loading";
import Modal from "@/components/Modal";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchLocations } from "@/store/features/locationSlice";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { colors } from "@/constants";
import CreateLocationForm from "@/components/form/location/CreateLocationForm";
import UpdateLocationForm from "@/components/form/location/UpdateLocationForm";
import ConfirmDeleteLocation from "@/components/form/location/ConfirmDeleteLocation";

const Locations = () => {
  const dispatch = useAppDispatch();
  const { locations, loading } = useAppSelector((state) => state.location);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedLocation, setSelectedLocation] = useState();

  useEffect(() => {
    dispatch(fetchLocations());
  }, [dispatch]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const columns = [
    {
      name: "Tên cơ sở",
      selector: (row: any) => row?.name,
      width: "15%",
    },
    {
      name: "Địa chỉ",
      selector: (row: any) => row?.address,
      width: "40%",
    },
    {
      name: "Mô tả",
      selector: (row: any) => row?.description,
      width: "15%",
    },
    {
      name: "Số lượng xe",
      selector: (row: any) => row?.numOfMotorIdentifications,
      center: true,
      width: "15%",
    },
    {
      name: "Hành động",
      center: true,
      cell: (row: any) => (
        <div className="flex items-center gap-2">
          <FaEdit
            color={colors.green}
            size={18}
            className="cursor-pointer"
            onClick={() => {
              toggleModal();
              setModalType("update");
              setSelectedLocation(row);
            }}
          />
          <FaTrashAlt
            color={colors.red}
            size={16}
            className="cursor-pointer"
            onClick={() => {
              toggleModal();
              setModalType("delete");
              setSelectedLocation(row);
            }}
          />
        </div>
      ),
      width: "15%",
    },
  ];

  return (
    <div className="bg-white p-4 min-h-[calc(100vh-80px)] rounded-xl border border-gray-300">
      <h1 className="font-semibold">Địa điểm nhận xe</h1>
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
        <TableData columns={columns} data={locations} />
      </div>
      {showModal && (
        <Modal toggleModal={toggleModal}>
          {modalType === "create" ? (
            <CreateLocationForm toggleModal={toggleModal} />
          ) : modalType === "update" ? (
            <UpdateLocationForm
              toggleModal={toggleModal}
              location={selectedLocation}
            />
          ) : (
            <ConfirmDeleteLocation
              toggleModal={toggleModal}
              location={selectedLocation}
            />
          )}
        </Modal>
      )}
    </div>
  );
};

export default Locations;
