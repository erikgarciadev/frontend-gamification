import React from "react";
import LayoutStudent from "../../../components/student/layout";
import { Box } from "@chakra-ui/react";
import axiosInstance from "../../../config/axiosInstance";
import { useNavigate } from "react-router-dom";

const UnitsPage = () => {
  const [units, setUnits] = React.useState([]);

  const navigate = useNavigate();

  const getUnits = async () => {
    const res = await axiosInstance.get("/units/all/simple");
    setUnits(res.data);
  };

  React.useEffect(() => {
    getUnits();
  }, []);

  const handlePush = (unit_id: string) => {
    navigate(`/student/program/${unit_id}`);
  };

  return (
    <LayoutStudent activeMaxWidth={false}>
      <Box
        style={{
          height: "calc(100vh - 64px)",
        }}
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgImage={"/images/background.jpg"}
        backgroundRepeat={"no-repeat"}
        backgroundSize={"cover"}
        backgroundPosition={"center"}
      >
        <Box
          display={"flex"}
          justifyContent={"center"}
          flexWrap={"wrap"}
          gap={8}
        >
          {units.map((unit: any) => (
            <Box
              textAlign={"center"}
              display={"flex"}
              justifyContent={"center"}
              flexDirection={"column"}
              alignItems={"center"}
            >
              <Box
                bg="#eba347"
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                h="130px"
                w="130px"
                p={3}
                rounded="full"
                cursor={"pointer"}
                _hover={{
                  bg: "#db6666",
                }}
                onClick={() => handlePush(unit._id)}
              >
                <Box
                  bg="#eba347"
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  p={4}
                  rounded="full"
                  cursor={"pointer"}
                  _hover={{
                    bg: "#db6666",
                  }}
                  color="white"
                  fontSize={"2xl"}
                  fontWeight={"bold"}
                >
                  {unit.name}
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </LayoutStudent>
  );
};

export default UnitsPage;
