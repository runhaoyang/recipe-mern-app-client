import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const StyledTextInput = styled.input`
  height: 2em;
`;

const SearchContainer = ({ recipeArray, setDisplayArray, setCurrentPage }) => {
  const handleTextOnChange = (e) => {
    filterArray(e.target.value);
    setCurrentPage(1);
  };

  const filterArray = (value) => {
    let res = [];
    for (const recipe of recipeArray) {
      if (recipe.strMeal.toLowerCase().includes(value.toLowerCase())) {
        res.push(recipe);
      }
    }
    setDisplayArray(res);
  };

  return (
    <div>
      <label htmlFor="searchBar">
        <FontAwesomeIcon icon={faSearch} />
        &nbsp;
      </label>

      <StyledTextInput
        type="text"
        id="searchBar"
        onChange={handleTextOnChange}
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchContainer;
