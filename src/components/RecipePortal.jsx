import ReactDOM from "react-dom";
import Table from "./Table";
import styled from "styled-components";

const StyledPortal = styled.div`
  position: absolute;
  background-color: white;
  border: 1px solid #555;
  left: 0;
  right: 0;
  margin: auto;
  height: 85%;
  top: 12%;
  width: 50%;
  text-align: center;
  overflow: scroll;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  border-radius: 12px;
`;

const StyledCloseButton = styled.button`
  margin-top: 1em;
  background-color: #264653;
  color: white;
  font-weight: bold;
  cursor: pointer;
  padding: 0.5em;
`;

const RecipePortal = ({ isOpen, onClose, selectedRow, modalColumns }) => {
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <StyledPortal>
      <StyledCloseButton onClick={onClose}>Close</StyledCloseButton>
      <Table columns={modalColumns} data={selectedRow.original.recipes} />
    </StyledPortal>,
    document.body
  );
};

export default RecipePortal;
