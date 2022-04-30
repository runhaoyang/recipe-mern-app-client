import ReactDOM from "react-dom";
import { useState, useEffect } from "react";

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

  console.log(recipeIngredientList);

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
    return (
      <li className="modalRecipeList" key={index}>
        {list}
      </li>
    );
  });

  let image;

  if (currentRecipe.hasOwnProperty("strMealThumb")) {
    image = currentRecipe.strMealThumb;
  } else {
    image = `uploads/2022-04-23-No-Image-Placeholder.svg.png`;
  }

  let instructions = currentRecipe.strInstructions;
  let instructionsList;

  // If the current recipe is a user submitted one then, render the instructions list without first parsing it through a function to split the string into sentences.
  if (currentRecipe.userSubmitted) {
    image = `https://recipe-mern-app-server.herokuapp.com/${image}`;
    instructions = JSON.parse(instructions);
    instructionsList = instructions.map((list, index) => {
      return (
        <div key={index}>
          <label className="modalLabel">
            <input type="checkBox" />
            <li className="modalInstructionList" key={index}>
              {list}
            </li>
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
            <label className="modalLabel">
              <input type="checkBox" />
              <li className="modalInstructionList" key={index}>
                {list}
              </li>
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
    <div className="allRecipesPortal">
      <div className="allRecipesBackground">
        <div className="allRecipesContainer">
          <div className="modalButtonContainer">
            <div className="modalCloseButton">
              <button onClick={onClose}>Close</button>
            </div>
          </div>
          <div className="modalHeader">
            <div className="modalTitle">
              <div className="modalName">
                <p>
                  {name} <span> ({category})</span>
                </p>
              </div>
              <div className="modalPicture">
                <img src={image} alt="" />
              </div>
            </div>
            <div className="modalIngredients">
              <div className="modalIngredientsOne">{groups[0]}</div>
              <div className="modalIngredientsTwo">{groups[1]}</div>
              <div className="modalIngredientsThree">{groups[2]}</div>
              <div className="modalIngredientsFour">{groups[3]}</div>
            </div>
          </div>

          <div className="modalBody">
            <div className="modalInstructions">{instructionsList}</div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default AllRecipesPortal;
