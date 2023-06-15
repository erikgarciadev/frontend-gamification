import { Alert, AlertIcon, Box, Button, Text } from "@chakra-ui/react";
import React from "react";
import { HiOutlineCheck, HiOutlineX } from "react-icons/hi";

interface Props {
  handleBack: Function;
  data: any;
}

const Feedback: React.FC<Props> = ({ handleBack, data }) => {
  return (
    <Box py={8}>
      <Alert
        fontWeight={"semibold"}
        status={data?.approved ? "success" : "error"}
      >
        <AlertIcon />
        {data?.approved
          ? " Aprobaste, Felicitaciones"
          : "Lo hiciste bien, vuelve a intentar"}
      </Alert>
      {data?.win_badge ? (
        <Alert mt={2} fontWeight={"semibold"} status="warning">
          <AlertIcon />
          Ganaste un logro
        </Alert>
      ) : null}

      <Box>
        {data?.feedback?.map((data: any, i: number) => (
          <Box
            display={"flex"}
            py={3}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Text>Pregunta {i + 1}</Text>
            {data.correct ? (
              <HiOutlineCheck
                style={{
                  color: "green",
                  width: "25px",
                  height: "25px",
                }}
              />
            ) : (
              <HiOutlineX
                style={{
                  color: "red",
                  width: "25px",
                  height: "25px",
                }}
              />
            )}
          </Box>
        ))}
      </Box>
      <Box mt={5} display={"flex"} justifyContent={"center"}>
        <Button onClick={() => handleBack()}>REPETIR EVALUACIÓN</Button>
      </Box>
    </Box>
  );
};

export default Feedback;
