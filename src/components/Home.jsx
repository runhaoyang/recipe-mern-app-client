import { useState, useEffect } from "react";
import Axios from "axios";
import SubmittedRecipes from "./SubmittedRecipes";
import AllRecipes from "./AllRecipes";
import UsersList from "./UsersList";
import UserHomePage from "./UserHomePage";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StyledHomePage = styled.div`
  & h3 {
    margin: 0px;
  }

  & .Toastify__toast-body {
    white-space: pre-line;
  }
`;

const StyledAdminFunctions = styled.div`
  margin-top: 0.5em;

  & button {
    margin-right: 0.5em;
    cursor: pointer;
    background-color: #264653;
    color: white;
    font-weight: bold;
    padding: 0.3em;
    -webkit-box-shadow: 0px 0px 3px 0px #000000;
    box-shadow: 0px 0px 3px -5px #000000;
    border-radius: 5px;
    min-height: 3em;
  }

  .active {
    background-color: #2a9d8f;
  }

  .fetchButton {
    background-color: #e76f51;
  }
`;

const Home = ({ isLoggedIn, userInfo }) => {
  const [renderOptions, setRenderOptions] = useState({
    activeButton: null,
    choices: [
      { id: 1, name: "Users List" },
      { id: 2, name: "Recipes List" },
      { id: 3, name: "Submitted Recipes" },
    ],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [fetchingCompleted, setFetchingCompleted] = useState(false);
  const [currentRender, setCurrentRender] = useState("getUsers");
  const username = userInfo.username;

  // Array used to store all of the recipes that are fetched from an external API to then be used to store into mongoDB
  let recipesToBeSent = [];

  const renderChoices = [
    "getUsers",
    "getAllRecipes",
    "displaySubmittedRecipes",
  ];

  useEffect(() => {
    toggleActiveButton(0);
    adminInfoNotification();
  }, []);

  const adminInfoNotification = () => {
    toast.info(
      `For demonstration purposes, administrator login information is listed below:
      
      username: admin
      passsword: adminpassword`,
      {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        enableHtml: true,
      }
    );
  };

  const toggleActiveButton = (index) => {
    setRenderOptions({
      ...renderOptions,
      activeButton: renderOptions.choices[index],
    });
    setCurrentRender(renderChoices[index]);
  };

  const toggleActiveStyles = (index) => {
    if (renderOptions.choices[index] === renderOptions.activeButton) {
      return "box active";
    } else {
      return "box inactive";
    }
  };

  const sendRecipeToBackEnd = async () => {
    sendingNotification();
    for (const recipe of recipesToBeSent) {
      console.log(recipe);
      try {
        await Axios.post(
          "https://recipe-mern-app-server.herokuapp.com/recipes",
          {
            idMeal: recipe.idMeal,
            strCategory: recipe.strCategory,
            strIngredient1: recipe.strIngredient1,
            strIngredient2: recipe.strIngredient2,
            strIngredient3: recipe.strIngredient3,
            strIngredient4: recipe.strIngredient4,
            strIngredient5: recipe.strIngredient5,
            strIngredient6: recipe.strIngredient6,
            strIngredient7: recipe.strIngredient7,
            strIngredient8: recipe.strIngredient8,
            strIngredient9: recipe.strIngredient9,
            strIngredient10: recipe.strIngredient10,
            strIngredient11: recipe.strIngredient11,
            strIngredient12: recipe.strIngredient12,
            strIngredient13: recipe.strIngredient13,
            strIngredient14: recipe.strIngredient14,
            strIngredient15: recipe.strIngredient15,
            strIngredient16: recipe.strIngredient16,
            strIngredient17: recipe.strIngredient17,
            strIngredient18: recipe.strIngredient17,
            strIngredient19: recipe.strIngredient19,
            strIngredient20: recipe.strIngredient20,
            strInstructions: recipe.strInstructions,
            strMeal: recipe.strMeal,
            strMealThumb: recipe.strMealThumb,
            strMeasure1: recipe.strMeasure1,
            strMeasure2: recipe.strMeasure2,
            strMeasure3: recipe.strMeasure3,
            strMeasure4: recipe.strMeasure4,
            strMeasure5: recipe.strMeasure5,
            strMeasure6: recipe.strMeasure6,
            strMeasure7: recipe.strMeasure7,
            strMeasure8: recipe.strMeasure8,
            strMeasure9: recipe.strMeasure9,
            strMeasure10: recipe.strMeasure10,
            strMeasure11: recipe.strMeasure11,
            strMeasure12: recipe.strMeasure12,
            strMeasure13: recipe.strMeasure13,
            strMeasure14: recipe.strMeasure14,
            strMeasure15: recipe.strMeasure15,
            strMeasure16: recipe.strMeasure16,
            strMeasure17: recipe.strMeasure17,
            strMeasure18: recipe.strMeasure18,
            strMeasure19: recipe.strMeasure19,
            strMeasure20: recipe.strMeasure20,
            strYoutube: recipe.strYoutube,
            postedBy: "TheMealDB",
            date:
              new Date().toLocaleString([], { hour12: true }) +
              " " +
              new Date().toTimeString().slice(9, 17),
          }
        ).then(() => {
          console.log("Recipe successfully added to the database");
        });
      } catch (err) {
        console.error(`The error is ${err}`);
      }
    }
    sendingCompletedNotification();
  };

  const getRecipe = async () => {
    const arr = [];
    try {
      setIsLoading(true);
      setFetchingCompleted(false);
      loadingNotification();

      for (let i = 65; i <= 90; i++) {
        await Axios.get(
          `https://www.themealdb.com/api/json/v1/1/search.php?f=${String.fromCharCode(
            i
          ).toLowerCase()}`
        ).then((res) => {
          if (res.data.meals !== null) {
            console.log(res.data.meals);
            arr.push(res.data.meals);
          }
        });
      }
      console.log(arr);
      const concatArray = [].concat.apply([], arr);
      concatArray.forEach((recipe) => {
        recipesToBeSent.push({
          idMeal: recipe.idMeal,
          strCategory: recipe.strCategory,
          strIngredient1: recipe.strIngredient1,
          strIngredient2: recipe.strIngredient2,
          strIngredient3: recipe.strIngredient3,
          strIngredient4: recipe.strIngredient4,
          strIngredient5: recipe.strIngredient5,
          strIngredient6: recipe.strIngredient6,
          strIngredient7: recipe.strIngredient7,
          strIngredient8: recipe.strIngredient8,
          strIngredient9: recipe.strIngredient9,
          strIngredient10: recipe.strIngredient10,
          strIngredient11: recipe.strIngredient11,
          strIngredient12: recipe.strIngredient12,
          strIngredient13: recipe.strIngredient13,
          strIngredient14: recipe.strIngredient14,
          strIngredient15: recipe.strIngredient15,
          strIngredient16: recipe.strIngredient16,
          strIngredient17: recipe.strIngredient17,
          strIngredient18: recipe.strIngredient17,
          strIngredient19: recipe.strIngredient19,
          strIngredient20: recipe.strIngredient20,
          strInstructions: recipe.strInstructions,
          strMeal: recipe.strMeal,
          strMealThumb: recipe.strMealThumb,
          strMeasure1: recipe.strMeasure1,
          strMeasure2: recipe.strMeasure2,
          strMeasure3: recipe.strMeasure3,
          strMeasure4: recipe.strMeasure4,
          strMeasure5: recipe.strMeasure5,
          strMeasure6: recipe.strMeasure6,
          strMeasure7: recipe.strMeasure7,
          strMeasure8: recipe.strMeasure8,
          strMeasure9: recipe.strMeasure9,
          strMeasure10: recipe.strMeasure10,
          strMeasure11: recipe.strMeasure11,
          strMeasure12: recipe.strMeasure12,
          strMeasure13: recipe.strMeasure13,
          strMeasure14: recipe.strMeasure14,
          strMeasure15: recipe.strMeasure15,
          strMeasure16: recipe.strMeasure16,
          strMeasure17: recipe.strMeasure17,
          strMeasure18: recipe.strMeasure18,
          strMeasure19: recipe.strMeasure19,
          strMeasure20: recipe.strMeasure20,
          strYoutube: recipe.strYoutube,
        });
      });
      loadingCompletedNotification();
      sendRecipeToBackEnd();
    } catch (err) {
      console.log(`The error is ${err}`);
      errorNotification();
    }

    console.log("Recipes successfully fetched.");
    setIsLoading(false);
    setFetchingCompleted(true);
  };

  let renderResult;

  if (currentRender === renderChoices[0]) {
    renderResult = <UsersList />;
  } else if (currentRender === renderChoices[1]) {
    renderResult = <AllRecipes />;
  } else if (currentRender === renderChoices[2]) {
    renderResult = <SubmittedRecipes />;
  }

  //Notifications
  let fetchingStatus;
  let sendingStatus;

  const errorNotification = () => {
    toast.error("Error in fetching from TheMealDB API.", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 20000,
    });
  };

  const loadingNotification = () => {
    fetchingStatus = toast.loading("Fetching recipes...", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const loadingCompletedNotification = () => {
    toast.update(fetchingStatus, {
      render: "Recipes successfully fetched",
      type: "Success",
      type: "success",
      isLoading: false,
    });
  };

  const sendingNotification = () => {
    sendingStatus = toast.loading("Sending fetched recipes to database.", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const sendingCompletedNotification = () => {
    toast.update(sendingStatus, {
      render: "Recipes successfully sent to database.",
      type: "Success",
      type: "success",
      isLoading: false,
    });
  };

  return (
    <>
      <StyledHomePage>
        {/* Authentication access for admin only */}
        {isLoggedIn && username === "admin" ? (
          <>
            <StyledAdminFunctions>
              {renderOptions.choices.map((choice, index) => (
                <button
                  className={toggleActiveStyles(index)}
                  onClick={() => toggleActiveButton(index)}
                  key={index}
                >
                  {choice.name}
                </button>
              ))}
              <button className={"fetchButton"} onClick={getRecipe}>
                Fetch recipes
              </button>
            </StyledAdminFunctions>

            {isLoading ? <div> Fetching in progress ... </div> : null}
            {fetchingCompleted && <div> Fetching recipes completed </div>}

            {renderResult}
          </>
        ) : (
          <UserHomePage userInfo={userInfo} isLoggedIn={isLoggedIn} />
        )}
        <br />
        <ToastContainer />
      </StyledHomePage>
    </>
  );
};

export default Home;
