import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContainer = styled.div`
  position: fixed;
  z-index: 10000;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 500px;
  background-color: white;
  border-radius: 10px;
  padding: 30px 24px;
  box-sizing: border-box;
`;

const ModalHeader = styled.h2`
  margin-bottom: 14px;
`;

const ModalContent = styled.p``;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const ConfirmButton = styled.button`
  width: fit-content;
  min-width: 80px;
  margin-left: 10px;
  padding: 10px;
  border-radius: 5px;
  background-color: #0077ff;
  color: white;
  cursor: pointer;
  border: none;
`;

const CancelButton = styled.button`
  width: fit-content;
  min-width: 80px;
  padding: 10px;
  border-radius: 5px;
  background-color: #f0f0f0;
  color: black;
  cursor: pointer;
  border: none;
`;

const styledComponent = {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalContent,
  ButtonContainer,
  ConfirmButton,
  CancelButton,
};

export default styledComponent;
