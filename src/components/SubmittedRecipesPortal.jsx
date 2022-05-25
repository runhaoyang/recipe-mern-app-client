import ReactDOM from "react-dom";
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

const StyledPortalContainer = styled.div`
  width: 90%;
  margin: auto;
`;

const SubmittedRecipesPortal = ({ isOpen, onClose, selectedRow }) => {
  if (!isOpen) return null;
  let renderFullIngredientsList;
  let recipeName;
  let recipeCategory;
  let recipeInstructionsList;
  let recipeImagePath;
  if (selectedRow.original) {
    if (selectedRow.original.hasOwnProperty("filePath")) {
      recipeImagePath = selectedRow.original.filePath;
    } else {
      recipeImagePath = `https://firebasestorage.googleapis.com/v0/b/recipe-mern-app-images.appspot.com/o/No-Image-Placeholder.svg.png?alt=media&token=8e2ad808-28be-415f-9597-bfaba677266e`;
    }

    recipeName = selectedRow.original.strMeal;
    recipeCategory = selectedRow.original.strCategory;
    const ingredientsList = selectedRow.original.strIngredients;
    const quantityList = selectedRow.original.strQuantity;
    const fullIngredientsList = [];
    recipeInstructionsList = selectedRow.original.strInstructions;

    for (let i = 0; i < ingredientsList.length; i++) {
      if (quantityList[i] === "") {
        fullIngredientsList[i] = ingredientsList[i];
      } else {
        fullIngredientsList[i] = ingredientsList[i] + ": " + quantityList[i];
      }
    }

    renderFullIngredientsList = fullIngredientsList.map((pair, index) => {
      return (
        <li style={{ listStyle: "none" }} key={index}>
          {pair}
        </li>
      );
    });
  }

  return ReactDOM.createPortal(
    <StyledPortal>
      {console.log(selectedRow.original)}

      <StyledCloseButton onClick={onClose}>Close</StyledCloseButton>
      <StyledPortalContainer>
        <h3>
          {recipeName} <span> ({recipeCategory})</span>
        </h3>
        <img
          style={{
            maxWidth: "12em",
            maxHeight: "12em",
            minWidth: "12em",
            minHeight: "12em",
          }}
          src={recipeImagePath}
          alt=""
        />
        <h3 style={{ textDecoration: "underline" }}> Ingredients </h3>
        {renderFullIngredientsList}
        <br />
        <h3 style={{ textDecoration: "underline" }}> Instructions </h3>
        {recipeInstructionsList.map((instruction, index) => {
          return (
            <li style={{ listStyle: "none" }} key={index}>
              {instruction}
            </li>
          );
        })}
      </StyledPortalContainer>
    </StyledPortal>,
    document.body
  );
};

export default SubmittedRecipesPortal;
