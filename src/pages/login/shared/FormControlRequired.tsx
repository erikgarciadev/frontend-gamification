import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";
import React, { ReactNode } from "react";

export const FormControlRequired = ({
  children,
  isInvalid,
  errorMessage,
  label,
}: {
  children: ReactNode | ReactNode[];
  isInvalid: boolean;
  errorMessage: string | undefined;
  label: string;
}) => {
  return (
    <FormControl mt="2" isRequired isInvalid={isInvalid}>
      <FormLabel>{label}</FormLabel>
      {children}
      <FormErrorMessage mt="0.5">{errorMessage || ""}</FormErrorMessage>
    </FormControl>
  );
};
