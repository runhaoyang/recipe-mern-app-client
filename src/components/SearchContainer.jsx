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
    <div className="searchContainer">
      <label htmlFor="searchBar">Search: </label>
      <input
        className="textInput"
        type="text"
        id="searchBar"
        onChange={handleTextOnChange}
      />
    </div>
  );
};

export default SearchContainer;
