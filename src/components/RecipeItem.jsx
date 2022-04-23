const RecipeItem = ({ item, setModalState, setCurrentRecipe }) => {
  const name = item.strMeal;
  let image;
  const openModal = (e) => {
    e.preventDefault();
    setModalState(true);
    setCurrentRecipe(item);
  };

  if (item.userSubmitted) {
    if (item.strMealThumb === undefined) {
      image = `https://recipe-mern-app-server.herokuapp.com/uploads/2022-04-23-No-Image-Placeholder.svg.png`;
    } else {
      image = `https://recipe-mern-app-server.herokuapp.com/${item.strMealThumb}`;
    }
  } else {
    image = item.strMealThumb;
  }

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
