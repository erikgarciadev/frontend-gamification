import {
  Box,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { UpdateProfileProps } from "../../../../types/student/home";
import { useAppSelector } from "../../../../app/hooks";
import axiosInstance from "../../../../config/axiosInstance";
import { useAppDispatch } from "../../../../app/hooks";
import { handleUpdate } from "../../../../redux/authSlice";
import { HiOutlineCamera, HiOutlineTrash } from "react-icons/hi";
import {
  UPLOAD_ENPOINT_CLOUDINARY,
  UPLOAD_PRESET,
} from "../../../../config/constants";
import axios from "axios";

const FormUpdateProfile = () => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [loaderImage, setLoaderImage] = React.useState<boolean>(false);
  const [imageUser, setImageUser] = React.useState<string | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const {
    register,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    setValue,
  } = useForm<UpdateProfileProps>();

  const toast = useToast();

  React.useEffect(() => {
    setValue("username", user?.username ?? "");
    setValue("firstname", user?.firstname ?? "");
    setImageUser(user?.image_url ?? null);
  }, [user, setValue]);

  const onSubmit: SubmitHandler<UpdateProfileProps> = async (data) => {
    try {
      setLoading(true);
      const res = await axiosInstance.put(`/students/${user?._id}`, data);

      dispatch(
        handleUpdate({
          user: {
            ...user,
            ...res.data.data.user,
            image_url: imageUser ?? null,
          },
        })
      );
      toast({
        status: "success",
        isClosable: true,
        title: "Se actualizo el perfil",
        position: "top-right",
      });
      setLoading(false);
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

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const image = e.target.files[0];
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", UPLOAD_PRESET!);
      try {
        setLoaderImage(true);
        const res = await axios.post(UPLOAD_ENPOINT_CLOUDINARY, data);

        setImageUser(res.data?.url ?? null);
        setLoaderImage(false);

        if (inputRef?.current) {
          inputRef.current.value = "";
        }
        toast({
          status: "success",
          isClosable: true,
          title: "Se subio la imagen con éxito",
          position: "top-right",
        });
      } catch (error) {
        setLoaderImage(false);
        toast({
          status: "error",
          isClosable: true,
          title: "Ocurrio un error al subir la imagen",
          position: "top-right",
        });
      }
    }
  };

  const renderIcon = () => {
    if (imageUser) {
      return (
        <HiOutlineTrash
          style={{
            width: "25px",
            height: "25px",
            cursor: "pointer",
          }}
          color="black"
          onClick={() => setImageUser(null)}
        />
      );
    }

    return (
      <HiOutlineCamera
        style={{
          height: "25px",
          width: "25px",
          cursor: "pointer",
        }}
        color="black"
        onClick={() => inputRef?.current?.click()}
      />
    );
  };

  return (
    <>
      <input
        style={{
          display: "none",
        }}
        type="file"
        ref={inputRef}
        accept="image/png, image/jpeg"
        onChange={handleUploadImage}
      />
      <form onSubmit={handleSubmitForm(onSubmit)}>
        <Box
          display={"flex"}
          justifyContent={"center"}
          my="4"
          alignItems={"center"}
          position={"relative"}
        >
          <Box
            h="150px"
            w="150px"
            rounded={"full"}
            border="2px solid"
            overflow={"hidden"}
            position={"relative"}
            role="group"
          >
            <img
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
              }}
              alt="user_image"
              src={imageUser ?? "/images/user_avatar.png"}
            />
          </Box>
          <Box
            position={"absolute"}
            display={"flex"}
            justifyContent={"end"}
            alignItems={"center"}
            w="full"
            h="full"
          >
            {loaderImage ? <Spinner /> : <>{renderIcon()}</>}
          </Box>
        </Box>

        <FormControl mb="4" isInvalid={!!errors.username}>
          <FormLabel>Usuario</FormLabel>
          <Input
            {...register("username", {
              required: {
                value: true,
                message: "La contraseña es requerida",
              },
            })}
          />
          {errors.username ? (
            <FormErrorMessage>{errors.username.message}</FormErrorMessage>
          ) : null}
        </FormControl>
        <FormControl mb="4" isInvalid={!!errors.firstname}>
          <FormLabel>Nombre</FormLabel>
          <Input
            {...register("firstname", {
              required: {
                value: true,
                message: "Es requerido volver a escribir la contraseña",
              },
            })}
          />
          {errors.firstname ? (
            <FormErrorMessage>{errors.firstname.message}</FormErrorMessage>
          ) : null}
        </FormControl>
        <Box mt="5" display={"flex"} gap={4} justifyContent={"center"}>
          <Button type="submit" isLoading={loading}>
            Actualizar
          </Button>
        </Box>
      </form>
    </>
  );
};

export default FormUpdateProfile;
