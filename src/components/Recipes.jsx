import { useState, useEffect } from "react";
import Axios from "axios";
import RecipeItem from "./RecipeItem";
import Pagination from "./Pagination";

const Recipes = () => {
  const [recipeArray, setRecipeArray] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);

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

  //   const getRecipesArray = () => {
  //     console.log(recipeArray);
  //   };

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentRecipes = recipeArray.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const recipes = currentRecipes.map((item, index) => {
    return <RecipeItem key={index} item={item} />;
  });

  return (
    <>
      <div className="recipesHeader">
        <div className="recipeItems">{recipes}</div>
      </div>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={recipeArray.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </>
  );
};

export default Recipes;
