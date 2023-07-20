import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../layouts/frontend/Navbar";

const FrontendLayout = () => {
  return (
    <div className="">
      <Navbar />
      <div>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default FrontendLayout;
