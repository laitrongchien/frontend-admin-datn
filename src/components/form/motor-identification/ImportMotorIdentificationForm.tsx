"use client";

import { useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import Papa from "papaparse";
import { importMotorIdentification } from "@/store/features/motorIdentificationSlice";
import { toast } from "react-toastify";

const ImportMotorIdentificationForm = ({
  toggleModal,
}: {
  toggleModal: () => void;
}) => {
  const [importData, setImportData] = useState([]);
  const dispatch = useAppDispatch();

  const handleChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        complete: (results: any) => {
          // console.log(results.data);
          setImportData(results.data);
        },
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,
      });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await dispatch(importMotorIdentification(importData)).unwrap();
      toast.success("Thêm dữ liệu từ file thành công");
      toggleModal();
    } catch (error) {
      toast.error("Có lỗi xảy ra");
    }
  };

  return (
    <div className="w-[400px] p-4">
      <h1 className="text-lg border-b border-gray-200 text-center">
        Thêm xe từ file
      </h1>
      <form className="mt-8" onSubmit={handleSubmit}>
        <input
          name="fileUpload"
          id="fileUpload"
          type="file"
          required
          onChange={handleChange}
        />
        <div className="flex justify-end gap-4">
          <button
            type="submit"
            className={`mt-6 mb-2 py-2 px-6 rounded-md bg-primary text-white
            `}
          >
            Nhập dữ liệu
          </button>
          <button
            type="button"
            onClick={toggleModal}
            className="mt-6 mb-2 py-2 px-6 rounded-md bg-gray-200"
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
};

export default ImportMotorIdentificationForm;
