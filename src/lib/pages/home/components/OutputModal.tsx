import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";

const OutputModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Withdraw Asset</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{/* Content for the withdrawal modal */}</ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          {/* Add any additional buttons or actions for withdrawing here */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default OutputModal;
