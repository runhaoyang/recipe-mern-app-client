import styled from "styled-components";

const StyledLoadingPage = styled.div`
  width: 50%;
  margin: auto;
  margin-top: 25%;

  & h2 {
    text-align: center;
  }
`;

const Loading = ({ source }) => {
  let message;
  if (source === "recipes") {
    message = (
      <StyledLoadingPage>
        <h2>Fetching recipes ... </h2>
      </StyledLoadingPage>
    );
  } else if (source === "collections") {
    message = (
      <StyledLoadingPage>
        <h2> Please login to view your collections.</h2>
      </StyledLoadingPage>
    );
  } else if (source === "collectionsEmptyArray") {
    message = (
      <StyledLoadingPage>
        <h2>No results found.</h2>
      </StyledLoadingPage>
    );
  } else if (source === "addARecipe") {
    message = (
      <StyledLoadingPage>
        <h2>Please login to add a recipe.</h2>
      </StyledLoadingPage>
    );
  } else if (source === "home") {
    message = (
      <StyledLoadingPage>
        <h2>
          This is the home page. {<br />} Please log in to access your
          collections, or to add a recipe.
        </h2>
      </StyledLoadingPage>
    );
  } else if (source === "users") {
    message = (
      <StyledLoadingPage>
        <h2>Fetching users ... </h2>
      </StyledLoadingPage>
    );
  }

  return <div>{message}</div>;
};

export default Loading;
