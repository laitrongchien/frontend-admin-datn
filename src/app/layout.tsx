import { Roboto } from "next/font/google";
import Head from "next/head";
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
      <Head>
        <title>Admin Management</title>
        <link rel="icon" href="/icon.ico" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
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
