import React from "react";
import { BrowserRouter } from "react-router-dom";
import PrivateRoutes from "./routes/PrivateRoutes";
import PublicRoutes from "./routes/PublicRoutes";

function App() {
  const isPrivate = !!localStorage.getItem("token");
  return (
    <BrowserRouter>
      {isPrivate ? <PrivateRoutes /> : <PublicRoutes />}
    </BrowserRouter>
  );
}

export default App;
