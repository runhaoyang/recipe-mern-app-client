import { useState, useEffect } from "react";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RecipeItemModal = ({
  setModalState,
  currentRecipe,
  userInfo,
  setUserInfo,
  isLoggedIn,
  displayArray,
  postsPerPage,
  currentPage,
  setCurrentPage,
  currentComponent,
}) => {
  const { strMeal: name, strCategory: category } = currentRecipe;

  const [recipeIngredientList, setRecipeIngredientList] = useState([]);
  const [addOrDeleteButton, setAddOrDeleteButton] = useState("add");

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

  console.log(currentRecipe);

  let instructions = currentRecipe.strInstructions;
  let instructionsList;

  // If the current recipe is a user submitted one then, render the instructions list without first parsing it through a function to split the string into sentences.
  if (currentRecipe.hasOwnProperty("userSubmitted")) {
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

  const addToCollection = async () => {
    if (!isLoggedIn) {
      notLoggedInNotification();
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
            setUserInfo(res.data);
            successNotification();
            setAddOrDeleteButton("delete");
          });
        }
      });
    } catch (err) {
      console.error(`The error is ${err}`);
      console.log(err.response.data.message);
      errorNotification();
    }
  };

  const deleteFromCollection = async () => {
    if (!isLoggedIn) {
      console.log("User needs to be logged in to perform this action.");
      return;
    }
    try {
      await Axios.post(
        "https://recipe-mern-app-server.herokuapp.com/recipes/delete",
        {
          username: userInfo.username,
          recipes: currentRecipe,
        }
      ).then(async () => {
        await Axios.post(
          "https://recipe-mern-app-server.herokuapp.com/users/recipes",
          {
            username: userInfo.username,
          }
        ).then((res) => {
          deleteNotification();
          setUserInfo(res.data);
          setAddOrDeleteButton("add");
          // If the parent component is MyCollection
          if (currentComponent === "collections") {
            // If while deleting a recipe from a page, it is the only recipe left on that page, we need to navigate to another page based on conditionals below
            if ((displayArray.length - 1) % postsPerPage === 0) {
              // If the current page is the first one, stay on the first page
              if (currentPage === 1) {
                setCurrentPage(1);
              } else if (
                // If the current page is the last page, or less than the last page, then stay on the current page
                currentPage <= Math.floor(displayArray.length / postsPerPage)
              ) {
                setCurrentPage(currentPage);
                // If the user is on a page where the recipe being deleted is the last one on the current page, then move to the previous page
              } else {
                setCurrentPage(currentPage - 1);
              }
            }
          }
          setModalState(false);
        });
      });
    } catch (err) {
      console.error(`The error is ${err}`);
      console.log(err);
    }
  };

  useEffect(() => {
    for (let i = 1; i <= 20; i++) {
      if (currentRecipe.hasOwnProperty(`strIngredient${i}`)) {
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
    }
    if (isLoggedIn) {
      for (const recipes of userInfo.recipes) {
        if (currentRecipe.idMeal === recipes.idMeal) {
          setAddOrDeleteButton("delete");
        }
      }
    }
  }, []);

  const successNotification = () => {
    toast.success("Recipe successfully added to my collections.", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 5000,
    });
  };

  const errorNotification = () => {
    toast.error("Recipe already exist in my collections.", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const deleteNotification = () => {
    toast.info("Recipe successfully deleted from my collections.", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const notLoggedInNotification = () => {
    toast.error("User needs to be logged in to perform this operation.", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="modalButtonContainer">
          <div className="modalCloseButton">
            <button onClick={() => setModalState(false)}>Close</button>
          </div>

          {addOrDeleteButton === "add" ? (
            <div className="modalCollectionAddButton">
              <button onClick={addToCollection}>Add to my collections</button>
            </div>
          ) : (
            <div className="modalCollectionDeleteButton">
              <button onClick={deleteFromCollection}>
                Delete from my collections
              </button>
            </div>
          )}
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
      <ToastContainer />
    </div>
  );
};

export default RecipeItemModal;
