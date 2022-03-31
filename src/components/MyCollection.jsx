import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import RecipeItem from "./RecipeItem";
import Loading from "./Loading";
import SearchContainer from "./SearchContainer";
import RecipeItemModal from "./RecipeItemModal";

const MyCollection = ({ setUserInfo, userInfo, userToken, isLoggedIn }) => {
  const [recipeArray, setRecipeArray] = useState([]);
  const [displayArray, setDisplayArray] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [postsPerPage] = useState(8);
  const [modalState, setModalState] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState({});

  useEffect(() => {
    const getAllRecipes = async () => {
      if (!isLoggedIn) {
        return;
      }
      try {
        setIsLoading(true);
        setRecipeArray(userInfo.recipes);
        //Duplicate recipe array for modifications in other to retain prior data
        setDisplayArray(userInfo.recipes);
        setIsLoading(false);
      } catch (err) {
        console.error(`The error is ${err}`);
      }
    };
    getAllRecipes();
  }, []);

  // Loading message for either requiring login or empty array to access my collections
  let loadingMessage = "";
  if (!isLoggedIn) {
    loadingMessage = "collections";
  } else if (userInfo.recipes.length === 0) {
    loadingMessage = "collectionsEmptyArray";
  }

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentRecipes = displayArray.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  // React-Paginate starts with page at 0 so we need to increment by 1
  const paginate = ({ selected: pageNumber }) => {
    setCurrentPage(pageNumber + 1);
  };

  const recipes = currentRecipes.map((item) => {
    return (
      <RecipeItem
        key={item.idMeal}
        item={item}
        setModalState={setModalState}
        setCurrentRecipe={setCurrentRecipe}
      />
    );
  });

  return (
    <>
      {loadingMessage.length > 0 ? (
        <Loading source={loadingMessage} />
      ) : (
        <div className="recipesContainer">
          {modalState && (
            <RecipeItemModal
              setModalState={setModalState}
              currentRecipe={currentRecipe}
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              isLoggedIn={isLoggedIn}
            />
          )}
          <SearchContainer
            recipeArray={recipeArray}
            setDisplayArray={setDisplayArray}
            setCurrentPage={setCurrentPage}
          />
          <div className="recipeItems">{recipes}</div>
          {!modalState && (
            <ReactPaginate
              previousLabel={" <- Previous"}
              nextLabel={"Next ->"}
              pageCount={Math.ceil(displayArray.length / postsPerPage)}
              onPageChange={paginate}
              // React-Paginate starts at page 0, and we incremented by 1 in our onPageChange
              forcePage={currentPage - 1}
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="selected"
            />
          )}
        </div>
      )}
    </>
  );
};

export default MyCollection;
