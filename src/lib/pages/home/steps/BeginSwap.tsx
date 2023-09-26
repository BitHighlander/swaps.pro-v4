import React from "react";
import {
  Avatar,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Card,
  Stack,
  Heading,
  CardFooter,
  CardHeader,
  CardBody,
} from "@chakra-ui/react";
// @ts-ignore
import calculatingAnimcation from "lib/assets/gif/calculating.gif"; // Import the GIF here

const BeginSwap = () => {
  return (
    <div>
      <img src={calculatingAnimcation} alt="calculating" />
      {/* Your BeginSwap component content */}
      SignTx
    </div>
  );
};

export default BeginSwap;
