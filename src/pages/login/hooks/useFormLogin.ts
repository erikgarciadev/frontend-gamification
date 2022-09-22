import { AxiosError } from "axios";
import React, { FormEvent, useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import axiosInstance from "../../../config/axiosInstance";
import { IUser } from "../../../interfaces/user.interface";
import { handleLogin } from "../../../redux/authSlice";
import { IFormLogin } from "../interfaces";

export default function useFormLogin() {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState<IFormLogin>({
    username: "",
    password: "",
  });
  const isValid = (form: IFormLogin) => {
    let _errors = {};
    for (const [key, value] of Object.entries(form)) {
      if (!value) {
        _errors = {
          ..._errors,
          [key]: "Requerido",
        };
      }
    }

    setErrors({
      ...errors,
      ..._errors,
    });

    return Object.keys(_errors).length === 0;
  };

  const handleSubmit = async (
    ev: FormEvent<HTMLFormElement>,
    form: IFormLogin
  ) => {
    ev.preventDefault();

    const formObject = {
      username: form.username,
      password: form.password,
    };

    if (!isValid(formObject)) return;
    try {
      setLoading(true);
      const res = await axiosInstance.post<{
        user: IUser;
        token: string;
      }>("/auth/login", formObject);
      dispatch(
        handleLogin({
          user: res.data.user,
          token: res.data.token,
        })
      );
      setLoading(false);
      setErrorMessage("");
    } catch (error) {
      setLoading(false);
      if (error instanceof AxiosError) {
        const data = error.response?.data;
        if (Object.keys(data?.errors || {}).length > 0) {
          setErrors({
            ...errors,
            ...data?.errors,
          });
          return;
        }

        if (data?.error) {
          setErrorMessage(data.error);
        }
      }
    }
  };
  return {
    errors,
    setErrors,
    loading,
    handleSubmit,
    errorMessage,
  };
}
