import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import React from "react";
import { FieldErrorsImpl, UseFormRegister } from "react-hook-form";
import { StudentProps } from "../../../../types/instructor/student";
import InputPassword from "../../../../pages/login/shared/InputPassword";

interface Props {
  errors: FieldErrorsImpl<StudentProps>;
  register: UseFormRegister<StudentProps>;
  loading: boolean;
  onSubmit: Function;
  handleSubmit: Function;
  handleCancel: Function;
  isEdit?: boolean;
}

const FormStudent: React.FC<Props> = ({
  loading,
  register,
  errors,
  isEdit = false,
  ...props
}) => {
  return (
    <form onSubmit={props.handleSubmit(props.onSubmit)}>
      {!isEdit ? (
        <Alert my={4} fontWeight={"bold"} status="info">
          <AlertIcon />
          Se le asignará como contraseña 123456
        </Alert>
      ) : null}
      <FormControl mb="4" isInvalid={!!errors.firstname}>
        <FormLabel>Nombre</FormLabel>
        <Input
          {...register("firstname", {
            minLength: {
              value: 6,
              message: "Debe tener minimo 6 caracteres",
            },
          })}
        />
        {errors.firstname ? (
          <FormErrorMessage>{errors.firstname.message}</FormErrorMessage>
        ) : null}
      </FormControl>
      <FormControl mb="4" isInvalid={!!errors.username}>
        <FormLabel>Usuario</FormLabel>
        <Input
          {...register("username", {
            required: "Usuario requerido",
            minLength: {
              value: 6,
              message: "Debe tener minimo 6 caracteres",
            },
          })}
        />
        {errors.username ? (
          <FormErrorMessage>{errors.username.message}</FormErrorMessage>
        ) : null}
      </FormControl>
      {/* {!isEdit ? (
        <FormControl mb="4" isInvalid={!!errors.password}>
          <FormLabel>Contraseña</FormLabel>
          <InputPassword
            {...register("password", {
              required: isEdit ? false : "Contraseña requerido",
              minLength: {
                value: 6,
                message: "Debe tener minimo 6 caracteres",
              },
            })}
          />
          {errors.password ? (
            <FormErrorMessage>{errors.password.message}</FormErrorMessage>
          ) : null}
        </FormControl>
      ) : null} */}

      <Box mt="10" display={"flex"} gap={4} justifyContent={"center"}>
        <Button
          variant={"outline"}
          onClick={() => props.handleCancel()}
          disabled={loading}
        >
          Cancelar
        </Button>
        <Button type="submit" isLoading={loading}>
          Guardar
        </Button>
      </Box>
    </form>
  );
};

export default FormStudent;
