import {
  SettingsIcon,
  ChevronDownIcon,
  ArrowDownIcon,
  PhoneIcon,
  AddIcon,
  WarningIcon,
  SmallCloseIcon,
} from "@chakra-ui/icons";
import {
  Flex,
  Box,
  Image,
  Text,
  Button,
  Input,
  VStack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  StackDivider,
  ModalFooter,
  Card,
  Stack,
  Heading,
  CardFooter,
  CardHeader,
  CardBody,
  Avatar,
  Spinner,
} from "@chakra-ui/react";
import { usePioneer, Balances } from "@pioneer-platform/pioneer-react";
import { useEffect, useState } from "react";

import InputModal from "./InputModal"; // Import the deposit modal
import OutputModal from "./OutputModal"; // Import the withdrawal modal

// @ts-ignore

// import etherLogo from "lib/assets/png/etherLogo.png";
// @ts-ignore

export const SwapActions = () => {
  const { state } = usePioneer();
  const { api, user, app } = state;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [balances, setBalances] = useState([
    {
      symbol: "",
      balance: "",
      address: "",
      image: "",
      blockchain: "",
      amount: "",
      decimals: "",
      name: "",
      price: "",
      priceChange: "",
      priceChangePercentage: "",
      rank: "",
      totalSupply: "",
      volume: "",
    },
  ]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [swapInfo, setSwapInfo] = useState({
    currencyFrom: "",
    currencyTo: "",
    amountFrom: "",
    currencyFromImage: "",
    currencyToImage: "",
    currencyFromName: "",
    currencyToName: "",
    currencyFromSymbol: "",
    currencyToSymbol: "",
    currencyFromDecimals: "",
    currencyToDecimals: "",
    currencyFromAddress: "",
    currencyToAddress: "",
    currencyFromBlockchain: "",
    currencyToBlockchain: "",
    currencyFromPrice: "",
    amountExpectedFrom: "",
    amountExpectedTo: "",
    id: "",
    changellyFee: "",
    rate: "",
    rateLockedInUntil: "",
    kycRequired: "",
    payinAddress: "",
    payoutAddress: "",
    apiExtraFee: "",
    status: "",
    createdAt: "",
  });
  const [isInputModalOpen, setIsInputModalOpen] = useState(false);
  const [isOutputModalOpen, setIsOutputModalOpen] = useState(false);
  const [input, setInput] = useState({
    address: "",
    symbol: "",
    name: "",
    amount: "",
  });
  const [output, setOutput] = useState({
    address: "",
    symbol: "",
    name: "",
  });

  const onStart = async function () {
    try {
      if (app.balances) {
        setIsLoaded(true);
        // Set default pair to ETH -> BTC
        console.log("app.balances: ", app.balances);
        // get balance ETH of paired wallets
        const ethBalance = app.balances.find(
          (balance: { symbol: string }) => balance.symbol === "ETH"
        );
        console.log("ethBalance: ", ethBalance);
        if (ethBalance) {
          console.log("ethBalance: ", ethBalance);
          const inputValue = {
            address: ethBalance.address,
            symbol: ethBalance.symbol,
            name: ethBalance.name,
            amount: ethBalance.balance,
          };
          console.log("inputValue: ", inputValue);
          setInput(inputValue);
        }
        // get current rate to BTC as quote
      }
    } catch (e) {
      console.error(e);
    }
  };
  // onStart()
  useEffect(() => {
    onStart();
  }, [app, app?.balances, app?.pubkeys]); // once on startup

  const openInputModal = () => {
    setIsInputModalOpen(true);
  };

  const closeInputModal = () => {
    setIsInputModalOpen(false);
  };

  const openOutputModal = () => {
    setIsOutputModalOpen(true);
  };

  const closeOutputModal = () => {
    setIsOutputModalOpen(false);
  };

  const onSelectInput = async function () {
    try {
      // eslint-disable-next-line no-console
      console.log("onSelectInput: ");
      openInputModal();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  const onSelectOutput = async function () {
    try {
      // eslint-disable-next-line no-console
      console.log("onSelectOutput: ");
      openOutputModal();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  const onSubmitSelect = async function () {
    try {
      // eslint-disable-next-line no-console
      console.log("onSubmitSelect: ");
      onOpen();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  // onCancel
  const onCancel = async function () {
    try {
      console.log("onCancel: ");
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  const onSelectPrimary = async function () {
    try {
      // eslint-disable-next-line no-console
      console.log("onSubmitPrimary: ");
      // create transaction
      input.amount = "1000";
      const tx = {
        from: input.symbol,
        to: output.symbol,
        address: output.address,
        amount: input.amount,
        extraId: undefined,
      };
      console.log("tx: ", tx);
      if (!input.symbol) throw Error("Missing input symbol");
      if (!output.symbol) throw Error("Missing output symbol");
      if (!output.address) throw Error("Missing output address");
      if (!output.address) throw Error("Missing output address");
      const swapConduit = await api.CreateTransactionChangelly(tx);
      console.log("swapConduit: ", swapConduit.data);
      setSwapInfo(swapConduit.data);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  return (
    <Box
      w="30.62rem"
      mx="auto"
      mt="5.25rem"
      boxShadow="rgb(0 0 0 / 8%) 0rem 0.37rem 0.62rem"
      borderRadius="1.37rem"
    >
      <InputModal isOpen={isInputModalOpen} onClose={closeInputModal} />
      <OutputModal isOpen={isOutputModalOpen} onClose={closeOutputModal} />

      {/* <Modal isOpen={isOpen} onClose={onClose}> */}
      {/*  <ModalOverlay /> */}
      {/*  <ModalContent> */}
      {/*    <ModalHeader>Input Asset Select</ModalHeader> */}
      {/*    <ModalCloseButton /> */}
      {/*    <ModalBody> */}
      {/*      {balances.map((balance, index) => ( */}
      {/*        <Card key={balance?.address || index}> */}
      {/*          <Avatar src={balance?.image} /> */}
      {/*          <CardBody> */}
      {/*            <Text>asset: {balance?.asset}</Text> */}
      {/*            <Text>network: {balance?.network}</Text> */}
      {/*            <Text>balanceUSD: {balance?.balanceUSD}</Text> */}
      {/*            <Text size={'sm'}>{balance?.assetCaip}</Text> */}
      {/*            <Text py="2"> */}
      {/*              {balance?.balance} {balance?.symbol} */}
      {/*            </Text> */}
      {/*          </CardBody> */}
      {/*          <CardFooter> */}
      {/*            <Button variant="solid" colorScheme="blue" onClick={selectInput}> */}
      {/*              select */}
      {/*            </Button> */}
      {/*          </CardFooter> */}
      {/*        </Card> */}
      {/*      ))} */}
      {/*    </ModalBody> */}
      {/*    <ModalFooter> */}
      {/*      <Button colorScheme="blue" mr={3} onClick={onClose}> */}
      {/*        Close */}
      {/*      </Button> */}
      {/*      <Button onClick={() => onSubmitSelect} variant="green"> */}
      {/*        Select Coin */}
      {/*      </Button> */}
      {/*    </ModalFooter> */}
      {/*  </ModalContent> */}
      {/* </Modal> */}
      <Flex
        alignItems="center"
        p="1rem 1.25rem 0.5rem"
        bg="white"
        color="rgb(86, 90, 105)"
        justifyContent="space-between"
        borderRadius="1.37rem 1.37rem 0 0"
      >
        <Text color="black" fontWeight="500">
          Swap
        </Text>
        <SettingsIcon
          fontSize="1.25rem"
          cursor="pointer"
          _hover={{ color: "rgb(128,128,128)" }}
        />
      </Flex>
      {isLoaded ? (
        <div>
          <Box p="0.5rem" bg="gray" borderRadius="0 0 1.37rem 1.37rem">
            {swapInfo?.id ? (
              <div>
                <Card>
                  <CardHeader>
                    <Heading size="md">Swap ID: {swapInfo.id}</Heading>
                  </CardHeader>
                  <CardBody>
                    <Stack divider={<StackDivider />} spacing="4">
                      <Box>
                        <Heading size="xs" textTransform="uppercase">
                          Summary
                        </Heading>
                        <Text pt="2" fontSize="sm">
                          Currency From: {swapInfo.currencyFrom} <br />
                          Currency To: {swapInfo.currencyTo} <br />
                          Amount Expected From: {
                            swapInfo.amountExpectedFrom
                          }{" "}
                          <br />
                          Amount Expected To: {swapInfo.amountExpectedTo}
                        </Text>
                      </Box>
                      <Box>
                        <Heading size="xs" textTransform="uppercase">
                          fees
                        </Heading>
                        <Text pt="2" fontSize="sm">
                          changellyFee: {swapInfo.changellyFee} <br />
                          apiExtraFee: {swapInfo.apiExtraFee}
                        </Text>
                      </Box>
                      <Box>
                        <Heading size="xs" textTransform="uppercase">
                          KYC
                        </Heading>
                        <Text pt="2" fontSize="sm">
                          {swapInfo.kycRequired ? (
                            <div>
                              amount to large! KYC will be required!
                              <WarningIcon />
                            </div>
                          ) : (
                            <div>
                              Not Required
                              <SmallCloseIcon />
                            </div>
                          )}
                        </Text>
                      </Box>
                      <Box>
                        <Heading size="xs" textTransform="uppercase">
                          Overview
                        </Heading>
                        <Text pt="2" fontSize="sm">
                          Payin Address: {swapInfo.payinAddress} <br />
                          Payout Address: {swapInfo.payoutAddress}
                        </Text>
                      </Box>
                      <Box>
                        <Heading size="xs" textTransform="uppercase">
                          status
                        </Heading>
                        <Text pt="2" fontSize="sm">
                          Status: {swapInfo.status} <br />
                          Created At: {swapInfo.createdAt}
                        </Text>
                      </Box>
                    </Stack>
                  </CardBody>
                  <Button onClick={() => onCancel} variant="red">
                    Cancel
                  </Button>
                </Card>
              </div>
            ) : (
              <div>
                <Flex
                  alignItems="center"
                  justifyContent="space-between"
                  bg="rgb(247, 248, 250)"
                  p="1rem 1rem 1.7rem"
                  borderRadius="1.25rem"
                  border="0.06rem solid rgb(237, 238, 242)"
                  _hover={{ border: "0.06rem solid rgb(211,211,211)" }}
                >
                  <Box>
                    <Button
                      bg="blue.500"
                      borderRadius="1.12rem"
                      boxShadow="rgb(0 0 0 / 8%) 0rem 5.25rem 0.62rem"
                      fontWeight="500"
                      mr="0.5rem"
                      rightIcon={
                        <ChevronDownIcon fontSize="1.37rem" cursor="pointer" />
                      }
                      onClick={onSelectInput}
                    >
                      {/* <Image */}
                      {/*  boxSize="1.5rem" */}
                      {/*  src={etherLogo} */}
                      {/*  alt="Ether Logo" */}
                      {/*  mr="0.5rem" */}
                      {/* /> */}
                      {input?.name} ({input?.symbol})
                    </Button>
                  </Box>
                  <Box>
                    <Input
                      placeholder="0.0"
                      fontWeight="500"
                      fontSize="1.5rem"
                      width="100%"
                      size="19rem"
                      textAlign="right"
                      bg="rgb(247, 248, 250)"
                      outline="none"
                      border="none"
                      focusBorderColor="none"
                      type="number"
                    />
                  </Box>
                </Flex>

                <Flex
                  alignItems="center"
                  justifyContent="space-between"
                  bg="rgb(247, 248, 250)"
                  pos="relative"
                  p="1rem 1rem 1.7rem"
                  borderRadius="1.25rem"
                  mt="0.25rem"
                  border="0.06rem solid rgb(237, 238, 242)"
                  _hover={{ border: "0.06rem solid rgb(211,211,211)" }}
                >
                  <Box>
                    <Button
                      bg="rgb(232, 0, 111)"
                      color="blue"
                      p="0rem 1rem"
                      borderRadius="1.12rem"
                      boxShadow="rgb(0 0 0 / 8%) 0rem 5.25rem 0.62rem"
                      _hover={{ bg: "rgb(207, 0, 99)" }}
                      rightIcon={
                        <ChevronDownIcon fontSize="1.37rem" cursor="pointer" />
                      }
                      onClick={onSelectOutput}
                    >
                      {output?.name} ({output?.symbol})
                    </Button>
                  </Box>
                  <Flex
                    alignItems="center"
                    justifyContent="center"
                    bg="white"
                    p="0.18rem"
                    borderRadius="0.75rem"
                    pos="relative"
                    top="-2.37rem"
                    left="2.5rem"
                  >
                    <ArrowDownIcon
                      bg="rgb(247, 248, 250)"
                      color="rgb(128,128,128)"
                      h="1.5rem"
                      width="1.62rem"
                      borderRadius="0.75rem"
                    />
                  </Flex>
                  <Box>
                    <Input
                      placeholder="0.0"
                      fontSize="1.5rem"
                      width="100%"
                      size="19rem"
                      textAlign="right"
                      bg="rgb(247, 248, 250)"
                      outline="none"
                      border="none"
                      focusBorderColor="none"
                      type="number"
                    />
                  </Box>
                </Flex>

                <Box mt="0.5rem">
                  <Button
                    color="rgb(213, 0, 102)"
                    bg="rgb(253, 234, 241)"
                    width="100%"
                    p="1.62rem"
                    borderRadius="1.25rem"
                    _hover={{ bg: "rgb(251, 211, 225)" }}
                    onClick={onSelectPrimary}
                  >
                    Swap
                  </Button>
                </Box>
              </div>
            )}
          </Box>
        </div>
      ) : (
        <div>
          <Box p="0.5rem" bg="gray" borderRadius="0 0 1.37rem 1.37rem">
            <Spinner color="green.500" />
          </Box>
        </div>
      )}
    </Box>
  );
};
