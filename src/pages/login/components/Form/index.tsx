import React, { useState } from "react";
import FormLogin from "./FormLogin";
import FormRegister from "./FormRegister";

export default function Form() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <>
      {isLogin ? (
        <FormLogin setIsLogin={setIsLogin} />
      ) : (
        <FormRegister setIsLogin={setIsLogin} />
      )}
    </>
  );
}
