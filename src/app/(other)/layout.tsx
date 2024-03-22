import { Metadata } from "next";

interface SimpleLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Admin Authentication",
  description: "Admin Authentication",
};

export default function SimpleLayout({ children }: SimpleLayoutProps) {
  return <>{children}</>;
}
