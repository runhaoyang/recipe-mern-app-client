import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import Axios from "axios";
import RecipeItem from "./RecipeItem";
import Loading from "./Loading";
import SearchContainer from "./SearchContainer";
import RecipeItemModal from "./RecipeItemModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyCollection = ({ setUserInfo, userInfo, userToken, isLoggedIn }) => {
  const [recipeArray, setRecipeArray] = useState([]);
  const [displayArray, setDisplayArray] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [postsPerPage] = useState(8);
  const [modalState, setModalState] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState({});
  const [usersCollection, setUsersCollection] = useState({});
  const [currentComponent] = useState("collections");

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    const getUsersRecipes = async () => {
      try {
        setIsLoading(true);

        await Axios.post(
          "https://recipe-mern-app-server.herokuapp.com/users/recipes",
          {
            username: userInfo.username,
          }
        ).then((response) => {
          setRecipeArray(response.data.recipes);
          setDisplayArray(response.data.recipes);
          setUsersCollection(response.data);
          setIsLoading(false);
        });
      } catch (err) {
        console.error(`The error is ${err}`);
      }
    };
    getUsersRecipes();
  }, [userInfo]);

  // Loading message for either requiring login or empty array to access my collections
  let loadingMessage = "";
  if (!isLoggedIn) {
    loadingMessage = "collections";
  } else if (isLoading) {
    loadingMessage = "recipes";
  }
  // else if (displayArray.length === 0) {
  //   loadingMessage = "collectionsEmptyArray";
  // }

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
      {loadingMessage ? (
        <Loading source={loadingMessage} />
      ) : (
        <div className="recipesContainer">
          {modalState && (
            <RecipeItemModal
              setModalState={setModalState}
              currentRecipe={currentRecipe}
              userInfo={usersCollection}
              setUserInfo={setUserInfo}
              isLoggedIn={isLoggedIn}
              displayArray={displayArray}
              postsPerPage={postsPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              currentComponent={currentComponent}
            />
          )}
          <SearchContainer
            recipeArray={recipeArray}
            setDisplayArray={setDisplayArray}
            setCurrentPage={setCurrentPage}
          />
          {displayArray.length === 0 ? (
            <Loading source={"collectionsEmptyArray"} />
          ) : (
            <>
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
            </>
          )}
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default MyCollection;
