import React, { ChangeEvent, useState } from "react";
import {
  Alert,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  AlertIcon,
} from "@chakra-ui/react";
import useForm from "../../../../hooks/useForm";
import { IFormLogin } from "../../interfaces";
import useFormLogin from "../../hooks/useFormLogin";
import InputPassword from "../../shared/InputPassword";

export default function FormLogin({
  setIsLogin,
}: {
  setIsLogin: (value: boolean) => void;
}) {
  const { form, handleChange } = useForm<IFormLogin>({
    username: "",
    password: "",
  });

  const { setErrors, errors, handleSubmit, loading, errorMessage } =
    useFormLogin();

  const _handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    handleChange(ev);
    setErrors({
      ...errors,
      [ev.target.name]: "",
    });
  };

  return (
    <form
      onSubmit={(ev) => {
        handleSubmit(ev, form);
      }}
      noValidate
    >
      <Text fontSize="3xl" fontWeight="bold" textAlign="center">
        INICIAR SESIÓN
      </Text>
      <FormControl isRequired mt="2" isInvalid={errors.username !== ""}>
        <FormLabel>Usuario</FormLabel>
        <Input
          name="username"
          size="lg"
          autoFocus
          width="full"
          placeholder="Ejemplo: erikg"
          onChange={_handleChange}
          value={form.username}
        />
        <FormErrorMessage mt="0.5">{errors.username}</FormErrorMessage>
      </FormControl>
      <FormControl isRequired mt="2" isInvalid={errors.password !== ""}>
        <FormLabel>Contraseña</FormLabel>
        <InputPassword
          name="password"
          size="lg"
          width="full"
          placeholder="Ejemplo: ***"
          onChange={_handleChange}
          value={form.password}
          type="password"
        />
        <FormErrorMessage mt="0.5">{errors.password}</FormErrorMessage>
      </FormControl>
      {errorMessage !== "" ? (
        <Alert mt="4" status="error">
          <AlertIcon />
          {errorMessage}
        </Alert>
      ) : null}
      <Box mt="4" display="flex" flexDirection="column" alignItems="center">
        <Button isLoading={loading} type="submit" size="lg">
          INGRESAR
        </Button>
        <Box mt="5" display="flex" gap="2" alignItems="center">
          <Text>¿ No tienes una cuenta ?</Text>
          <Button variant="link" onClick={() => setIsLogin(false)}>
            CREAR CUENTA
          </Button>
        </Box>
      </Box>
    </form>
  );
}
