import { Box } from "@chakra-ui/react";
import Form from "./components/Form";
import React from "react";

export default function Login() {
  return (
    <Box
      h="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgImage={"/images/background.jpg"}
      backgroundRepeat={"no-repeat"}
      backgroundSize={"cover"}
      backgroundPosition={"center"}
    >
      <Box
        display="flex"
        gap={{
          base: "0",
          md: "20",
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
            src="https://static.wikia.nocookie.net/discord/images/0/0d/Clyde_%28sticker%29.svg"
            alt=""
            className="box_float"
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
