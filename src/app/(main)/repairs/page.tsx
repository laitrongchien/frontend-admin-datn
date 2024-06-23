import { Tabs } from "@/components/Tabs";
import ListMaintainRepair from "@/components/repairs/ListMaintainRepair";
import MaintainSchedule from "@/components/repairs/MaintainSchedule";

const MaintainRepairDetail = () => {
  const tabs = [
    {
      label: "Danh sách bảo dưỡng, sửa chữa",
      content: <ListMaintainRepair />,
    },
    {
      label: "Cài đặt lịch bảo dưỡng",
      content: <MaintainSchedule />,
    },
  ];

  return (
    <div className="bg-white py-4 px-4 min-h-[calc(100vh-80px)] rounded-xl shadow-md border border-gray-200">
      <Tabs tabs={tabs} />
    </div>
  );
};

export default MaintainRepairDetail;
