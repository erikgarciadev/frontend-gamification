import React, { useState, ChangeEvent } from "react";

export default function useForm<T>(initialState: T) {
  const [form, setForm] = useState<T>(initialState);

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [ev.target.name]: ev.target.value,
    });
  };
  return {
    form,
    handleChange,
  };
}
