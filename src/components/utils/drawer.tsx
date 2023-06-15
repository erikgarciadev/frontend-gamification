import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import React from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  placement?: any;
  title: string;
  children: React.ReactNode;
}

const DrawerCustom: React.FC<Props> = ({
  isOpen,
  placement = "right",
  onClose,
  ...props
}) => {
  return (
    <Drawer isOpen={isOpen} placement={placement} onClose={onClose} size="md">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">{props.title}</DrawerHeader>
        <DrawerBody>{props.children}</DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerCustom;
