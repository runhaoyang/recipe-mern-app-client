import { useState, useEffect } from "react";
import Axios from "axios";

const RecipeItemModal = ({
  setModalState,
  currentRecipe,
  userInfo,
  setUserInfo,
  isLoggedIn,
}) => {
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

  const addToCollection = async () => {
    if (!isLoggedIn) {
      console.log("User needs to be logged in to perform this action.");
      return;
    }
    try {
      await Axios.post(
        "https://recipe-mern-app-server.herokuapp.com/recipes/exists",
        {
          username: userInfo.username,
          recipes: currentRecipe,
        }
      ).then(async (res) => {
        if (res.data === "doesNotExist") {
          await Axios.post(
            "https://recipe-mern-app-server.herokuapp.com/recipes/save",
            {
              username: userInfo.username,
              recipes: currentRecipe,
            }
          ).then((res) => {
            console.log(res.data.recipes);
            setUserInfo(res.data);
            console.log("Recipe successfully added to the user's collections.");
          });
        } else {
          console.log("FRONTEND: Recipe already exists in user's collections.");
        }
      });
    } catch (err) {
      console.error(`The error is ${err}`);
      console.log(err.response.data.message);
    }
  };

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
            <button onClick={addToCollection}>Add to my collections</button>
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
  );
};

export default RecipeItemModal;
