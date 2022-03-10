import { useState, useEffect } from "react";
import Axios from "axios";
import RecipeItem from "./RecipeItem";

const Recipes = () => {
  const [recipeArray, setRecipeArray] = useState([]);

  useEffect(() => {
    const getAllRecipes = async () => {
      try {
        const response = await Axios.get("http://localhost:5000/recipes");
        setRecipeArray(response.data);
      } catch (err) {
        console.error(`The error is ${err}`);
      }
    };
    getAllRecipes();
  }, []);

  const getRecipesArray = () => {
    console.log(recipeArray);
  };

  const recipes = recipeArray.map((item, index) => {
    return <RecipeItem key={index} item={item} />;
  });

  return (
    <>
      <div>
        <button onClick={getRecipesArray}>Get recipes array</button>
        <h2>List of recipes:</h2>
        <div className="recipeItems">{recipes}</div>
      </div>
    </>
  );
};

export default Recipes;
