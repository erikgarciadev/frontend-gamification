import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { handleLogout } from "../redux/authSlice";

export default function PrivateRoutes() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    let handler = setTimeout(() => {
      // dispatch(handleLogout());
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
