"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { rentalService } from "@/services/api/rental";

const UpdateFee = ({
  motorRentalDetailId,
}: {
  motorRentalDetailId: string;
}) => {
  const [extraFee, setExtraFee] = useState(0);
  const [compensateFee, setCompensateFee] = useState(0);
  const [returnNote, setReturnNote] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // console.log(extraFee, compensateFee, returnNote);
    try {
      await rentalService.updateRentalExtraFee(motorRentalDetailId, {
        extraFee,
        compensateFee,
        returnNote,
      });
      toast.success("Cập nhật tình trạng nhận xe thành công");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className="mt-4" onSubmit={handleSubmit}>
      <h1 className="font-semibold">Thông tin nhận xe</h1>
      <div className="mt-4">
        <p>Phụ phí (nghìn đồng)</p>
        <input
          className="form-input w-96"
          type="number"
          value={extraFee}
          onChange={(e) => setExtraFee(parseInt(e.target.value))}
        />
      </div>
      <div className="mt-4">
        <p>Phí đền bù (nghìn đồng)</p>
        <input
          className="form-input w-96"
          type="number"
          value={compensateFee}
          onChange={(e) => setCompensateFee(parseInt(e.target.value))}
        />
      </div>
      <div className="mt-4">
        <p>Ghi chú nhận xe</p>
        <textarea
          rows={3}
          className="form-input w-96"
          value={returnNote}
          onChange={(e) => setReturnNote(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 rounded-md text-white bg-primary mt-4"
      >
        Lưu
      </button>
    </form>
  );
};

export default UpdateFee;
