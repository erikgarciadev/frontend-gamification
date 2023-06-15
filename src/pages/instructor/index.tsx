import React from "react";
import LayoutInstructor from "../../components/instructor/layout";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import TableStudents from "../../components/instructor/students/table";
import DrawerCustom from "../../components/utils/drawer";
import FormCreateStudent from "../../components/instructor/students/forms/create";
import axiosInstance from "../../config/axiosInstance";
import useDebounce from "../../hooks/useDebounce";
import { StudentProps } from "../../types/instructor/student";
import { HiOutlineUserAdd } from "react-icons/hi";
import FormEditStudent from "../../components/instructor/students/forms/edit";

const InstructorPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();
  const [students, setStudents] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [search, setSearch] = React.useState<string>("");
  const [currentStudent, setCurrentStudent] = React.useState<any>(null);
  const cancelRef = React.useRef(null);

  const searchDebounce = useDebounce(search);

  React.useEffect(() => {
    getStudents(searchDebounce);
  }, [searchDebounce]);

  const getStudents = async (search = "") => {
    const res = await axiosInstance.get(`/students?search=${search}`);
    setStudents(res.data);
  };

  const handleSubmit = async (data: StudentProps) => {
    try {
      setLoading(true);
      const res = await axiosInstance.post("/students", data);
      setLoading(false);
      console.log(res);
      onClose();
      await getStudents(search);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleSubmitUpdate = async (data: StudentProps) => {
    try {
      setLoading(true);
      await axiosInstance.put(`/students/${currentStudent._id}`, data);
      setLoading(false);
      onClose();
      await getStudents(search);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await axiosInstance.delete(`/students/${currentStudent._id}`);
      setLoading(false);
      onCloseModal();
      await getStudents(search);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleCurrentStudent = (student: any) => {
    setCurrentStudent(student);
    onOpen();
  };

  const handleOpenDelete = (student: any) => {
    setCurrentStudent(student);
    onOpenModal();
  };

  const handleOpen = () => {
    setCurrentStudent(null);
    onOpen();
  };

  return (
    <LayoutInstructor>
      <Box>
        <Box
          display={"flex"}
          flexDirection={{
            base: "row",
          }}
          justifyContent={"space-between"}
          alignItems={"center"}
          gap={3}
        >
          <Input
            onChange={(e) => setSearch(e.target.value)}
            w={{
              base: "100%",
              md: "40%",
            }}
            placeholder="Buscar estudiante por nombre o usuario"
          />
          <Button
            onClick={handleOpen}
            size="lg"
            leftIcon={<HiOutlineUserAdd />}
          >
            Crear
          </Button>
        </Box>
        <Box mt="6">
          <TableStudents
            handleCurrentStudent={handleCurrentStudent}
            students={students}
            handleOpenDelete={handleOpenDelete}
          />
        </Box>
      </Box>
      <DrawerCustom
        title={currentStudent ? "Actualizar estudiante" : "Crear estudiante"}
        isOpen={isOpen}
        onClose={onClose}
      >
        {currentStudent ? (
          <FormEditStudent
            loading={loading}
            handleSubmit={handleSubmitUpdate}
            handleCancel={onClose}
            currentStudent={currentStudent}
          />
        ) : (
          <FormCreateStudent
            loading={loading}
            handleSubmit={handleSubmit}
            handleCancel={onClose}
          />
        )}
      </DrawerCustom>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        onClose={onCloseModal}
        isOpen={isOpenModal}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Eliminar estudiante
            </AlertDialogHeader>

            <AlertDialogBody>
              ¿Esta seguro de eliminar el estudiante ?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onCloseModal}>
                Cancelar
              </Button>
              <Button
                isLoading={loading}
                colorScheme="red"
                onClick={handleDelete}
                ml={3}
              >
                Eliminar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </LayoutInstructor>
  );
};

export default InstructorPage;
