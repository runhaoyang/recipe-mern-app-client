import { useState } from "react";
import Axios from "axios";

const Home = () => {
  // Array used to store all of the recipes that are fetched from an external API
  const [recipeArray, setRecipeArray] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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
    const response = await fetch("http://localhost:5000/recipes", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const res = await response.json();
    console.log(res);
  };

  const sendRecipeToBackEnd = async () => {
    try {
      for (const recipe of recipeArray) {
        console.log(recipe);
        await Axios.post("http://localhost:5000/recipes", {
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
        }).then(() => {
          setSuccessMessage("Recipes successfully added to the database.");
        });
      }
    } catch (err) {
      console.error(`The error is ${err}`);
      setErrorMessage("Recipes not added to the database.");
    }
  };

  // @todo change ?f=a to a - z, and get all recipes into the database
  // use for loop and await within it
  const getRecipe = async () => {
    const res = await Axios.get(
      "https://www.themealdb.com/api/json/v1/1/search.php?f=a"
    );
    const arr = res.data.meals;
    arr.forEach((recipe) => {
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
  };
  console.log(recipeArray);
  return (
    <>
      <div className="recipeApp">
        <h2>Recipe app</h2>
        <div>
          <button onClick={getAllUsers}>Get all users</button>
          <button onClick={getAllRecipes}>Get all recipes</button>
          <button onClick={getRecipe}>Get recipe</button>
          <button onClick={sendRecipeToBackEnd}>Send recipe to backend</button>
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