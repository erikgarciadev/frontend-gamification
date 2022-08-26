import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

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
      <Route path="/test" element={<div>Test</div>} />
    </Routes>
  );
}
