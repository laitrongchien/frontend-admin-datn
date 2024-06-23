"use client";

import { useState, useEffect } from "react";
import { motorIdentificationService } from "@/services/api/identification";
import { rentalService } from "@/services/api/rental";
import { toast } from "react-toastify";
import Loading from "../Loading";

const IdentificationRental = ({
  motorRentalDetailId,
}: {
  motorRentalDetailId: string;
}) => {
  const [motorRentalDetail, setMotorRentalDetail] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [identificationsRental, setIdentificationsRental] = useState<any[]>([]);
  const [availableMotors, setAvailableMotors] = useState([]);

  useEffect(() => {
    if (motorRentalDetailId) {
      const fetchMotorRentalDetail = async () => {
        setLoading(true);
        const res = await rentalService.getMotorbikeRentalById(
          motorRentalDetailId
        );
        setLoading(false);
        setMotorRentalDetail(res.data);
      };
      fetchMotorRentalDetail();
    }
  }, [motorRentalDetailId]);

  useEffect(() => {
    if (motorRentalDetail?.motorbikes[0].identifications) {
      setIdentificationsRental(
        motorRentalDetail?.motorbikes[0].identifications
      );
    }
  }, [motorRentalDetail?.motorbikes]);

  useEffect(() => {
    if (!motorRentalDetail?.motorbikes[0]?.motorbike?._id) {
      return;
    }
    const fetchAllAvailableMotor = async () => {
      const res = await motorIdentificationService.getAllAvailableMotor(
        motorRentalDetail?.motorbikes[0].motorbike._id,
        motorRentalDetail?.location
      );
      setAvailableMotors(res.data);
    };
    fetchAllAvailableMotor();
  }, [motorRentalDetail?.location, motorRentalDetail?.motorbikes]);

  const handleUpdateIdentificationsRental = async () => {
    try {
      await rentalService.updateIdentificationsRental(
        motorRentalDetail._id,
        identificationsRental
      );
      await Promise.all(
        identificationsRental.map(async (identification: string) => {
          await motorIdentificationService.updateMotorIdentification({
            identification,
            isUsed: true,
          });
        })
      );
      toast.success("Cập nhật xe cho thuê thành công");
    } catch (error) {
      console.log(error);
    }
  };

  if (loading)
    return (
      <div className="h-[calc(100vh-80px-36px)]">
        <Loading />
      </div>
    );

  return (
    <>
      <h1 className="mt-4 font-semibold">Biển số xe cho thuê</h1>
      {motorRentalDetail?.motorbikes.map((data: any) => (
        <div key={data._id}>
          <p className="my-2">
            Tên xe: {data.motorbike?.name || data.motorbikeHistory?.name}
          </p>
          {[...Array(data.numMotorbikes)].map((_, index) => (
            <div key={index}>
              <select
                className="w-52 form-input mt-2"
                onChange={(e) => {
                  const newIdentifications = [...identificationsRental];
                  newIdentifications[index] = e.target.value;
                  setIdentificationsRental(newIdentifications);
                }}
              >
                <option disabled selected>
                  Cập nhật xe cho thuê
                </option>
                {availableMotors.map((availableMotor: any) => (
                  <option
                    key={availableMotor.id}
                    value={availableMotor.identification}
                  >
                    {availableMotor.identification}
                  </option>
                ))}
              </select>
            </div>
          ))}
          <button
            className="px-4 py-2 rounded-md text-white bg-primary mt-4"
            onClick={handleUpdateIdentificationsRental}
          >
            Cập nhật
          </button>
        </div>
      ))}
    </>
  );
};

export default IdentificationRental;
