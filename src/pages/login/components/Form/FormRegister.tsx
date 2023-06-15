import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Text,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import InputPassword from "../../shared/InputPassword";
import { useForm, Controller } from "react-hook-form";
import { IFormRegister } from "../../interfaces";
import useFormRegister from "../../hooks/useFormRegister";
import { FormControlRequired } from "../../shared/FormControlRequired";
import { ErrorMessage } from "../../shared/ErrorMessage";
import { BottomForm } from "../../shared/BottomForm";

const objectValidation = {
  required: {
    value: true,
    message: "Requerido",
  },
  minLength: {
    value: 6,
    message: "Minimo 6 caracteres",
  },
};

export default function FormRegister({
  setIsLogin,
}: {
  setIsLogin: (value: boolean) => void;
}) {
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<IFormRegister>({
    defaultValues: {
      username: "",
      password: "",
      password_repeat: "",
      gender: null,
      name: "",
    },
  });

  const { handleSubmitRegister, loading, errorMessage } = useFormRegister();

  const onSubmit = async (data: IFormRegister) => {
    const result = await handleSubmitRegister(data, setError);
    if (result) {
      setIsLogin(true);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Text fontSize="3xl" fontWeight="bold" textAlign="center">
        CREAR CUENTA
      </Text>
      <FormControl mt="2">
        <FormLabel>Nombre</FormLabel>
        <Input
          size="lg"
          autoFocus
          width="full"
          placeholder="Ejemplo: erikg"
          {...register("name")}
        />
      </FormControl>
      <FormControl mt="2">
        <FormLabel>Género</FormLabel>
        <Controller
          name="gender"
          control={control}
          render={({ field }: { field: any }) => (
            <RadioGroup {...field}>
              <Stack justifyContent="center" gap="2em" direction="row">
                <Radio size="lg" value="M">
                  Hombre
                </Radio>
                <Radio size="lg" value="F">
                  Mujer
                </Radio>
              </Stack>
            </RadioGroup>
          )}
        />
      </FormControl>
      <FormControlRequired
        errorMessage={errors?.username?.message}
        isInvalid={(errors.username?.message || "") !== ""}
        label="Usuario"
      >
        <Input
          size="lg"
          width="full"
          placeholder="Ejemplo: erikg"
          {...register("username", objectValidation)}
        />
      </FormControlRequired>
      <FormControlRequired
        label="Contraseña"
        errorMessage={errors?.password?.message}
        isInvalid={(errors?.password?.message || "") !== ""}
      >
        <InputPassword
          size="lg"
          width="full"
          placeholder="Ejemplo: ***"
          register={register("password", objectValidation)}
        />
      </FormControlRequired>
      <FormControlRequired
        label="Repetir Contraseña"
        errorMessage={errors?.password_repeat?.message}
        isInvalid={(errors?.password_repeat?.message || "") !== ""}
      >
        <InputPassword
          size="lg"
          width="full"
          placeholder="Ejemplo: ***"
          register={register("password_repeat", objectValidation)}
        />
      </FormControlRequired>
      <ErrorMessage errorMessage={errorMessage} />
      <BottomForm
        loading={loading}
        text="¿ Ya tienes una cuenta ?"
        textLink="INICIAR SESIÓN"
        onClick={() => setIsLogin(true)}
      />
    </form>
  );
}
