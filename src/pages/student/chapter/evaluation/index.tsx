import { Box, Button, Checkbox, Text } from "@chakra-ui/react";
import React from "react";
import {
  HiOutlineArrowLeft,
  HiOutlineArrowRight,
  HiOutlineThumbDown,
  HiOutlineThumbUp,
} from "react-icons/hi";
import { QUESTION_TYPES } from "../../../../utils/constants";

interface Props {
  questions: any[];
  handleSubmit: Function;
  handleBack: Function;
}

const Evaluation: React.FC<Props> = ({
  questions,
  handleSubmit,
  handleBack,
}) => {
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);
  const [copyQuestions, setCopyQuestions] = React.useState<any[]>([]);

  React.useEffect(() => {
    setCopyQuestions([...questions]);

    return () => {
      setCopyQuestions([]);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNext = () => setCurrentIndex((prev) => prev + 1);

  const handlePrev = () => setCurrentIndex((prev) => prev - 1);

  const data = copyQuestions[currentIndex] ?? null;

  const handleChangeTrueFalse = (is_correct: boolean) => {
    const _questions = [...copyQuestions];

    _questions[currentIndex].user_select = is_correct;

    setCopyQuestions([..._questions]);
  };

  const getTitle = () => {
    if (!data) return null;
    const { type } = data;
    switch (type) {
      case QUESTION_TYPES.TRUE_OR_FALSE:
        return "Verdadero o Falso";
      case QUESTION_TYPES.MULTIPLE:
        return "Selección Múltiple";
      case QUESTION_TYPES.UNIQUE:
        return "Selección Única";
    }
  };

  const handleChangeChechboxOption = (
    i: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const _questions = [...copyQuestions];
    const question = copyQuestions[currentIndex];
    const options = question.options;
    const checked = e.target.checked;
    const _options = [...options];
    if (question.type === QUESTION_TYPES.UNIQUE && checked) {
      for (let index = 0; index < _options.length; index++) {
        _options[index].user_select = false;
      }
    }

    _options[i].user_select = checked;

    _questions[currentIndex].options = [..._options];

    setCopyQuestions([..._questions]);
  };

  const handleSubmitEvaluation = () => {
    handleSubmit(copyQuestions);
  };

  const renderContent = () => {
    const valueTrueFalse = data?.user_select ?? null;
    const type = data?.type;
    const options = data?.options ?? [];

    switch (type) {
      case QUESTION_TYPES.TRUE_OR_FALSE:
        return (
          <Box
            display={"flex"}
            gap={20}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <HiOutlineThumbUp
                style={{
                  width: "25px",
                  height: "25px",
                  cursor: "pointer",
                  color: valueTrueFalse ? "green" : "",
                }}
                onClick={() => handleChangeTrueFalse(true)}
              />
              <Text fontWeight={"semibold"} fontSize={"lg"}>
                Verdadero
              </Text>
            </Box>
            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <HiOutlineThumbDown
                onClick={() => handleChangeTrueFalse(false)}
                style={{
                  width: "25px",
                  height: "25px",
                  cursor: "pointer",
                  color: valueTrueFalse === false ? "green" : "",
                }}
              />
              <Text fontWeight={"semibold"} fontSize={"lg"}>
                Falso
              </Text>
            </Box>
          </Box>
        );
      case QUESTION_TYPES.MULTIPLE:
      case QUESTION_TYPES.UNIQUE:
        return (
          <Box>
            {options.map((option: any, i: number) => (
              <Box
                key={option.id}
                role={"group"}
                display={"flex"}
                alignItems={"center"}
                gap={4}
              >
                <Checkbox
                  isChecked={option?.user_select ?? false}
                  onChange={(e) => {
                    handleChangeChechboxOption(i, e);
                  }}
                />
                <Text fontWeight={"semibold"} fontSize="lg">
                  {option.text}
                </Text>
              </Box>
            ))}
          </Box>
        );
    }
  };

  const renderButtons = () => {
    if (currentIndex === 0) {
      return (
        <Box display={"flex"} justifyContent={"space-between"}>
          <div></div>
          <Button
            onClick={handleNext}
            bg="white"
            rightIcon={<HiOutlineArrowRight />}
          >
            SIGUIENTE
          </Button>
        </Box>
      );
    }

    if (currentIndex === questions.length - 1) {
      return (
        <Box display={"flex"} justifyContent={"space-between"}>
          <Button
            onClick={handlePrev}
            bg="white"
            leftIcon={<HiOutlineArrowLeft />}
          >
            ANTERIOR
          </Button>
          <Button onClick={handleSubmitEvaluation} color="white" bg="green">
            FINALIZAR
          </Button>
        </Box>
      );
    }

    return (
      <Box display={"flex"} justifyContent={"space-between"}>
        <Button
          onClick={handlePrev}
          bg="white"
          leftIcon={<HiOutlineArrowLeft />}
        >
          ANTERIOR
        </Button>
        <Button
          onClick={handleNext}
          bg="white"
          rightIcon={<HiOutlineArrowRight />}
        >
          SIGUIENTE
        </Button>
      </Box>
    );
  };

  return (
    <Box py={8}>
      <Button
        onClick={() => handleBack()}
        bg="white"
        leftIcon={<HiOutlineArrowLeft />}
      >
        CANCELAR
      </Button>
      <Box py={10}>
        <Text mb={2} fontWeight={"semibold"} fontSize={"xl"}>
          {getTitle()}
        </Text>
        <Text mb={2} fontWeight={"medium"} color="gray.600" fontSize={"lg"}>
          {data?.text}
        </Text>
        {renderContent()}
      </Box>
      {renderButtons()}
    </Box>
  );
};

export default Evaluation;
