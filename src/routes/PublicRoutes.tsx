import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

export default function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<div>Aca</div>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
