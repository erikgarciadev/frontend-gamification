import { Box, Text, Tooltip } from "@chakra-ui/react";
import React from "react";
import { FaPlay } from "react-icons/fa";
import { HiOutlineLogin, HiUserCircle } from "react-icons/hi";
import { SlBadge } from "react-icons/sl";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../app/hooks";
import { handleLogout } from "../../../redux/authSlice";

const HomeStudent = () => {
  const dispatch = useAppDispatch();
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
      <Box display={"flex"} justifyContent={"center"} flexWrap={"wrap"} gap={8}>
        <Box
          textAlign={"center"}
          display={"flex"}
          justifyContent={"center"}
          flexDirection={"column"}
          alignItems={"center"}
        >
          <Tooltip
            label="COMENZAR"
            hasArrow
            bg="#eba347"
            fontSize={"2xl"}
            color="white"
            rounded="md"
          >
            <Box
              bg="#eba347"
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              h="100px"
              w="100px"
              p={3}
              rounded="full"
              cursor={"pointer"}
              _hover={{
                bg: "#db6666",
              }}
            >
              <Link to="/student/program">
                <Box
                  bg="#eba347"
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  h="100px"
                  w="100px"
                  p={3}
                  rounded="full"
                  cursor={"pointer"}
                  _hover={{
                    bg: "#db6666",
                  }}
                >
                  <FaPlay
                    style={{
                      color: "white",
                      width: "60px",
                      height: "60px",
                    }}
                  />
                </Box>
              </Link>
            </Box>
          </Tooltip>
        </Box>
        <Box
          textAlign={"center"}
          display={"flex"}
          justifyContent={"center"}
          flexDirection={"column"}
          alignItems={"center"}
        >
          <Tooltip
            label="LOGROS"
            hasArrow
            bg="#eba347"
            fontSize={"2xl"}
            color="white"
            rounded="md"
          >
            <Link to="/student/badges">
              <Box
                bg="#eba347"
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                h="100px"
                w="100px"
                p={3}
                rounded="full"
                cursor={"pointer"}
                _hover={{
                  bg: "#db6666",
                }}
              >
                <SlBadge
                  style={{
                    color: "white",
                    width: "60px",
                    height: "60px",
                  }}
                />
              </Box>
            </Link>
          </Tooltip>
        </Box>
        <Box
          textAlign={"center"}
          display={"flex"}
          justifyContent={"center"}
          flexDirection={"column"}
          alignItems={"center"}
        >
          <Link to="/student/profile">
            <Tooltip
              label="PERFIL"
              hasArrow
              bg="#eba347"
              fontSize={"2xl"}
              color="white"
              rounded="md"
            >
              <Box
                bg="#eba347"
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                h="100px"
                w="100px"
                p={3}
                rounded="full"
                cursor={"pointer"}
                _hover={{
                  bg: "#db6666",
                }}
              >
                <HiUserCircle
                  style={{
                    color: "white",
                    width: "60px",
                    height: "60px",
                  }}
                />
              </Box>
            </Tooltip>
          </Link>
        </Box>
        <Box
          textAlign={"center"}
          display={"flex"}
          justifyContent={"center"}
          flexDirection={"column"}
          alignItems={"center"}
          onClick={() => dispatch(handleLogout())}
        >
          <Tooltip
            label="CERRAR SESIÓN"
            hasArrow
            bg="#eba347"
            fontSize={"2xl"}
            color="white"
            rounded="md"
          >
            <Box
              bg="#eba347"
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              h="100px"
              w="100px"
              p={3}
              rounded="full"
              cursor={"pointer"}
              _hover={{
                bg: "#db6666",
              }}
            >
              <HiOutlineLogin
                style={{
                  color: "white",
                  width: "60px",
                  height: "60px",
                }}
              />
            </Box>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
};

export default HomeStudent;
