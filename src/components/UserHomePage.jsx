import { documentContent } from "../components/static/documentContent";
import Accordion from "./Accordion";
import styled from "styled-components";

const StyledAccordionContainer = styled.div`
  max-width: 700px;
  margin: auto;
`;

const StyledHeader = styled.div`
  text-align: center;
`;

const UserHomePage = ({ userInfo, isLoggedIn }) => {
  const username = userInfo.username;

  return (
    <>
      <div>{isLoggedIn && <h3> Welcome {username} </h3>}</div>
      <StyledHeader>
        <h2>Documentation </h2>
      </StyledHeader>
      <StyledAccordionContainer>
        {documentContent.map(({ title, content }, index) => (
          <Accordion key={index} title={title} content={content} />
        ))}
      </StyledAccordionContainer>
    </>
  );
};

export default UserHomePage;
