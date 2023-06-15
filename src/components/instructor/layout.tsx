import { Box } from "@chakra-ui/react";
import React from "react";
import { HiOutlineUsers, HiOutlineLogin } from "react-icons/hi";
import { useAppDispatch } from "../../app/hooks";
import { handleLogout } from "../../redux/authSlice";
import { Link } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const LayoutInstructor: React.FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();

  const handleLogoutInstructor = () => {
    dispatch(handleLogout());
  };

  return (
    <div>
      <Box bg="#1c006e" h="16"></Box>
      <Box
        style={{
          height: "calc(100vh - 64px)",
        }}
        display={"flex"}
      >
        <Box color="white" bg="#1c006e" w="120px">
          <Link to="/instructor">
            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              py="6"
              cursor={"pointer"}
              textAlign={"center"}
            >
              <HiOutlineUsers
                style={{
                  width: "20px",
                  height: "20px",
                }}
              />
              Estudiantes
            </Box>
          </Link>
          <Link to="/instructor/program">
            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              py="6"
              cursor={"pointer"}
              textAlign={"center"}
            >
              <HiOutlineUsers
                style={{
                  width: "20px",
                  height: "20px",
                }}
              />
              Unidades
            </Box>
          </Link>

          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            py="6"
            cursor={"pointer"}
            onClick={handleLogoutInstructor}
            textAlign={"center"}
          >
            <HiOutlineLogin
              style={{
                width: "20px",
                height: "20px",
              }}
            />
            Cerrar sesión
          </Box>
        </Box>
        <Box
          bg="white"
          w="full"
          h="full"
          p={{
            base: 3,
            md: 10,
          }}
        >
          {children}
        </Box>
      </Box>
    </div>
  );
};

export default LayoutInstructor;
