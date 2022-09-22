import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/login";

export default function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
