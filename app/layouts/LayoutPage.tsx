"use client";
import React, { useEffect, ReactNode, FC } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Layout from "./Layout";

const LayoutPage: FC<{ children: ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated } = useSelector((state: any) => state.auth);
  const isLoginPage = pathname === "/";

  useEffect(() => {
    if (!isAuthenticated && !isLoginPage) router.replace("/");
    if (isAuthenticated && isLoginPage) router.replace("/dashboard");
  }, [isAuthenticated, isLoginPage, router]);

  if (isLoginPage) return <div>{children}</div>;
  if (isAuthenticated) return <Layout>{children}</Layout>;
  return null;
};

export default LayoutPage;
