import React from "react";
import styledComponent from "../Modal.style";
const {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalContent,
  ButtonContainer,
  ConfirmButton,
} = styledComponent;

interface AlertModalProps {
  title: string;
  message: string;

  onConfirm: () => void;
}

const AlertModal = ({ title, message, onConfirm }: AlertModalProps) => {
  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader>{title}</ModalHeader>
        <ModalContent>{message}</ModalContent>
        <ButtonContainer>
          <ConfirmButton onClick={onConfirm}>확인</ConfirmButton>
        </ButtonContainer>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default AlertModal;
