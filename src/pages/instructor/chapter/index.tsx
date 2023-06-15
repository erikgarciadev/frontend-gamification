import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
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
  } = useForm<{
    name: string;
    information: string;
  }>();

  const getChapter = async () => {
    const res = await axiosInstance.get(`/chapters/${chapter_id}`);
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

  const renderButtonByType = (type: string) => {
    const icon = () => {
      switch (type) {
        case QUESTION_TYPES.TRUE_OR_FALSE:
          return <MdOutlineThumbsUpDown color="white" fontSize={"1.5em"} />;
        case QUESTION_TYPES.MULTIPLE:
          return <MdOutlineCheckBox color="white" fontSize={"1.5em"} />;
        case QUESTION_TYPES.UNIQUE:
          return (
            <MdOutlineRadioButtonChecked color="white" fontSize={"1.5em"} />
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
        w="40px"
        h="40px"
        cursor={"pointer"}
      >
        {icon()}
      </Box>
    );
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
            <Box display={"flex"} flexWrap={"wrap"} gap={2}>
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
                <Box boxShadow={"md"} p={4} mt={4} rounded={"lg"}>
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                  >
                    <Text fontWeight={"semibold"}>Pregunta {i + 1}</Text>
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
