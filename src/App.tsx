import React from "react";
import { BrowserRouter } from "react-router-dom";
import { useAppSelector } from "./app/hooks";
import PrivateRoutes from "./routes/PrivateRoutes";
import PublicRoutes from "./routes/PublicRoutes";

function App() {
  const isLogged = useAppSelector((state) => state.auth.isLogged);

  return (
    <BrowserRouter>
      {isLogged ? <PrivateRoutes /> : <PublicRoutes />}
    </BrowserRouter>
  );
}

export default App;
