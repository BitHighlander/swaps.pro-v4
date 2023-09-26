import React, { useState } from "react";
import {
  Button,
  useDisclosure,
  Modal,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Flex,
  Box,
  Avatar,
  VStack,
  Progress,
} from "@chakra-ui/react";
import { SettingsIcon, ArrowUpDownIcon, AddIcon } from "@chakra-ui/icons";

const BeginSwap = () => {
  const [modalType, setModalType] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [input, setInput] = useState({
    address: "",
    symbol: "ETH",
    caip: "",
    amount: "",
    icon: "https://pioneers.dev/coins/ethereum.png",
  });
  const [output, setOutput] = useState({
    address: "",
    symbol: "BTC",
    caip: "",
    icon: "https://pioneers.dev/coins/bitcoin.png",
  });

  const openModal = (type: any) => {
    setModalType(type);
    onOpen();
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={() => onClose()} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalType}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Render content based on modalType */}
            {modalType === "Select Input" && <div>input</div>}
            {modalType === "Select Output" && <div>output</div>}
            {modalType === "settings" && <div>settings</div>}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Flex
        w="26rem"
        mx="auto"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box
          w="45%"
          h="10rem"
          border="1px solid #fff"
          borderRadius="8px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          _hover={{ color: "rgb(128,128,128)" }}
          onClick={() => openModal("Select Input")}
        >
          <Avatar size="xl" src={input.icon} />
        </Box>
        <ArrowUpDownIcon color="white" boxSize="2rem" />
        <Box
          w="45%"
          h="10rem"
          border="1px solid #fff"
          borderRadius="8px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          _hover={{ color: "rgb(128,128,128)" }}
          onClick={() => openModal("Select Output")}
        >
          <Avatar size="xl" src={output.icon} />
        </Box>
      </Flex>
    </div>
  );
};

export default BeginSwap;
