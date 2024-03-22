import { Roboto } from "next/font/google";
import "./globals.css";
import LayoutProvider from "@/components/layout/context/LayoutContext";
import { AppProvider } from "@/store/provider";
import ToastProvider from "@/components/toast/Toast";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "400"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <AppProvider>
          <LayoutProvider>
            <ToastProvider>{children}</ToastProvider>
          </LayoutProvider>
        </AppProvider>
      </body>
    </html>
  );
}
