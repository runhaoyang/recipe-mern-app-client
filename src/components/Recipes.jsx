import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import Axios from "axios";
import RecipeItem from "./RecipeItem";
import Loading from "./Loading";
import SearchContainer from "./SearchContainer";
import RecipeItemModal from "./RecipeItemModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Foco from "react-foco";
import styled from "styled-components";

const StyledRecipesContainer = styled.div`
  margin-top: 10px;
  min-height: 40em;
`;

const StyledRecipeItems = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 3em;
  row-gap: 1em;
  min-height: 60px;

  & img {
    max-width: 100%;
    max-height: 200px;
    flex-shrink: 0;
    min-width: 100%;
    min-height: 100%;
  }

  & div {
    text-align: center;
    height: 220px;
  }
`;

const StyledPaginateContainer = styled.div`
  .pagination {
    display: flex;
    padding-left: 0;
    list-style: none;
    box-shadow: rgb(0 0 0 / 40%) 0px 2px 4px, rgb(0 0 0 / 30%) 0px 7px 13px -3px,
      rgb(0 0 0 / 20%) 0px -3px 0px inset;
    background-color: #264653;
    color: white;
  }
  .page-link {
    padding: 0.5rem 1rem;
    position: relative;
    display: block;
    text-decoration: none;
    cursor: pointer;
  }

  .selected {
    background-color: #2a9d8f;
    color: white;
  }
`;

const Recipes = ({ userInfo, setUserInfo, isLoggedIn, backendUrl }) => {
  const [recipeArray, setRecipeArray] = useState([]);
  const [displayArray, setDisplayArray] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [postsPerPage] = useState(8);
  const [modalState, setModalState] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState({});

  useEffect(() => {
    const getAllRecipes = async () => {
      try {
        dismissNotification();
        setIsLoading(true);
        await Axios.get(`${backendUrl}/recipes`).then(async (response) => {
          setRecipeArray(response.data);
          //Duplicate recipe array for modifications in other to retain prior data
          setDisplayArray(response.data);
          if (!localStorage.getItem("userInfo")) {
            setIsLoading(false);
            return;
          }
          await Axios.post(`${backendUrl}/users/recipes`, {
            username: JSON.parse(localStorage.getItem("userInfo")).username,
          }).then((res) => {
            setUserInfo(res.data);
            setIsLoading(false);
          });
        });
      } catch (err) {
        console.error(`The error is ${err}`);
        errorNotification();
      }
    };
    getAllRecipes();
  }, []);

  // Error notification
  const errorNotification = () => {
    toast.error("Error in fetching.", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 20000,
    });
  };

  const dismissNotification = () => {
    toast.dismiss();
  };

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
      {isLoading ? (
        <Loading source={"recipes"} />
      ) : (
        <StyledRecipesContainer>
          <Foco onClickOutside={() => setModalState(false)}>
            {modalState && (
              <RecipeItemModal
                setModalState={setModalState}
                currentRecipe={currentRecipe}
                userInfo={userInfo}
                setUserInfo={setUserInfo}
                isLoggedIn={isLoggedIn}
              />
            )}
          </Foco>
          <SearchContainer
            recipeArray={recipeArray}
            setDisplayArray={setDisplayArray}
            setCurrentPage={setCurrentPage}
          />
          {displayArray.length === 0 ? (
            <Loading source={"collectionsEmptyArray"} />
          ) : (
            <>
              <StyledRecipeItems>{recipes}</StyledRecipeItems>
              {!modalState && (
                <StyledPaginateContainer>
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
                </StyledPaginateContainer>
              )}
            </>
          )}
        </StyledRecipesContainer>
      )}
      <ToastContainer />
    </>
  );
};

export default Recipes;
