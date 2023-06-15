import { Box, Tooltip, useDisclosure } from "@chakra-ui/react";
import React from "react";

interface Props {
  handleClick: Function;
  children: React.ReactNode;
}

const TooltipIcon: React.FC<Props> = ({ children, handleClick }) => {
  const { isOpen, onOpen, onToggle, onClose } = useDisclosure();

  return (
    <Box
      textAlign={"center"}
      display={"flex"}
      justifyContent={"center"}
      flexDirection={"column"}
      alignItems={"center"}
      onClick={() => {
        onToggle();
        handleClick();
      }}
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
    >
      <Tooltip
        label="COMENZAR"
        hasArrow
        bg="#eba347"
        fontSize={"2xl"}
        color="white"
        rounded="md"
        isOpen={isOpen}
      >
        <Box
          bg="#eba347"
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          h="70px"
          w="70px"
          p={3}
          rounded="full"
          cursor={"pointer"}
          _hover={{
            bg: "#db6666",
          }}
        >
          {children}
        </Box>
      </Tooltip>
    </Box>
  );
};

export default TooltipIcon;
