import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

interface Props {
  unit: any;
  handleSubmitUpdate: Function;
  handleDelete: Function;
}

const ItemUnit: React.FC<Props> = ({
  unit,
  handleSubmitUpdate,
  handleDelete,
}) => {
  const [isEdit, setIsEdit] = React.useState<boolean>(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    setValue,
  } = useForm<{
    name: string;
  }>();

  React.useEffect(() => {
    if (!isEdit) return;

    setValue("name", unit.name);
  }, [isEdit, setValue, unit]);

  const onSubmit: SubmitHandler<{ name: string }> = (data) => {
    handleSubmitUpdate(unit._id, { ...data });
    setIsEdit(false);
  };

  const handlePushChapter = (unit_id: string) => {
    navigate(`/instructor/program/${unit_id}/chapter`);
  };

  const handlePushEditChapter = (unit_id: string, chapter_id: string) => {
    navigate(`/instructor/program/${unit_id}/chapter/${chapter_id}`);
  };

  return (
    <Box minH="150px" mb={4} p={2} rounded={"lg"} shadow={"md"}>
      <div></div>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        {isEdit ? (
          <form
            onSubmit={handleSubmitForm(onSubmit)}
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "2em",
              alignItems: "end",
              width: "100%",
            }}
          >
            <FormControl isInvalid={!!errors.name}>
              <FormLabel>Nombre</FormLabel>
              <Input
                {...register("name", {
                  required: {
                    value: true,
                    message: "El nombre es requerido",
                  },
                })}
              />
              {errors.name ? (
                <FormErrorMessage>{errors.name.message}</FormErrorMessage>
              ) : null}
            </FormControl>
            <Box display={"flex"} gap="1">
              <Button onClick={() => setIsEdit(false)} variant={"outline"}>
                Cancelar
              </Button>
              <Button type="submit">Guardar</Button>
            </Box>
          </form>
        ) : (
          <>
            <Text fontSize={"2xl"} fontWeight={"bold"}>
              {unit.name}
            </Text>
            <Box display={"flex"} alignItems={"center"} gap={4}>
              <HiOutlinePencil
                style={{
                  width: "20px",
                  height: "20px",
                  cursor: "pointer",
                }}
                onClick={() => setIsEdit(true)}
              />
              <HiOutlineTrash
                style={{
                  width: "20px",
                  height: "20px",
                  cursor: "pointer",
                }}
                onClick={() => handleDelete(unit._id)}
              />
              <Button onClick={() => handlePushChapter(unit._id)}>
                Agregar Capitulo
              </Button>
            </Box>
          </>
        )}
      </Box>
      {unit.chapters?.length > 0 ? (
        <React.Fragment>
          <Text fontSize={"lg"} fontWeight={"semibold"}>
            Capitulos
          </Text>
          <Box>
            {unit.chapters.map((chapter: any) => (
              <Box
                key={chapter._id}
                display={"flex"}
                gap={"8"}
                alignItems={"center"}
              >
                <p>{chapter.name}</p>
                <HiOutlinePencil
                  style={{
                    width: "20px",
                    height: "20px",
                    cursor: "pointer",
                  }}
                  onClick={() => handlePushEditChapter(unit._id, chapter._id)}
                />
              </Box>
            ))}
          </Box>
        </React.Fragment>
      ) : null}
    </Box>
  );
};

export default ItemUnit;
