import React, { useState } from "react";
import {
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
} from "@chakra-ui/react";
import { RiEyeOffLine, RiEyeLine } from "react-icons/ri";

export default function InputPassword(props: InputProps) {
  const [show, setShow] = useState(false);
  return (
    <InputGroup size="lg">
      <Input {...props} type={show ? "text" : "password"} />
      <InputRightElement cursor="pointer" onClick={() => setShow(!show)}>
        {show ? <RiEyeOffLine /> : <RiEyeLine />}
      </InputRightElement>
    </InputGroup>
  );
}
