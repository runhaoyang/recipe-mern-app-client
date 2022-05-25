import { useState } from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  margin: 1rem;
  color: white;
`;

const StyledTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  cursor: pointer;
  background-color: #264653;
  padding: 1rem;
`;

const StyledContent = styled.div`
  color: black;
  padding: 0.5rem;

  & li {
    list-style: none;
    padding: 0.2em;
  }
`;

const Accordion = ({ title, content }) => {
  const [open, setOpen] = useState(false);

  const splitStringIntoSentence = (string) => {
    const sentences = string.split(/(?<!\d)\.(?!\d)/);
    return sentences.filter((sentence) => sentence.length > 0);
  };

  const filteredContent = splitStringIntoSentence(content);

  return (
    <StyledContainer>
      <StyledTitle onClick={() => setOpen(!open)}>
        <div>{title}</div>
        <div>{open ? "-" : "+"} </div>
      </StyledTitle>
      {open && (
        <StyledContent>
          {filteredContent.map((sentence, index) => (
            <li key={index}> {sentence} </li>
          ))}
        </StyledContent>
      )}
    </StyledContainer>
  );
};

export default Accordion;
