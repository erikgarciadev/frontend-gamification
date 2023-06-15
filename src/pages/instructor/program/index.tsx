import React from "react";
import LayoutInstructor from "../../../components/instructor/layout";
import { Box, Button, useDisclosure } from "@chakra-ui/react";
import DrawerCustom from "../../../components/utils/drawer";
import axiosInstance from "../../../config/axiosInstance";
import FormCreateUnit from "../../../components/instructor/program/forms/create";
import { UnitProps } from "../../../types/instructor/unit";
import ItemUnit from "./item-unit";

const InstructorProgram = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [units, setUnits] = React.useState<any[]>([]);

  const getUnits = async (search = "") => {
    const res = await axiosInstance.get(`/units`);
    setUnits(res.data);
  };

  React.useEffect(() => {
    getUnits();
  }, []);

  const handleSubmit = async (data: UnitProps) => {
    try {
      setLoading(true);
      console.log(data);
      await axiosInstance.post("/units", data);
      setLoading(false);
      onClose();
      await getUnits();
    } catch (error) {
      setLoading(false);
    }
  };

  const handleSubmitUpdate = async (id: string, data: UnitProps) => {
    try {
      setLoading(true);
      await axiosInstance.put(`/units/${id}`, data);
      setLoading(false);
      await getUnits();
    } catch (error) {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      await axiosInstance.delete(`/units/${id}`);
      setLoading(false);
      await getUnits();
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <LayoutInstructor>
      <Box mb="4">
        <Box display={"flex"} justifyContent={"end"} gap={3} w="full">
          <Button onClick={onOpen} size="lg">
            Crear Unidad
          </Button>
        </Box>
      </Box>
      <Box
        display={"grid"}
        gap={5}
        gridTemplateColumns={{
          base: "repeat(1,1fr)",
          md: "repeat(2,1fr)",
        }}
      >
        {units.map((unit) => (
          <ItemUnit
            key={unit._id}
            unit={unit}
            handleSubmitUpdate={handleSubmitUpdate}
            handleDelete={handleDelete}
          />
        ))}
      </Box>

      <DrawerCustom title="Crear unidad" isOpen={isOpen} onClose={onClose}>
        <FormCreateUnit
          loading={loading}
          handleSubmit={handleSubmit}
          handleCancel={onClose}
        />
      </DrawerCustom>
    </LayoutInstructor>
  );
};

export default InstructorProgram;
