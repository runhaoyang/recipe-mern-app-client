import { useState, useEffect } from "react";
import Axios from "axios";
import RecipeItem from "./RecipeItem";
import Pagination from "./Pagination";
import Loading from "./Loading";

const Recipes = () => {
  const [recipeArray, setRecipeArray] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [postsPerPage] = useState(8);

  useEffect(() => {
    const getAllRecipes = async () => {
      try {
        setIsLoading(true);
        const response = await Axios.get(
          "https://recipe-mern-app-server.herokuapp.com/recipes"
        );
        setIsLoading(false);
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

  const recipes = currentRecipes.map((item) => {
    return <RecipeItem key={item.idMeal} item={item} />;
  });

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="recipesContainer">
          <div className="recipeItems">{recipes}</div>
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={recipeArray.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      )}
    </>
  );
};

export default Recipes;
