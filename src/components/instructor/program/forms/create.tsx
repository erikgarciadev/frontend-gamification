import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { UnitProps } from "../../../../types/instructor/unit";

interface Props {
  loading: boolean;
  handleSubmit: Function;
  handleCancel: Function;
}

const FormCreateUnit: React.FC<Props> = ({
  loading,
  handleSubmit,
  ...props
}) => {
  const {
    register,
    handleSubmit: handleSubmitForm,
    formState: { errors },
  } = useForm<UnitProps>();

  const onSubmit: SubmitHandler<UnitProps> = (data) => {
    handleSubmit({ ...data });
  };

  return (
    <form onSubmit={handleSubmitForm(onSubmit)}>
      <FormControl mb="4" isInvalid={!!errors.name}>
        <FormLabel>Nombre</FormLabel>
        <Input
          {...register("name", {
            required: {
              value: true,
              message: "El nombre es requerido",
            },
          })}
        />
        {errors.name ? (
          <FormErrorMessage>{errors.name.message}</FormErrorMessage>
        ) : null}
      </FormControl>

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

export default FormCreateUnit;
