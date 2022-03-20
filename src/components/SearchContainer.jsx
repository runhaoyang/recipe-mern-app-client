import { useState } from "react";

const SearchContainer = ({ recipeArray, setDisplayArray }) => {
  const handleTextOnChange = (e) => {
    filterArray(e.target.value);
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

  //   const handleTextOnChange = (e) => {
  //     filterArray(e.target.value);
  //   };

  //   const filterArray = (value) => {
  //     let filteredArray;
  //     if (value === "" || value === " ") {
  //       filteredArray = [];
  //     } else {
  //       filteredArray = recipeArray.filter((item) => {

  //       });
  //     }
  //     console.log(filteredArray);
  //     setDisplayArray(filteredArray);
  //   };

  return (
    <div className="searchContainer">
      <label htmlFor="searchBar">Search: </label>
      <input type="text" id="searchBar" onChange={handleTextOnChange} />
    </div>
  );
};

export default SearchContainer;
