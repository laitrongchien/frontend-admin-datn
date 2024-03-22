import { sidebar_items } from "./sidebar-constants";
import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  return (
    <>
      {sidebar_items.map((item, index) => {
        return <SidebarItem key={index} item={item} />;
      })}
    </>
  );
};

export default Sidebar;
