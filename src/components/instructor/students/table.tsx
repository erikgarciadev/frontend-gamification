import React from "react";
import {
  Box,
  Button,
  Input,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { StudentProps } from "../../../types/instructor/student";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";

interface Props {
  students: StudentProps[];
  handleCurrentStudent: Function;
  handleOpenDelete: Function;
}

const TableStudents: React.FC<Props> = ({
  students,
  handleCurrentStudent,
  handleOpenDelete,
}) => {
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Nombre</Th>
          <Th>Usuario</Th>
          <Th>Acciones</Th>
        </Tr>
      </Thead>
      <Tbody>
        {students.map((student) => (
          <Tr key={student._id}>
            <Td>{student.firstname}</Td>
            <Td>{student.username}</Td>
            <Td>
              <Box display={"flex"} alignItems={"center"} gap={2}>
                <HiOutlinePencil
                  style={{
                    width: "20px",
                    height: "20px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleCurrentStudent(student)}
                />
                <HiOutlineTrash
                  style={{
                    width: "20px",
                    height: "20px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleOpenDelete(student)}
                />
              </Box>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default TableStudents;
