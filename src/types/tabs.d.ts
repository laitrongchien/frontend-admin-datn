export interface TabProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export interface TabPanelProps {
  isActive: boolean;
  children: React.ReactNode;
}

export type Tab = {
  label: string;
  content: React.ReactNode;
};
