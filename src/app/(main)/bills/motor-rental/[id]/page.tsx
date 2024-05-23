import Link from "next/link";
import { MdArrowBackIos } from "react-icons/md";
import { Tabs } from "@/components/Tabs";
import RentalDetail from "@/components/rental/RentalDetail";
import IdentificationRental from "@/components/rental/IdentificationRental";
import UpdateFee from "@/components/rental/UpdateFee";

const MotorRentalDetail = ({ params }: { params: { id: string } }) => {
  const motorRentalDetailId = params.id;

  const tabs = [
    {
      label: "Chi tiết",
      content: <RentalDetail motorRentalDetailId={motorRentalDetailId} />,
    },
    {
      label: "Biển số cho thuê",
      content: (
        <IdentificationRental motorRentalDetailId={motorRentalDetailId} />
      ),
    },
    {
      label: "Cập nhật nhận xe",
      content: <UpdateFee motorRentalDetailId={motorRentalDetailId} />,
    },
  ];

  return (
    <div className="bg-white py-4 px-8 min-h-[calc(100vh-80px)] rounded-xl shadow-md border border-gray-200">
      <Link href={"/bills/motor-rental"} className="flex items-center gap-2">
        <MdArrowBackIos />
        <span>Quay lại</span>
      </Link>
      <Tabs tabs={tabs} />
    </div>
  );
};

export default MotorRentalDetail;
