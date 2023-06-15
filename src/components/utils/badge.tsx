import { Box } from "@chakra-ui/react";
import React from "react";

interface Props {
  image_url: string;
  name?: string;
}

const Badge: React.FC<Props> = ({ image_url, name }) => {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      className="badge"
      backgroundColor={"#fa8e60"}
      borderColor={"#fa8e60"}
    >
      <Box bg="white" h="100px" overflow={"hidden"} rounded={"full"} w="100px">
        <img
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
            
          }}
          src={image_url}
          alt="image_badge"
        />
      </Box>
    </Box>
  );
};

export default Badge;
