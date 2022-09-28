import { useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { useState } from "react";
import axiosInstance from "../../../config/axiosInstance";

import { IFormRegister } from "../interfaces";

export default function useFormRegister() {
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmitRegister = async (form: IFormRegister, setError: any) => {
    const formObject = {
      username: form.username.trim(),
      password: form.password.trim(),
      password_repeat: form.password_repeat.trim(),
      ...(form.gender && {
        gender: form.gender,
      }),
    };

    if (formObject.password !== formObject.password_repeat) {
      setError("password", {
        message: "Deben ser iguales",
      });
      setError("password_repeat", {
        message: "Deben ser iguales",
      });
      return;
    }

    try {
      setLoading(true);
      await axiosInstance.post("/auth/register", formObject);

      toast({
        title: "El usuario fue registrado. Ya puede iniciar sesión",
        position: "top-right",
        isClosable: true,
        status: "success",
      });
      setLoading(false);
      setErrorMessage("");
      return true;
    } catch (error) {
      setLoading(false);
      if (error instanceof AxiosError) {
        const data = error.response?.data;
        if (Object.keys(data?.errors || {}).length > 0) {
          for (const [key, value] of Object.entries(data?.errors)) {
            setError(key, {
              message: value,
            });
          }
          return;
        }

        if (data?.error) {
          setErrorMessage(data.error);
        }
      }
    }
  };
  return {
    loading,
    handleSubmitRegister,
    errorMessage,
  };
}
