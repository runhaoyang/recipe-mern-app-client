import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";

const StyledPortal = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  height: 82%;
  top: 12%;
  width: 70%;
  overflow: scroll;
`;

const StyledBackground = styled.div`
  width: 70%;
  height: 85%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  border-radius: 12px;
  border: 1px solid #555;
`;

const StyledContainer = styled.div`
  width: 100%;
  height: 92%;
  border-radius: 12px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  display: flex;
  flex-direction: column;
  padding: 25px;
  overflow: scroll;
`;

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #333;
`;

const StyledCloseButton = styled.button`
  padding: 0.5em;
  cursor: pointer;
  color: white;
  background-color: #264653;
  font-weight: bold;
`;

const StyledModalHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 8fr;
  column-gap: 1em;
`;

const StyledModalTitle = styled.div`
  text-align: center;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  margin-top: 1em;
  margin-bottom: 1em;
  border-radius: 0.25em;
  overflow: hidden;
`;

const StyledModalName = styled.div`
  margin: 0.2em;
`;

const StyledModalPicture = styled.div`
  height: 100%;

  & img {
    max-height: 150px;
    max-width: 150px;
    min-width: 100%;
    min-height: 100%;
  }
`;

const StyledModalIngredientsContainer = styled.div`
  padding-top: 1em;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  margin-top: 1em;
  margin-bottom: 1em;
  border-radius: 0.25em;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  list-style-type: none;

  & div {
    padding-left: 1em;
  }
`;

const StyledModalRecipeList = styled.li`
  margin-bottom: 10px;
`;

const StyledModalInstructions = styled.div`
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  padding: 1em;
  border-radius: 0.25em;
`;

const StyledModalInstructionList = styled.li`
  line-height: 2em;
  list-style: none;
  display: inline;
`;

const AllRecipesPortal = ({ isOpen, onClose, selectedRow }) => {
  const [recipeIngredientList, setRecipeIngredientList] = useState([]);

  const currentRecipe = selectedRow.original;

  useEffect(() => {
    if (selectedRow.original) {
      setRecipeIngredientList([]);
      for (let i = 1; i <= 20; i++) {
        if (selectedRow.original.hasOwnProperty(`strIngredient${i}`)) {
          if (
            selectedRow.original[`strIngredient${i}`] !== null &&
            selectedRow.original[`strIngredient${i}`].length > 0
          ) {
            setRecipeIngredientList((ingredientSet) => [
              ...ingredientSet,
              [
                capitalizeFirstLetter(
                  selectedRow.original[`strIngredient${i}`]
                ) +
                  ": " +
                  selectedRow.original[`strMeasure${i}`],
              ],
            ]);
          } else {
            continue;
          }
        }
      }
    }
  }, [selectedRow]);

  if (!isOpen) return null;

  const { strMeal: name, strCategory: category } = currentRecipe;
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const splitStringIntoSentence = (string) => {
    const sentences = string.split(/(?<!\d)\.(?!\d)/);
    return sentences.filter((sentence) => sentence.length > 0);
  };

  const ingredientList = recipeIngredientList.map((list, index) => {
    return <StyledModalRecipeList key={index}>{list}</StyledModalRecipeList>;
  });

  let image;

  if (currentRecipe.hasOwnProperty("strMealThumb")) {
    image = currentRecipe.strMealThumb;
  } else {
    image = `https://firebasestorage.googleapis.com/v0/b/recipe-mern-app-images.appspot.com/o/No-Image-Placeholder.svg.png?alt=media&token=8e2ad808-28be-415f-9597-bfaba677266e`;
  }

  let instructions = currentRecipe.strInstructions;
  let instructionsList;

  // If the current recipe is a user submitted one then, render the instructions list without first parsing it through a function to split the string into sentences.
  if (currentRecipe.userSubmitted) {
    instructions = JSON.parse(instructions);
    instructionsList = instructions.map((list, index) => {
      return (
        <div key={index}>
          <label>
            <input type="checkBox" />
            <StyledModalInstructionList key={index}>
              {list}
            </StyledModalInstructionList>
          </label>
        </div>
      );
    });
  } else {
    instructionsList = splitStringIntoSentence(instructions).map(
      (list, index) => {
        if (index === 0) {
          list = " " + list;
        }
        return (
          <div key={index}>
            <label>
              <input type="checkBox" />
              <StyledModalInstructionList key={index}>
                {list}
              </StyledModalInstructionList>
            </label>
          </div>
        );
      }
    );
  }

  // Split array into 5 parts for presentation
  const chunkSize = 5;
  const groups = ingredientList
    .map((item, index) => {
      return index % chunkSize === 0
        ? ingredientList.slice(index, index + chunkSize)
        : null;
    })
    .filter((item) => {
      return item;
    });

  return ReactDOM.createPortal(
    <StyledPortal>
      <StyledBackground>
        <StyledContainer>
          <StyledButtonContainer>
            <StyledCloseButton onClick={onClose}>Close</StyledCloseButton>
          </StyledButtonContainer>
          <StyledModalHeader>
            <StyledModalTitle>
              <StyledModalName>
                {name} <span> ({category})</span>
              </StyledModalName>

              <StyledModalPicture>
                <img src={image} alt="" />
              </StyledModalPicture>
            </StyledModalTitle>
            <StyledModalIngredientsContainer>
              <div>{groups[0]}</div>
              <div>{groups[1]}</div>
              <div>{groups[2]}</div>
              <div>{groups[3]}</div>
            </StyledModalIngredientsContainer>
          </StyledModalHeader>

          <StyledModalInstructions>{instructionsList}</StyledModalInstructions>
        </StyledContainer>
      </StyledBackground>
    </StyledPortal>,
    document.body
  );
};

export default AllRecipesPortal;
