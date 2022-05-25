import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

const StyledModalRecipeList = styled.li`
  margin-bottom: 10px;
`;

const StyledModalInstructionList = styled.li`
  line-height: 2em;
  list-style: none;
  display: inline;
`;

const StyledRecipesPortal = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  height: 0%;
  top: 8%;
  width: 75%;
  overflow: scroll;
`;

const StyledModalBackground = styled.div`
  width: 75%;
  height: 90%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledModalContainer = styled.div`
  width: 100%;
  height: 93%;
  border-radius: 12px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  display: flex;
  flex-direction: column;
  padding: 25px;
  overflow: scroll;
`;

const StyledModalButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #333;
`;

const Button = styled.button`
  padding: 0.5em;
  cursor: pointer;
  color: white;
  font-weight: bold;
`;

const CloseButton = styled(Button)`
  background-color: #264653;
`;

const AddButton = styled(Button)`
  background-color: #2a9d8f;
`;

const DeleteButton = styled(Button)`
  background-color: #e76f51;
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

const StyledModalInstructions = styled.div`
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  padding: 1em;
  border-radius: 0.25em;
`;

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
    return <StyledModalRecipeList key={index}>{list}</StyledModalRecipeList>;
  });

  let image;

  if (currentRecipe.hasOwnProperty("strMealThumb")) {
    image = currentRecipe.strMealThumb;
  } else {
    image = `https://firebasestorage.googleapis.com/v0/b/recipe-mern-app-images.appspot.com/o/No-Image-Placeholder.svg.png?alt=media&token=8e2ad808-28be-415f-9597-bfaba677266e`;
  }

  console.log(currentRecipe);

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

  return ReactDOM.createPortal(
    <StyledRecipesPortal>
      <StyledModalBackground>
        <StyledModalContainer>
          <StyledModalButtonContainer>
            <CloseButton onClick={() => setModalState(false)}>
              Close
            </CloseButton>

            {addOrDeleteButton === "add" ? (
              <AddButton onClick={addToCollection}>
                Add to my collections
              </AddButton>
            ) : (
              <DeleteButton onClick={deleteFromCollection}>
                Delete from my collections
              </DeleteButton>
            )}
          </StyledModalButtonContainer>
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
        </StyledModalContainer>
        <ToastContainer />
      </StyledModalBackground>
    </StyledRecipesPortal>,
    document.body
  );
};

export default RecipeItemModal;
