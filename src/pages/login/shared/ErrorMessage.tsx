import React from "react";
import { Alert, AlertIcon } from "@chakra-ui/react";

export const ErrorMessage = ({ errorMessage }: { errorMessage: string }) => {
  return (
    <>
      {errorMessage !== "" ? (
        <Alert mt="4" status="error">
          <AlertIcon />
          {errorMessage}
        </Alert>
      ) : null}
    </>
  );
};
