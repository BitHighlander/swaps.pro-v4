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
import { usePioneer, Balances } from "@pioneer-platform/pioneer-react";
import React, { useEffect, useState } from "react";

const InputModal = ({ isOpen, onClose }) => {
  const { state } = usePioneer();
  const { api, user, app } = state;
  const [isLoaded, setIsLoaded] = useState(false);
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
  const setUser = async function () {
    try {
      if (app && app.balances && app.pubkeys) {
        console.log(" ********************* USER SET ********************** ");
        // setIsLoaded(true);
        // // setBalances(balances);
        // // setPubkeys(pubkeys);
        //
        // // // eslint-disable-next-line no-console
        // // console.log("balances: ", balances);
        //
        // // // eslint-disable-next-line no-console
        // // console.log("pubkeys: ", pubkeys);
        // // get coins from api
        // let coins = await api.CurrenciesChangelly();
        // coins = coins.data;
        // // eslint-disable-next-line no-console
        // console.log("*** coins: ", coins);
        // console.log("*** app.balances: ", app.balances);
        // const filteredBalances = app.balances
        //   .filter((balance: { symbol: string }) =>
        //     coins.includes(balance.symbol.toLowerCase())
        //   )
        //   // .filter(
        //   //   (balance: { balanceUSD: string }) =>
        //   //     parseFloat(balance.balanceUSD) >= 1
        //   // )
        //   .sort(
        //     (a: { balanceUSD: string }, b: { balanceUSD: string }) =>
        //       parseFloat(b.valueUSD) - parseFloat(a.valueUSD)
        //   );
        //
        // console.log("filteredBalances: ", filteredBalances);
        //
        // setBalances(filteredBalances);

        // setInput(filteredBalances[0]);
        // setOutput(filteredBalances[1]);
      }
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line no-console
      console.error("header e: ", e);
      // setKeepKeyError("Bridge is offline!");
    }
  };

  // onStart()
  useEffect(() => {
    setUser();
  }, [app, app?.balances, app?.pubkeys]); // once on startup

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Deposit Asset</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {balances.map((balance, index) => (
            <Card key={balance?.address || index}>
              <Avatar src={balance?.image} />
              <CardBody>
                <Text>asset: {balance?.asset}</Text>
                <Text>network: {balance?.network}</Text>
                <Text>balanceUSD: {balance?.balanceUSD}</Text>
                <Text size="sm">{balance?.assetCaip}</Text>
                <Text py="2">
                  {balance?.balance} {balance?.symbol}
                </Text>
              </CardBody>
              <CardFooter>
                <Button
                  variant="solid"
                  colorScheme="blue"
                  // onClick={selectInput}
                >
                  select
                </Button>
              </CardFooter>
            </Card>
          ))}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          {/* Add any additional buttons or actions for depositing here */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default InputModal;
