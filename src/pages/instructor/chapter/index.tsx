import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Radio,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import {
  HiOutlinePencil,
  HiOutlineThumbDown,
  HiOutlineThumbUp,
  HiOutlineTrash,
} from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import ModalTrueOrFalse from "./modals/true_or_false";
import { QUESTION_TYPES } from "../../../utils/constants";
import { Controller, useForm } from "react-hook-form";
import axiosInstance from "../../../config/axiosInstance";
import Editor from "../../../components/utils/editor";
import {
  MdOutlineCheckBox,
  MdOutlineRadioButtonChecked,
  MdOutlineThumbsUpDown,
} from "react-icons/md";

const InstructorChapter = () => {
  const { unit_id, chapter_id } = useParams();

  const [open, setOpen] = React.useState(false);
  const [type, setType] = React.useState<string>("");
  const [questions, setQuestions] = React.useState<any[]>([]);
  const [currentData, setCurrentData] = React.useState<any>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit: handleSubmitForm,
    control,
    setValue,
  } = useForm<{
    name: string;
    information: string;
  }>();

  const getChapter = async () => {
    const res = await axiosInstance.get(`/chapters/${chapter_id}`);
    setValue("name", res.data.name ?? "");
    setValue("information", res.data.information ?? "");
    setQuestions(res.data.questions ?? []);
  };

  React.useEffect(() => {
    if (chapter_id) {
      getChapter();
    }
  }, [chapter_id]);

  const toast = useToast();

  const handleOpen = (type: string) => {
    setType(type);
    setOpen(true);
  };

  const handleEditQuestion = (data: any) => {
    setType(data.type);
    setCurrentData(data);

    setOpen(true);
  };

  const handleSubmitQuestion = (data: any) => {
    if (data.id) {
      const _questions = [...questions];
      const findIndex = _questions.findIndex(
        (question) => question.id === data.id
      );

      _questions[findIndex] = {
        ...data,
      };
      setQuestions([..._questions]);
      handleClose();
      return;
    }
    setQuestions((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        type,
        ...data,
      },
    ]);
    handleClose();
  };

  const handleDeleteQuestion = (id: string) => {
    const filterQuestions = questions.filter((question) => question.id !== id);

    setQuestions([...filterQuestions]);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentData(null);
  };

  const handleSubmit = async (data: any) => {
    try {
      const dataPost = {
        ...data,
        questions,
        resources: [],
        unit_id,
      };
      setLoading(true);
      if (chapter_id) {
        await axiosInstance.put(`/chapters/${chapter_id}`, dataPost);
      } else {
        await axiosInstance.post(`/chapters/${unit_id}`, dataPost);
      }
      setLoading(false);
      toast({
        status: "success",
        isClosable: true,
        title: chapter_id
          ? "Se actualizo correctamente"
          : "Se creo correctamente",
        position: "top-right",
      });
      navigate(-1);
    } catch (error) {
      setLoading(false);
      toast({
        status: "error",
        isClosable: true,
        title: "Ocurrio un error",
        position: "top-right",
      });
    }
  };

  const renderButtonByType = (
    type: string,
    small = false,
    disabled = false
  ) => {
    const icon = () => {
      switch (type) {
        case QUESTION_TYPES.TRUE_OR_FALSE:
          return (
            <MdOutlineThumbsUpDown
              color="white"
              fontSize={small ? "1em" : "1.5em"}
            />
          );
        case QUESTION_TYPES.MULTIPLE:
          return (
            <MdOutlineCheckBox
              color="white"
              fontSize={small ? "1em" : "1.5em"}
            />
          );
        case QUESTION_TYPES.UNIQUE:
          return (
            <MdOutlineRadioButtonChecked
              color="white"
              fontSize={small ? "1em" : "1.5em"}
            />
          );
      }
    };

    return (
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        onClick={() => handleOpen(type)}
        bg="green.400"
        rounded="full"
        p={2}
        w={small ? "30px" : "40px"}
        h={small ? "30px" : "40px"}
        cursor={"pointer"}
        pointerEvents={disabled ? "none" : "auto"}
      >
        {icon()}
      </Box>
    );
  };

  const renderContentQuestion = (data: any) => {
    const valueTrueFalse = data?.is_correct ?? null;
    switch (data.type) {
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
                  width: "20px",
                  height: "20px",
                  color: valueTrueFalse ? "green" : "",
                }}
              />
              <Text fontWeight={"semibold"} fontSize={"md"}>
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
                style={{
                  width: "20px",
                  height: "20px",
                  color: valueTrueFalse === false ? "green" : "",
                }}
              />
              <Text fontWeight={"semibold"} fontSize={"md"}>
                Falso
              </Text>
            </Box>
          </Box>
        );
      case QUESTION_TYPES.MULTIPLE:
      case QUESTION_TYPES.UNIQUE:
        return (
          <Box>
            {data.options.map((option: any) => (
              <Box
                key={option.id}
                role={"group"}
                display={"flex"}
                alignItems={"center"}
                gap={4}
              >
                {QUESTION_TYPES.MULTIPLE === data.type ? (
                  <Checkbox isChecked={option.is_correct} disabled />
                ) : (
                  <Radio isChecked={option.is_correct} disabled />
                )}
                <Text fontSize={"md"}>{option.text ?? ""}</Text>
              </Box>
            ))}
          </Box>
        );
    }
  };
  return (
    <>
      <Box
        w="full"
        h="100vh"
        display={"flex"}
        flexDirection={{
          base: "column",
          md: "row",
        }}
      >
        <Box
          h={{
            base: "auto",
            md: "full",
          }}
          minW={{
            base: "auto",
            md: "400px",
          }}
          w={{
            base: "full",
            md: "400px",
          }}
          boxShadow={{
            base: "none",
            md: "lg",
          }}
          p={4}
        >
          <Text
            fontSize={{
              base: "lg",
              md: "2xl",
            }}
            fontWeight={"semibold"}
            mb="4"
          >
            Crear capitulo
          </Text>
          <FormControl mb="4">
            <FormLabel>Nombre</FormLabel>
            <Input {...register("name")} />
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Instrucciones/Informacion</FormLabel>
            <Box
              h={{
                base: "300px",
                md: "400px",
              }}
              overflow={"auto"}
            >
              <Controller
                name="information"
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => <Editor value={value} setValue={onChange} />}
              />
            </Box>
            {/* <Textarea {...register("information")} resize={"none"} rows={10} /> */}
          </FormControl>
          <Box mt="10" display={"flex"} gap={4} justifyContent={"center"}>
            <Button onClick={() => navigate(-1)} variant="outline">
              CANCELAR
            </Button>
            <Button onClick={handleSubmitForm((d) => handleSubmit(d))}>
              GUARDAR
            </Button>
          </Box>
        </Box>
        <Box
          position={"relative"}
          overflow={{
            base: "initial",
            md: "auto",
          }}
          w="full"
        >
          <Box maxW={"900px"} py={4} px={10} margin="0 auto">
            <Box
              position={"fixed"}
              display={"flex"}
              flexDirection={"column"}
              right={{
                base: "0",
                md: "5",
              }}
              top={{
                base: "80%",
                md: "auto",
              }}
              gap={"0.3em"}
            >
              {renderButtonByType(QUESTION_TYPES.TRUE_OR_FALSE)}
              {renderButtonByType(QUESTION_TYPES.MULTIPLE)}
              {renderButtonByType(QUESTION_TYPES.UNIQUE)}
            </Box>
            <Box display={"flex"} flexWrap={"wrap"} gap={3}>
              <Box display={"flex"} gap={1} alignItems={"center"}>
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  bg="green.400"
                  rounded="full"
                  w="30px"
                  h="30px"
                >
                  <MdOutlineThumbsUpDown color="white" fontSize={"1em"} />
                </Box>
                <Text fontWeight={"semibold"}>Verdadero o Falso</Text>
              </Box>
              <Box display={"flex"} gap={1} alignItems={"center"}>
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  bg="green.400"
                  rounded="full"
                  w="30px"
                  h="30px"
                >
                  <MdOutlineCheckBox color="white" fontSize={"1em"} />
                </Box>
                <Text fontWeight={"semibold"}>Selección múltiple</Text>
              </Box>
              <Box display={"flex"} gap={1} alignItems={"center"}>
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  bg="green.400"
                  rounded="full"
                  w="30px"
                  h="30px"
                >
                  <MdOutlineRadioButtonChecked color="white" fontSize={"1em"} />
                </Box>
                <Text fontWeight={"semibold"}>Selección única</Text>
              </Box>
            </Box>
            <Box>
              {questions.map((question, i) => (
                <Box key={i} boxShadow={"md"} p={4} mt={4} rounded={"lg"}>
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                  >
                    <Box display={"flex"} gap={2}>
                      {renderButtonByType(question.type, true, true)}
                      <Text fontWeight={"semibold"}>Pregunta {i + 1}</Text>
                    </Box>

                    <Box
                      display={"flex"}
                      gap={{
                        base: 1,
                        md: 2,
                      }}
                      alignItems={"center"}
                    >
                      <HiOutlinePencil
                        style={{
                          color: "green",
                          width: "20px",
                          height: "20px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleEditQuestion(question)}
                      />
                      <HiOutlineTrash
                        onClick={() => handleDeleteQuestion(question.id)}
                        style={{
                          color: "red",
                          width: "20px",
                          height: "20px",
                          cursor: "pointer",
                        }}
                      />
                    </Box>
                  </Box>
                  <Box>
                    <Text fontWeight={"semibold"} fontSize={"lg"} my={2}>
                      {question.text}
                    </Text>
                    <Text fontWeight={"semibold"} my={2}>
                      Opciones
                    </Text>
                    {renderContentQuestion(question)}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
      {open ? (
        <ModalTrueOrFalse
          type={type}
          onCloseModal={() => handleClose()}
          open={open}
          handleSubmit={handleSubmitQuestion}
          currentData={currentData}
        />
      ) : null}
    </>
  );
};

export default InstructorChapter;
