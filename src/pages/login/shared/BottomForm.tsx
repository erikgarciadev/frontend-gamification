import React from "react";
import { Box, Button, Text } from "@chakra-ui/react";

export const BottomForm = ({ loading, text, textLink, onClick } : {
    loading: boolean
    text: string
    textLink: string
    onClick: () => void
}) => {
  return (
    <Box mt="4" display="flex" flexDirection="column" alignItems="center">
      <Button isLoading={loading} type="submit" size="lg">
        INICIAR SESIÓN
      </Button>
      {/* <Box mt="5" display="flex" gap="2" alignItems="center">
        <Text>¿ Ya tienes una cuenta ?</Text>
        <Button variant="link" onClick={onClick}>
        REGISTRAR CUENTA
        </Button>
      </Box> */}
    </Box>
  );
};
