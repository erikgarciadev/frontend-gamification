import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { StudentProps } from "../../../../types/instructor/student";
import FormStudent from "./form";

interface Props {
  handleSubmit: Function;
  handleCancel: Function;
  loading: boolean;
}

const FormCreateStudent: React.FC<Props> = ({
  loading,
  handleCancel,
  handleSubmit,
}) => {
  const {
    register,
    handleSubmit: handleSubmitForm,
    formState: { errors },
  } = useForm<StudentProps>();

  const onSubmit: SubmitHandler<StudentProps> = (data) => {
    handleSubmit({ ...data, password: "123456" });
  };

  return (
    <FormStudent
      onSubmit={onSubmit}
      handleSubmit={handleSubmitForm}
      handleCancel={handleCancel}
      loading={loading}
      register={register}
      errors={errors}
    />
  );
};

export default FormCreateStudent;
