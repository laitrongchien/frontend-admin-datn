"use client";

import { useState } from "react";
import type { TabProps, TabPanelProps, Tab } from "@/types/tabs";

const Tab: React.FC<TabProps> = ({ label, isActive, onClick }) => {
  return (
    <div
      className={`cursor-pointer py-2 mr-8 ${
        isActive && "border-b-2 border-primary"
      }`}
      onClick={onClick}
    >
      <span className={isActive ? "text-primary" : "text-black"}>{label}</span>
    </div>
  );
};

const TabPanel: React.FC<TabPanelProps> = ({ children, isActive }) => {
  return isActive ? <div className="mt-2">{children}</div> : null;
};

export const Tabs = ({ tabs }: { tabs: Tab[] }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="flex border-b">
        {tabs.map((tab: Tab, index: number) => (
          <Tab
            key={index}
            label={tab.label}
            isActive={index === activeTab}
            onClick={() => setActiveTab(index)}
          />
        ))}
      </div>
      {tabs.map((tab: Tab, index: number) => (
        <TabPanel key={index} isActive={index === activeTab}>
          {tab.content}
        </TabPanel>
      ))}
    </div>
  );
};
