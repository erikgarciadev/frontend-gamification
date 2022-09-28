import React, { useState,  } from "react";
import {
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { RiEyeOffLine, RiEyeLine } from "react-icons/ri";

export default function InputPassword(props: any) {
  const [show, setShow] = useState(false);

  const { ref, ...restProps } = props;
  return (
    <InputGroup size="lg">
      <Input
        {...restProps}
        type={show ? "text" : "password"}
        {...props.register}
      />
      <InputRightElement cursor="pointer" onClick={() => setShow(!show)}>
        {show ? <RiEyeOffLine /> : <RiEyeLine />}
      </InputRightElement>
    </InputGroup>
  );
}
