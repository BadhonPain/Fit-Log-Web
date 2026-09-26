"use client";

import React from "react";
import { PlanProvider } from "../context/PlanContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ClientProviders({ children }) {
  return (
    <PlanProvider>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastStyle={{
          backgroundColor: "#18181b",
          color: "#ffffff",
          border: "1px solid #27272a",
          borderRadius: "0.75rem",
        }}
      />
    </PlanProvider>
  );
}
