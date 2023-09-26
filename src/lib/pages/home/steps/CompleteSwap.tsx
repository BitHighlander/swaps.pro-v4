import React, { useState } from "react";
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
  VStack,
  Flex,
  Box,
  Progress,
} from "@chakra-ui/react";
import { AddIcon, ArrowUpDownIcon } from "@chakra-ui/icons";

// @ts-ignore
import completedGif from "lib/assets/gif/completed.gif"; // Import the GIF here
// @ts-ignore
import shiftingGif from "lib/assets/gif/shifting.gif";

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
      Waiting for confirmations...
      <img src={shiftingGif} alt="shiftingGif" />
    </div>
  );
};

export default BeginSwap;
