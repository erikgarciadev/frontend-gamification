import { Box } from "@chakra-ui/react";
import Form from "./components/Form";
import React from "react";

export default function Login() {
  return (
    <Box
      h="100vh"
      bg="#f8f7f3"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        display="flex"
        gap={{
          base: "0",
          md: "5",
        }}
        w={{
          base: "100%",
          md: "auto",
        }}
      >
        <Box
          w={{
            base: "0%",
            md: "50%",
          }}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <img
            width="250px"
            height="250px"
            src="https://distok.top/stickers/754103543786504244/754108890559283200.gif"
            alt=""
          />
        </Box>
        <Box
          bg="white"
          minW={{
            base: "auto",
            md: "400px",
          }}
          w={{
            base: "100%",
            md: "50%",
          }}
          p="7"
          boxShadow="lg"
          borderRadius={{
            base: "none",
            md: "lg",
          }}
          h={{
            base: "100vh",
            md: "auto",
          }}
          display={{
            base: "flex",
            md: "auto",
          }}
          flexDirection="column"
          justifyContent="center"
        >
          <Form />
        </Box>
      </Box>
    </Box>
  );
}
