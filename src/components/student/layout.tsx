import { Box, Button, Text } from "@chakra-ui/react";
import React from "react";
import { useAppSelector } from "../../app/hooks";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
  activeMaxWidth?: boolean;
}

const LayoutStudent: React.FC<Props> = ({
  children,
  activeMaxWidth = true,
}) => {
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();

  return (
    <>
      <Box as="nav" bg="#1c006e" h="16" px={4} shadow="md">
        <Box
          maxW="1400px"
          h="full"
          display={"flex"}
          alignItems={"center"}
          margin="0 auto"
          justifyContent={"space-between"}
        >
          <Button
            onClick={() => navigate(-1)}
            leftIcon={<HiOutlineArrowLeft />}
          >
            REGRESAR
          </Button>
          <Box display={"flex"} gap={2} alignItems={"center"}>
            <Box
              h="40px"
              w="40px"
              overflow={"hidden"}
              border="2px solid white"
              rounded={"full"}
            >
              <img
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                alt="image_user_avatar"
                src={user?.image_url ?? "/images/user_avatar.png"}
              />
            </Box>
            <Text color="white" fontWeight={"semibold"}>
              {user?.firstname}
            </Text>
          </Box>
        </Box>
      </Box>
      <Box
        style={{
          minHeight: "calc(100vh - 64px)",
        }}
        bg="gray.100"
      >
        <Box h="full" margin="0 auto" maxW={activeMaxWidth ? "1400px" : "full"}>
          {children}
        </Box>
      </Box>
    </>
  );
};

export default LayoutStudent;
