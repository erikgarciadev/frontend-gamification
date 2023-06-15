import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { StudentProps } from "../../../../types/instructor/student";
import FormStudent from "./form";

interface Props {
  handleSubmit: Function;
  handleCancel: Function;
  loading: boolean;
  currentStudent: any;
}

const FormEditStudent: React.FC<Props> = ({
  loading,
  handleCancel,
  handleSubmit,
  ...props
}) => {
  const {
    register,
    handleSubmit: handleSubmitForm,
    formState: { errors },
  } = useForm<StudentProps>({
    defaultValues: {
      firstname: props.currentStudent.firstname ?? "",
      username: props.currentStudent.username ?? "",
    },
  });

  const onSubmit: SubmitHandler<StudentProps> = (data) => {
    handleSubmit(data);
  };

  return (
    <FormStudent
      onSubmit={onSubmit}
      handleSubmit={handleSubmitForm}
      handleCancel={handleCancel}
      loading={loading}
      register={register}
      errors={errors}
      isEdit
    />
  );
};

export default FormEditStudent;
