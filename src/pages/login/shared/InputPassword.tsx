import React, { useState } from "react";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { RiEyeOffLine, RiEyeLine } from "react-icons/ri";

const InputPassword: React.FC<any> = React.forwardRef<HTMLInputElement, any>(
  ({ ...props }, ref) => {
    const [show, setShow] = useState(false);

    const { ...restProps } = props;
    return (
      <InputGroup size="lg">
        <Input
          {...restProps}
          type={show ? "text" : "password"}
          {...props.register}
          ref={ref}
        />
        <InputRightElement cursor="pointer" onClick={() => setShow(!show)}>
          {show ? <RiEyeOffLine /> : <RiEyeLine />}
        </InputRightElement>
      </InputGroup>
    );
  }
);

export default InputPassword;
