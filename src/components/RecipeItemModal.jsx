import { useState, useEffect } from "react";

const RecipeItemModal = ({ setModalState, currentRecipe }) => {
  const {
    strMeal: name,
    strCategory: category,
    strMealThumb: image,
    strInstructions: instructions,
  } = currentRecipe;

  const [recipeIngredientList, setRecipeIngredientList] = useState([]);

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

  const instructionsList = splitStringIntoSentence(instructions).map(
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

  useEffect(() => {
    for (let i = 1; i <= 20; i++) {
      if (
        currentRecipe[`strIngredient${i}`] !== null &&
        currentRecipe[`strIngredient${i}`].length > 0
      ) {
        setRecipeIngredientList((ingredientSet) => [
          ...ingredientSet,
          [
            capitalizeFirstLetter(currentRecipe[`strIngredient${i}`]) +
              ": " +
              currentRecipe[`strMeasure${i}`],
          ],
        ]);
      } else {
        continue;
      }
    }
  }, []);

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="modalButtonContainer">
          <div className="modalCloseButton">
            <button onClick={() => setModalState(false)}>Close</button>
          </div>
          <div className="modalCollectionButton">
            <button>Add to my collections</button>
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
            {console.log(currentRecipe)}
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
          {console.log(instructionsList)}
        </div>
      </div>
    </div>
  );
};

export default RecipeItemModal;
