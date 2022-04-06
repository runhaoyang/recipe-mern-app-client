import { useState } from "react";
import Axios from "axios";

const Home = ({ isLoggedIn, userInfo }) => {
  // Array used to store all of the recipes that are fetched from an external API
  const [recipeArray, setRecipeArray] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fetchingCompleted, setFetchingCompleted] = useState(false);
  const username = userInfo.username;

  const getAllUsers = async () => {
    const response = await fetch(
      "https://recipe-mern-app-server.herokuapp.com/users",
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const res = await response.json();
    console.log(res);
  };

  const getAllRecipes = async () => {
    const response = await fetch(
      "https://recipe-mern-app-server.herokuapp.com/recipes",
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const res = await response.json();
    console.log(res);
  };

  const sendRecipeToBackEnd = async () => {
    for (const recipe of recipeArray) {
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
          }
        ).then(() => {
          setSuccessMessage("Recipes successfully added to the database.");
          setErrorMessage("");
          console.log("Recipe successfully added to the database");
        });
      } catch (err) {
        console.error(`The error is ${err}`);
        setErrorMessage("Some recipes already exist in the database.");
        setSuccessMessage("");
      }
    }
  };

  // @todo change ?f=a to a - z, and get all recipes into the database
  // use for loop and await within it
  const getRecipe = async () => {
    const arr = [];
    let res;
    try {
      setIsLoading(true);
      setFetchingCompleted(false);
      for (let i = 65; i <= 90; i++) {
        res = await Axios.get(
          `https://www.themealdb.com/api/json/v1/1/search.php?f=${String.fromCharCode(
            i
          ).toLowerCase()}`
        );
        if (res.data.meals !== null) {
          console.log(res.data.meals);
          arr.push(res.data.meals);
        }
      }
      console.log(arr);
    } catch (err) {
      console.log(`The error is ${err}`);
    }
    const concatArray = [].concat.apply([], arr);
    concatArray.forEach((recipe) => {
      setRecipeArray((recipeArray) => [
        ...recipeArray,
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
        },
      ]);
    });
    console.log("Recipes successfully fetched.");
    setIsLoading(false);
    setFetchingCompleted(true);
  };

  return (
    <>
      <div className="recipeApp">
        {isLoggedIn ? (
          <>
            <h3> Welcome, {username} </h3>
          </>
        ) : (
          <div className="loadingPage">
            <h2>
              This is the home page, please log in to access your collections
            </h2>
          </div>
        )}
        {/* Authentication access for admin only */}
        {isLoggedIn && username === "admin" ? (
          <div>
            <h2>Admin functions</h2>
            <button onClick={getAllUsers}>Get all users</button>
            <button onClick={getAllRecipes}>Get all recipes</button>
            <button onClick={getRecipe}>Get recipes</button>
            <button onClick={sendRecipeToBackEnd}>
              Send recipe to backend
            </button>
          </div>
        ) : null}
        <br />
        <div className="loadingMessage">
          {isLoading ? <div>Fetching in progress... </div> : <div> </div>}
          {fetchingCompleted && <div> Fetching recipes completed </div>}
        </div>
        <div className="messages">
          <div>{successMessage}</div>
          <div>{errorMessage}</div>
        </div>
      </div>
    </>
  );
};

export default Home;
