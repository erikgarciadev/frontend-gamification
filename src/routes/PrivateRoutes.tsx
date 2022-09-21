import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

export default function PrivateRoutes() {
  useEffect(() => {
    let handler = setTimeout(() => {
      console.log("test");
    }, 10000);

    return () => clearTimeout(handler);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<div>Private</div>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
