import React from "react";
import styledComponent from "../Modal.style";
const {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalContent,
  ButtonContainer,
  CancelButton,
  ConfirmButton,
} = styledComponent;

interface ConfirmModalProps {
  title: string;
  message: string | React.ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal = ({
  title,
  message,
  onConfirm,
  onCancel,
}: ConfirmModalProps) => {
  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader>{title}</ModalHeader>
        <ModalContent>{message}</ModalContent>
        <ButtonContainer>
          <CancelButton onClick={onCancel}>취소</CancelButton>
          <ConfirmButton onClick={onConfirm}>확인</ConfirmButton>
        </ButtonContainer>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default ConfirmModal;
