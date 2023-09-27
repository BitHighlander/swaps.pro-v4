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
// @ts-ignore
import backgroundImage from "lib/assets/background/thorfox.webp"; // Adjust the path
import BeginSwap from "./steps/BeginSwap"; // Updated import here
import CompleteSwap from "./steps/CompleteSwap"; // Updated import here
import SelectAssets from "./steps/SelectAssets"; // Updated import here

const Home = () => {
  const { state: pioneerState } = usePioneer();
  const { state: swapKitState } = useSwap();
  const { swapKit, walletData } = swapKitState;
  //steps
  const [step, setStep] = useState(0);
  const [address, setAddress] = useState("");
  const [modalType, setModalType] = useState(null);
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
        // console.log("swapKit.connectWallets: ", swapKit.connectWallets);
        const chains = Object.keys(swapKit.connectedWallets);
        console.log("chains", chains);
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

  const renderStepContent = () => {
    console.log("step: ", step);
    switch (step) {
      case 0:
        return <SelectAssets walletData={walletData} />;
      case 1:
        return <BeginSwap />;
      case 2:
        return <CompleteSwap />;
      default:
        setStep(0);
        return <BeginSwap />;
    }
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
            {modalType === "settings" && <div>settings</div>}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Box
        w="30rem"
        mx="auto"
        mt="5rem"
        boxShadow="rgb(0 0 0 / 8%) 0rem 0.37rem 0.62rem"
        borderRadius="1.37rem 1.37rem 0 0"
        bg="black"
      >
        <Flex
          alignItems="center"
          p="1rem 1.25rem 0.5rem"
          color="rgb(86, 90, 105)"
          justifyContent="space-between"
        >
          <h1>Swap</h1>
          <SettingsIcon
            fontSize="1.25rem"
            cursor="pointer"
            _hover={{ color: "rgb(128,128,128)" }}
            onClick={() => openModal("settings")}
          />
        </Flex>
      </Box>
      <VStack>
        <Flex
          w="30rem"
          mx="auto"
          alignItems="center"
          justifyContent="space-between"
          bg="black"
          p="2rem"
        >
          {renderStepContent()}
        </Flex>
      </VStack>
      <Flex
        w="30rem"
        mx="auto"
        flexDirection="column" // ensure children are stacked vertically
        alignItems="center" // Center the children horizontally
        bg="black"
        p="2rem"
      >
        <Button
          onClick={() => setStep((prevStep) => prevStep + 1)}
          leftIcon={<AddIcon />}
          colorScheme="blue"
          mt={4}
        >
          {" "}
          {/* Add mt for margin */}
          Continue
        </Button>
      </Flex>
    </div>
  );
};

export default Home;
