import styled from "styled-components";

const StyledContainer = styled.div`
  box-shadow: rgb(0 0 0 / 40%) 0px 2px 4px, rgb(0 0 0 / 30%) 0px 7px 13px -3px,
    rgb(0 0 0 / 20%) 0px -3px 0px inset;
  border-radius: 10px;
  max-width: 100%;
  max-height: 300px;
  margin-bottom: 0px;
  margin-top: 10px;
  overflow: hidden;
`;

const StyledName = styled.p`
  margin-bottom: 5px;
  margin-top: 5px;
  min-height: 2.2em;
`;

const StyledImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const StyledLearnMoreButton = styled.div`
  height: 100%;

  & a {
    display: inline-block;
    text-decoration: none;
    line-height: 40px;
    color: white;
    background-color: #264653;
    font-weight: bold;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }
`;

const RecipeItem = ({ item, setModalState, setCurrentRecipe }) => {
  const name = item.strMeal;
  let image;
  const openModal = (e) => {
    e.preventDefault();
    setModalState(true);
    setCurrentRecipe(item);
  };

  // If the selected recipe is a user submitted one
  if (item.userSubmitted) {
    // Does the user submitted recipe have an image url?
    if (item.strMealThumb === undefined) {
      image = `https://firebasestorage.googleapis.com/v0/b/recipe-mern-app-images.appspot.com/o/No-Image-Placeholder.svg.png?alt=media&token=8e2ad808-28be-415f-9597-bfaba677266e`;
    } else {
      image = item.strMealThumb;
    }
  }
  // Not a user submitted recipe
  else {
    image = item.strMealThumb;
  }

  return (
    <>
      <StyledContainer>
        <StyledName>{name}</StyledName>
        <StyledImageContainer>
          <img src={image} alt="" />
        </StyledImageContainer>
        <StyledLearnMoreButton>
          <a href="/#" onClick={openModal}>
            Learn More
          </a>
        </StyledLearnMoreButton>
      </StyledContainer>
    </>
  );
};

export default RecipeItem;
