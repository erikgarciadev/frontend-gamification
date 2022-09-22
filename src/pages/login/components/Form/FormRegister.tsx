import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import useForm from "../../../../hooks/useForm";

export default function FormRegister({
  setIsLogin,
}: {
  setIsLogin: (value: boolean) => void;
}) {
  return (
    <form>
      <Text fontSize="3xl" fontWeight="bold" textAlign="center">
        CREAR CUENTA
      </Text>
      <FormControl mt="2">
        <FormLabel>Nombre</FormLabel>
        <Input size="lg" autoFocus width="full" placeholder="Ejemplo: erikg" />
      </FormControl>
      <FormControl mt="2" isRequired>
        <FormLabel>Usuario</FormLabel>
        <Input size="lg" width="full" placeholder="Ejemplo: erikg" />
      </FormControl>
      <FormControl mt="2" isRequired>
        <FormLabel>Contraseña</FormLabel>
        <Input size="lg" width="full" placeholder="Ejemplo: ***" />
      </FormControl>
      <FormControl mt="2" isRequired>
        <FormLabel>Repetir Contraseña</FormLabel>
        <Input size="lg" width="full" placeholder="Ejemplo: ***" />
      </FormControl>
      <Box mt="4" display="flex" flexDirection="column" alignItems="center">
        <Button type="submit" size="lg">
          REGISTRAR CUENTA
        </Button>
        <Box mt="5" display="flex" gap="2" alignItems="center">
          <Text>¿ Ya tienes una cuenta ?</Text>
          <Button variant="link" onClick={() => setIsLogin(true)}>
            INICIAR SESIÓN
          </Button>
        </Box>
      </Box>
    </form>
  );
}
