import React, { ChangeEvent } from "react";
import { Input, Text } from "@chakra-ui/react";
import useForm from "../../../../hooks/useForm";
import { IFormLogin } from "../../interfaces";
import useFormLogin from "../../hooks/useFormLogin";
import InputPassword from "../../shared/InputPassword";
import { FormControlRequired } from "../../shared/FormControlRequired";
import { ErrorMessage } from "../../shared/ErrorMessage";
import { BottomForm } from "../../shared/BottomForm";

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
      <FormControlRequired
        errorMessage={errors.username}
        label="Usuario"
        isInvalid={errors.username !== ""}
      >
        <Input
          name="username"
          size="lg"
          autoFocus
          width="full"
          placeholder="Ejemplo: erikg"
          onChange={_handleChange}
          value={form.username}
        />
      </FormControlRequired>
      <FormControlRequired
        label="Contraseña"
        errorMessage={errors.password}
        isInvalid={errors.password !== ""}
      >
        <InputPassword
          name="password"
          size="lg"
          width="full"
          placeholder="Ejemplo: ***"
          onChange={_handleChange}
          value={form.password}
          type="password"
        />
      </FormControlRequired>
      <ErrorMessage errorMessage={errorMessage} />
      <BottomForm
        loading={loading}
        text="¿ No tienes una cuenta ?"
        textLink="CREAR CUENTA"
        onClick={() => setIsLogin(false)}
      />
    </form>
  );
}
