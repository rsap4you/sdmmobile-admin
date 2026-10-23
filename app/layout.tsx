import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/scss/style.scss";
import "../styles/scss/style-preset.scss";
import "./global.css";
import LayoutPage from "./layouts/LayoutPage";
import ReduxProvider from "@/redux/redux-provider";
import { ReactQueryProvider } from "@/libs/ReactQueryProvider";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SDM Admin",
  description: "Shree Dhandai Mata Mobile - admin panel",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ReactQueryProvider>
          <ReduxProvider>
            <LayoutPage>{children}</LayoutPage>
          </ReduxProvider>
          <Toaster />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
