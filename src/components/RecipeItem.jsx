const RecipeItem = ({ item, setModalState, setCurrentRecipe }) => {
  const name = item.strMeal;
  const image = item.strMealThumb;
  const openModal = (e) => {
    e.preventDefault();
    setModalState(true);
    setCurrentRecipe(item);
  };

  return (
    <>
      <div className="recipeItem">
        <p className="recipeItems-name">{name}</p>
        <div className="recipeItems-image-container">
          <img src={image} alt="" />
        </div>
        <div className="learnMore">
          <a href="/#" onClick={openModal}>
            Learn More
          </a>
        </div>
      </div>
    </>
  );
};

export default RecipeItem;
