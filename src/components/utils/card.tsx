import { Box } from "@chakra-ui/react";
import React from "react";
interface Props {
  image_url: string;
  name?: string;
}

const CardGift: React.FC<Props> = ({ image_url, name }) => {
  return (
    <Box
      className="card"
      style={{
        backgroundImage: `url(${image_url})`,
        width: "100%",
        height: "300px",
      }}
      boxShadow={"lg"}
    ></Box>
  );
};

export default CardGift;
