import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Checkbox,
  Input,
  Radio,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React from "react";
import { QUESTION_TYPES } from "../../../../utils/constants";
import {
  HiOutlineThumbDown,
  HiOutlineThumbUp,
  HiOutlineTrash,
} from "react-icons/hi";

interface Props {
  open: boolean;
  type: string;
  onCloseModal: () => void;
  handleSubmit: (data: any) => void;
  currentData: any;
}

const ModalTrueOrFalse: React.FC<Props> = ({
  open,
  onCloseModal,
  handleSubmit,
  ...props
}) => {
  const [data, setData] = React.useState<any>(null);
  const [options, setOptions] = React.useState<any[]>([]);
  const cancelRef = React.useRef(null);

  React.useEffect(() => {
    if (props.currentData) {
      const { options: _options, ...rest } = props.currentData;
      setData({
        ...rest,
      });
      setOptions([...(_options ?? [])]);
      return;
    }
    const optionsDefault = [
      {
        id: crypto.randomUUID(),
        is_correct: false,
        text: "",
      },
      {
        id: crypto.randomUUID(),
        is_correct: false,
        text: "",
      },
    ];
    setOptions(optionsDefault);
  }, [props.currentData]);

  const handleChangeTrueFalse = (is_correct: boolean) => {
    setData({
      ...data,
      is_correct,
    });
  };

  const getTitle = () => {
    switch (props.type) {
      case QUESTION_TYPES.TRUE_OR_FALSE:
        return "Verdadero o Falso";
      case QUESTION_TYPES.MULTIPLE:
        return "Selección Múltiple";
      case QUESTION_TYPES.UNIQUE:
        return "Selección Única";
    }
  };

  const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setData({
      ...data,
      text: e.target.value,
    });
  };

  const handleDeleteOption = (id: string) => {
    const filter = options.filter((option) => option.id !== id);

    setOptions([...filter]);
  };

  const handleChangeTextOption = (
    i: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const _options = [...options];
    _options[i].text = e.target.value;

    setOptions([..._options]);
  };

  const handleChangeChechboxOption = (
    i: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = e.target.checked;
    const _options = [...options];
    if (props.type === QUESTION_TYPES.UNIQUE && checked) {
      for (let index = 0; index < _options.length; index++) {
        _options[index].is_correct = false;
      }
    }

    _options[i].is_correct = checked;

    setOptions([..._options]);
  };

  const handleSubmitModal = () => {
    if (props.type === QUESTION_TYPES.TRUE_OR_FALSE) {
      handleSubmit({
        ...data,
      });
    } else {
      handleSubmit({
        ...data,
        options,
      });
    }
  };

  const renderContent = () => {
    const valueTrueFalse = data?.is_correct ?? null;
    switch (props.type) {
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
            {options.map((option, i) => (
              <Box
                key={option.id}
                role={"group"}
                display={"flex"}
                alignItems={"center"}
                gap={4}
              >
                {QUESTION_TYPES.MULTIPLE === props.type ? (
                  <Checkbox
                    isChecked={option.is_correct}
                    onChange={(e) => {
                      handleChangeChechboxOption(i, e);
                    }}
                  />
                ) : (
                  <Radio
                    isChecked={option.is_correct}
                    onChange={(e) => {
                      handleChangeChechboxOption(i, e);
                    }}
                  />
                )}

                <Input
                  onChange={(e) => handleChangeTextOption(i, e)}
                  variant="flushed"
                  w="70%"
                  value={option.text ?? ""}
                />
                <Box
                  display={"none"}
                  _groupHover={{
                    display: "block",
                  }}
                >
                  <HiOutlineTrash
                    style={{
                      width: "25px",
                      height: "25px",
                      color: "red",
                      cursor: "pointer",
                    }}
                    onClick={() => handleDeleteOption(option.id)}
                  />
                </Box>
              </Box>
            ))}
            {options.length >= 4 ? null : (
              <Button
                variant="outline"
                colorScheme="green"
                mt={4}
                onClick={() => {
                  setOptions((prev) => [
                    ...prev,
                    {
                      id: crypto.randomUUID(),
                      is_correct: false,
                      text: "",
                    },
                  ]);
                }}
              >
                AGREGAR OPCIÓN
              </Button>
            )}
          </Box>
        );
    }
  };

  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      onClose={onCloseModal}
      isOpen={open}
      isCentered
      size={"3xl"}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader
            borderBottom={"1px solid black"}
            fontSize="lg"
            fontWeight="bold"
          >
            {getTitle()}
          </AlertDialogHeader>
          <AlertDialogBody maxH={"60vh"} overflow={"auto"}>
            <Textarea
              resize={"none"}
              rows={2}
              placeholder="Escribe el enunciado de su pregunta aqui"
              onChange={handleChangeText}
              value={data?.text ?? ""}
            />
            <Box>
              <Text color="green" mt={4}>
                Opciones
              </Text>
              <Box>{renderContent()}</Box>
            </Box>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onCloseModal}>
              DESCARTAR CAMBIOS
            </Button>
            <Button
              colorScheme="green"
              onClick={() => handleSubmitModal()}
              ml={3}
            >
              GUARDAR CAMBIOS
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default ModalTrueOrFalse;
