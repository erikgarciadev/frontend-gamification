import {
  Box,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { UpdatePasswordProps } from "../../../../types/student/home";
import InputPassword from "../../../../pages/login/shared/InputPassword";
import axiosInstance from "../../../../config/axiosInstance";
import { useAppSelector } from "../../../../app/hooks";

const FormUpdatePassword = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const {
    register,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    setError,
  } = useForm<UpdatePasswordProps>();

  const user = useAppSelector((state) => state.auth.user);

  const onSubmit: SubmitHandler<UpdatePasswordProps> = async (data) => {
    if (data.password !== data.repeat_password) {
      setError("password", {
        message: "Las contraseñas no son iguales",
      });
      return;
    }

    try {
      setLoading(true);

      await axiosInstance.put(`/students/${user?._id}`, {
        password: data.password,
      });

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmitForm(onSubmit)}>
      <FormControl mb="4" isInvalid={!!errors.password}>
        <FormLabel>Contraseña</FormLabel>
        <InputPassword
          {...register("password", {
            required: {
              value: true,
              message: "La contraseña es requerida",
            },
          })}
        />
        {errors.password ? (
          <FormErrorMessage>{errors.password.message}</FormErrorMessage>
        ) : null}
      </FormControl>
      <FormControl mb="4" isInvalid={!!errors.repeat_password}>
        <FormLabel>Repetir contraseña</FormLabel>
        <InputPassword
          {...register("repeat_password", {
            required: {
              value: true,
              message: "Es requerido volver a escribir la contraseña",
            },
          })}
        />
        {errors.repeat_password ? (
          <FormErrorMessage>{errors.repeat_password.message}</FormErrorMessage>
        ) : null}
      </FormControl>
      <Box mt="5" display={"flex"} gap={4} justifyContent={"center"}>
        <Button type="submit" isLoading={loading}>
          Actualizar
        </Button>
      </Box>
    </form>
  );
};

export default FormUpdatePassword;
