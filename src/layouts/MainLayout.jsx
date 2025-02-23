import React from "react";
import Nav from "@/components/Nav";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";

const MainLayout = () => {
  return (
    <div className="container mx-auto flex justify-center flex-col items-center ">
      <Toaster />
      <Nav />
      <Outlet />
    </div>
  );
};

export default MainLayout;
