import React, { useEffect, useState } from "react";
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
// @ts-ignore
import { usePioneer } from "@pioneer-platform/pioneer-react";
// @ts-ignore
import { useSwap } from "swapkit-provider";

const BeginSwap = () => {
  const { state: pioneerState } = usePioneer();
  const { state: swapKitState } = useSwap();
  const { swapKit } = swapKitState;
  const [modalType, setModalType] = useState("");
  const [chains, setChains] = useState([]);
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

  const onStart = async function () {
    try {
      console.log("swapKit: ", swapKit);
      if (swapKit) {
        // console.log("swapKit.connectWallets: ", swapKit.connectedWallets);
        console.log("swapKit.connectWallets: ", swapKit.connectedWallets);
        console.log(
          "swapKit.connectWallets: ",
          JSON.stringify(swapKit.connectedWallets)
        );
        console.log("swapKit.connectedChains: ", swapKit.connectedChains);
        console.log(
          "swapKit.connectedChains: ",
          JSON.stringify(swapKit.connectedChains)
        );
        const chains = Object.keys(swapKit.connectedWallets);
        console.log("chains", chains);
        // @ts-ignore
        setChains(chains);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    onStart();
  }, [swapKit && swapKit.connectWallets]);

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
            {modalType === "Select Input" && <div>{chains.toString()}</div>}
            {modalType === "Select Output" && <div>output</div>}
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
