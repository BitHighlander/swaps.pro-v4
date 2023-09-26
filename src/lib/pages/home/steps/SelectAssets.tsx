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

  return (
    <div>
      <VStack>
        <Flex
          w="30rem"
          mx="auto"
          alignItems="center"
          justifyContent="space-between"
          bg="black"
          p="2rem"
        >
          <Box
            w="45%"
            h="10rem"
            border="1px solid #fff"
            borderRadius="8px"
            display="flex"
            alignItems="center"
            justifyContent="center"
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
          >
            <Avatar size="xl" src={output.icon} />
          </Box>
        </Flex>
      </VStack>
    </div>
  );
};

export default BeginSwap;
